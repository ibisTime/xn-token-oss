$(function() {

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
        // data: {
        //     "0": "启用",
        //     "2": "弃用"
        // },
        // formatter: function (v, data) {
        //     return Dict.getName();
        // },
        search: true
    }, {
        title: "创建日期",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: "使用次数",
        field: "useCount"
    }, {
//      field: 'initialBalanceString',
//      title: '初始金额',
//      formatter: moneyFormat
//  }, {
        field: 'useAmountString',
        title: '提币金额',
        formatter: moneyFormat
    }, {
        title: "余额",
        field: "balanceString",
        formatter: function (v, data) {
            return moneyFormat(data.balanceString) + 'WAN'
        }
    }];
    buildList({
        columns: columns,
        pageCode: '802355',
        searchParams: {
            type: 'M',
            companyCode: OSS.company
        }
    });
    $('#addBtn').off('click').click(function () {
        confirm('确认生成地址？').then(function () {
            reqApi({ code: '802351', sync: true }, true).then(function () {
                sucList();
            })

        },function () {})
    })
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
                code: '802352',
                json: { "code": selRecords[0].code }
            }).then(function() {
            	sucList();
            });
        }, function() {});
    });
});