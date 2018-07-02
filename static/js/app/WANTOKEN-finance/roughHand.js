$(function() {
	getCoinReq().then(function(data){
		hideLoading()
		
		var currencyData = {};
		var currencyList = []
		var hasCurrency = false;
		for(var i = 0; i < data.length ; i ++){
			if(data[i].type=='2'){
				hasCurrency = true;
				currencyData[data[i].symbol] = data[i].cname;
				currencyList.push(data[i].symbol)
			}
		}
		if(!hasCurrency){
			currencyList.push("无")
		}

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
        search: true
    }, {
        field: 'accountName',
        title: '账号',
    }, {
        field: 'amountString',
        title: '提现金额',
        formatter: function(v, data) {
            return moneyFormat(v,'',data.currency);
        },
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        data: currencyData,
        search: true,
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
        search: true
    }, {
        title: "区块链类型",
        field: "payCardInfo"
    }, {
        title: "提现地址",
        field: "payCardNo"
    }, {
        field: 'mobile',
        title: '申请人',
        formatter: function(v, data) {
            if (data.user) {
            	if(data.user.kind="P"){
            		return data.user.loginName;
            	}else{
                	return data.user.mobile;
            	}
            } else {
                return data.approveUser
            }
        }
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        field1: 'applyDateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true,
        formatter: dateTimeFormat
    }, {
        title: "申请说明",
        field: "applyNote"
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'withdraw_status',
        formatter: Dict.getNameForList('withdraw_status'),
    }, {
        field: 'approveNote',
        title: '审核意见',
    }, {
        field: 'approveUser',
        title: '审核人'
    }, {
        field: 'approveDatetime',
        title: '审核时间',
        formatter: dateTimeFormat,
        field1: 'approveDateStart',
        title1: '审核时间',
        type: 'date',
        field2: 'approveDateEnd',
        twoDate: true,
        search: true
    }, ];
    buildList({
        columns: columns,
        pageCode: '802755',
        searchParams: {
            status: "6",
        	currencyList: currencyList,
            companyCode: OSS.company
        },
        // beforeDetail: function(data) {
        //     window.location.href = "./TBunderline_detail.html?v=1&code=" + data.code;
        // }
    });

    },hideLoading);

});