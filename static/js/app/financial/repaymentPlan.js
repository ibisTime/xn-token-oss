$(function() {
	var productCode = getQueryString('code');
	var symbol = getQueryString('symbol');

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "期数",
        field: "periods",
        search: true
    }, {
        title: "应还本金",
        field: "principalTotal",
        formatter: function(v, data) {
            return v ? moneyFormat(v.toString(),'',symbol) : '-';
        },
    }, {
        title: "应还本息",
        field: "amountTotal",
        formatter: function(v, data) {
            return v ? moneyFormat(v.toString(),'',symbol) : '-';
        },
    }, {
        title: "应还利息",
        field: "interestTotal",
        formatter: function(v, data) {
            return v ? moneyFormat(v.toString(),'',symbol) : '-';
        },
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "repay_plan_status",
        formatter: Dict.getNameForList("repay_plan_status"),
        search: true
    }, {
        title: "已还本金",
        field: "principalYet",
        formatter: function(v, data) {
            return v ? moneyFormat(v.toString(),'',symbol) : '-';
        },
    }, {
        title: "已还本息",
        field: "amountYet",
        formatter: function(v, data) {
            return v ? moneyFormat(v.toString(),'',symbol) : '-';
        },
    }, {
        title: "已还利息",
        field: "interestYet",
        formatter: function(v, data) {
            return v ? moneyFormat(v.toString(),'',symbol) : '-';
        },
    }, {
        title: "还款时间",
        field: "repayDatetime",
        formatter: dateTimeFormat,
    }];
    buildList({
        columns: columns,
        pageCode: '625540',
        searchParams: {
            productCode: productCode
        },
    });
    
    $('.tools .toolbar').html('<li style="display:block;" id="repaymentBtn"><span><img src="/static/images/t01.png"></span>还款</li><li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
    	goBack();
    });
    
    //还款
    $('#repaymentBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status != "0") {
            toastr.warning('不是可以还款的状态');
            return;
        }
        
        confirm("确定还款？").then(function() {
            reqApi({
                code: '625504',
                json: { "code": selRecords[0].code, repayUser: getUserName() }
            }).then(function() {
            	sucList();
            });
        }, function() {});

    });
});