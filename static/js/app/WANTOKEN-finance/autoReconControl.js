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
        title: '户名'
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        data: currencyData,
        search: true
    }, {
        field: 'amountString',
        title: '充值金额',
        formatter: function(v, data){
    		return moneyFormat(v,'',data.currency);
        }
    }, {
        field: 'channelType',
        title: '支付渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
        search: true
    }, {
        field: "bizNote",
        title: "充值说明"
    }, {
        field: 'applyDatetime',
        title: '充值时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '充值时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "charge_status",
        formatter: Dict.getNameForList("charge_status"),
    }];
    buildList({
        columns: columns,
        pageCode: '802705',
        beforeDetail: function(data) {
            location.href = "autoReconControl_addedit.html?v=1&code=" + data.code + "&accountNumber=" + data.accountNumber;
        },
        beforeEdit: function(r) {
            if (r.status != '3') {
                toastr.info('该记录不是待对账状态');
                return false;
            }
            window.location.href = "./autoReconControl_addedit.html?code=" + r.code;

        },
        searchParams: {
            channelType: "",
            status: "3",
            currencyList: currencyList,
            companyCode: OSS.company
        },
        beforeSearch: function(data) {
            if (data.workDate) {
                data.workDate = data.workDate.replace(/-/g, "");;
                return data;
            } else {
                return data;
            }
        }
    });
    
    },hideLoading);

});