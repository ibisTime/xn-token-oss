$(function() {
    var accountCode = getQueryString('accountCode') || '';

    showLoading()

	getCoinReq().then(function(data){
		hideLoading()
		var currencyData = {};
		var currencyList = []
		var hasCurrency = false;
		for(var i = 0; i < data.length ; i ++){
			if(data[i].type=='1'){
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
	        field: 'realName',
	        title: '户名',
	        search: true
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
	        field: 'bizType',
	        title: '业务类型',
	        type: 'select',
	        key: 'jour_biz_type_plat_eth_token',
	        formatter: Dict.getNameForList('jour_biz_type_plat_eth_token'),
	        search: true
	    }, {
	        field: 'transAmountString',
	        title: '变动金额',
	        formatter: function(v, data) {
	            return moneyFormat(v,"",data.currency);
	        },
	    }, {
	        field: 'preAmountString',
	        title: '变动前金额',
	        formatter: function(v, data) {
	            return moneyFormat(v,"",data.currency);
	        },
	    }, {
	        field: 'postAmountString',
	        title: '变动后金额',
	        formatter: function(v, data) {
	            return moneyFormat(v,"",data.currency);
	        },
	    }, {
	        field: 'status',
	        title: '状态',
	        type: 'select',
	        key: 'jour_status',
	        formatter: Dict.getNameForList('jour_status'),
	        search: true
	    }, {
	        field: 'createDatetime',
	        title: '创建时间',
	        formatter: dateTimeFormat,
	        field1: 'dateStart',
	        title1: '创建时间',
	        type: 'date',
	        field2: 'dateEnd',
	        twoDate: true,
	        search: true,
	    }];
	    buildList({
	        columns: columns,
	        pageCode: '802520',
	        searchParams: {
	            accountNumber: accountCode,
	            type: 'P',
	            kind:'0',
	        	currencyList: currencyList,
	            companyCode: OSS.company
	        }
	    });

    },hideLoading);


    $("#detailBtn").off("click").on("click", function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        } else if (selRecords.length >= 2) {
            toastr.info("请选择一条记录");
            return;
        }
        location.href = "ledger_addedit.html?v=1&code=" + selRecords[0].code;
    });
});