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
        search: true
    }, {
        title: "创建日期",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: "BTC余额",
        field: "btcBalance",
        formatter: function (v, data) {
            return moneyFormat(v, '', 'BTC') + 'BTC'
        }
    }, {
        title: "USDT余额",
        field: "usdtBalance",
        formatter: function (v, data) {
            return moneyFormat(v, '', 'USDT') + 'USDT'
        }
    }];
    buildList({
        columns: columns,
        pageCode: '802385',
        searchParams: {
            type: 'S',
            companyCode: OSS.company
        }
    });
    $('#addBtn').off('click').click(function () {
        confirm('确认生成地址？').then(function () {
            reqApi({
                code: '802380',
                json: {
                    updater: getUserId()
                },
                sync: true }, true).then(function () {
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
                code: '802381',
                json: { "code": selRecords[0].code }
            }).then(function() {
            	sucList();
            });
        }, function() {});
    });
});