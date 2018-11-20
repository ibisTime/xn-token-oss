$(function() {
    var code = getQueryString('code');


    var fields = [{
        field: 'currency',
        title: '币种',
    }, {
        field: 'amountString',
        title: '归集数量',
        formatter: function (v, data) {
            return moneyFormat(v,'',data.currency)
        }
    }, {
        title: "矿工费",
        field: 'txFeeString',
        formatter: function (v, data) {
            return moneyFormat(v,'','ETH')
        }
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
            "0": "等待归集",
            "1": "获取矿工费广播中",
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
    }, {
        field: 'preFrom',
        title: '矿工费补给地址'
    }, {
        field: 'preTxHash',
        title: '矿工费补给交易Hash'
    }, {
        field: 'preAmountString',
        title: '矿工费补给数量',
        formatter: function (v, data) {
            return moneyFormat(v,'','ETH')
        }
    }, {
        field: 'preTxFee',
        title: '矿工费补给交易矿工费',
        formatter: function (v, data) {
        	var fee = new Number(v);
            return moneyFormat(fee.toString(),'','ETH')
        }
    }, {
        field: 'remark',
        title: '备注',
    }];

    var options = {
        fields: fields,
        detailCode: '802116',
        code: code,
        view: true
    };

    buildDetail(options);

})