$(function() {
    var code = getQueryString('code');


    var fields = [{
        field: 'amountString',
        title: '交易数量',
        formatter: moneyFormatBTC
    }, {
        title: "矿工费",
        field: 'txFeeString',
        formatter: moneyFormatBTC
    }, {
        field: 'fromAddress',
        title: '来方归集地址',
    }, {
        title: "归集去方地址",
        field: "toAddress"
    }, {
        title: "交易HASH",
        field: 'txHash'
    }, {
        title: "关联订单号",
        field: 'refNo'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "2": "归集广播中",
            "3": "归集成功",
            "4": "归集失败"
        }
    }, {
        field: 'confirmDatetime',
        title: '区块确认时间',
        formatter: dateTimeFormat
    }, {
        field: 'createDatetime',
        title: '归集时间',
        formatter: dateTimeFormat
    }];

    var options = {
        fields: fields,
        detailCode: '802116',
        code: code,
        view: true
    };

    buildDetail(options);

})