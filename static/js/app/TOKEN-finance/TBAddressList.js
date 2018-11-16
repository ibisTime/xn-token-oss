$(function() {
    var currency = getQueryString('currency') || '';

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'address',
        title: '地址'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'maddress_status',
        formatter: Dict.getNameForList('maddress_status'),
        search: true
    }, {
        title: "创建日期",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: "使用次数",
        field: "useCount"
    }, {
        field: 'useAmountString',
        title: '提币金额',
        formatter: function(v, data){
        	return moneyFormat(data.useAmountString,'',data.symbol)
        }
    }, {
        title: "余额",
        field: "balanceString",
        formatter: function (v, data) {
            return moneyFormat(data.balanceString,'', data.symbol);
        }
    }];
    buildList({
        columns: columns,
        pageCode: '802105',
        searchParams: {
            type: 'M',
            currency: currency,
            companyCode: OSS.company
        }
    });

    $(".tools .toolbar").html('<li style="display:block;" id="addBtn"><span><img src="/static/images/t01.png"></span>生成</li>'
                            + '<li style="display:block;" id="deleBtn"><span><img src="/static/images/t01.png"></span>弃用<li>');

    $('#addBtn').click(function () {
        confirm("确认生成" + currency + "提币地址？").then(function() {
            reqApi({
                code: '802101',
                json: { "symbol": currency }
            }).then(function() {
                sucList();
            });
        }, function() {});
    });


    $('#deleBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 2) {
            toastr.warning("已经是无效地址，无需重复弃用");
            return;
        }
        confirm("确认弃用？").then(function() {
            reqApi({
                code: '802102',
                json: { "code": selRecords[0].code }
            }).then(function() {
            	sucList();
            });
        }, function() {});
    });
});