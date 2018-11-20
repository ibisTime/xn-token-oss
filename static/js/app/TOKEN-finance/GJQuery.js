$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        pageCode: '802265',
        params: {
        	type: "1",
        	status: "0"
        },
        keyName: 'symbol',
        valueName: '{{symbol.DATA}}',
        search: true
    }, {
        title: "归集来方地址",
        field: "fromAddress"
    }, {
        field: 'amountString',
        title: '归集数量',
        formatter: function (v, data) {
            return moneyFormat(v,'',data.currency)
        }
    }, {
        title: "归集去方地址",
        field: "toAddress"
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
    }, {
        field: 'remark',
        title: '备注',
    }];
    buildList({
        columns: columns,
        pageCode: '802115',
        searchParams: {
        	coinType:'1',
            companyCode: OSS.company
        }
    });


});