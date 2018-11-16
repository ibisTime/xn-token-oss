$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
        search: true
    }, {
        title: "买家",
        field: "buyUser",
        formatter: function(v, data) {
            if (data.buyUserInfo) {
                return data.buyUserInfo.mobile + '(' + data.buyUserInfo.nickname + ')'
            }
        },
        type: "select",
        pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        search: true
    }, {
        title: "卖家",
        field: "sellUser",
        formatter: function(v, data) {
            if (data.sellUserInfo) {
                return data.sellUserInfo.mobile + '(' + data.sellUserInfo.nickname + ')'
            }
        },
        type: "select",
        pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        search: true
    }, {
        title: "交易价格",
        field: "tradePrice"
    }, {
        title: "交易数量",
        field: "countString",
        formatter: function(v, data) {
            return moneyFormat(v) + data.tradeCoin;
        }
    }, {
        title: "交易金额",
        field: "tradeAmount"
    }, {
        title: "手续费",
        field: "feeString",
        formatter: moneyFormat
    }, {
        title: "状态",
        field: "status",
        type: "select",
        data: {
            "2": "已释放待评价",
            '3': "已完成"
        },
    }, {
        title: "状态",
        field: "statusList",
        type: "select",
        data: {
            "2": "已释放待评价",
            '3': "已完成"
        },
        visible: false,
        search: true
    }, {
        title: '备注',
        field: 'remark'
    }];
    buildList({
        columns: columns,
        pageCode: '625250',
        searchParams: {
            type: "buy",
            statusList: ["2","3"],
            tradeCoin: 'WAN',
            companyCode: OSS.company
        },
        beforeSearch:function(data){
        	if(!Array.isArray(data.statusList)){
        		var statusList = []
	        	statusList.push(data.statusList)
	        	data.statusList = statusList;
        	}
        	return data;
        }
    });



});