$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'amountString',
        title: '交易数量',
        formatter: function(v, data) {
            return moneyFormat(v, '', 'USDT')
        },
    }, {
        title: "归集去方地址",
        field: "toAddress"
    }, {
        title: '来方归集地址',
        field: 'fromAddress',
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "等待归集",
            "1": "获取矿工费广播中",
            "2": "归集广播中",
            "3": "归集成功",
            "4": "归集失败"
        },
        search: true
    }, {
        field: 'createDatetime',
        title: '归集时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802115',
        searchParams: {
        	currency:'USDT',
            companyCode: OSS.company
        }
    });


});