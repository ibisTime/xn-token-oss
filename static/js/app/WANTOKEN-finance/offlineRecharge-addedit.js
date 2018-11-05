$(function() {
    var view = !!getQueryString('v');
    var userId = getQueryString('userId') || '';
	var coin='';
	showLoading()
	
	getCoinReq().then(function(data){
    	hideLoading()
		var coinList = [];
		var currencyList = [];
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
		
		var fields = [{
	        field: 'accountNumber',
	        title: '充值账户',
	        required: true,
	        type: 'select',
	        pageCode: userId ? '802503' : '802500',
	        params: {
	            userId: userId,
	            type:"C",
	            currencyList:currencyList
	        },
	        keyName: 'accountNumber',
	        valueName: '{{realName.DATA}} - {{currency.DATA}}',
	        searchName: 'realName',
	        onChange: function(v, data){
	        	coin = data.currency || '';
	        }
	    }, {
	        title: "充值数量",
	        field: 'amount',
	        required: true,
	        number: true,
	        coinAmount: true,
	        formatter: moneyFormat
	    }, {
	        field: 'payCardInfo',
	        title: '打币渠道',
	        maxlength: 255
	    }, {
	        field: 'payCardNo',
	        title: '打币地址',
	        maxlength: 255
	    }, {
	        field: 'applyNote',
	        title: '充值说明',
	        maxlength: 255
	    }];
	
	    var options = {
	        fields: fields,
	        addCode: '802700',
	        view: view,
	        beforeSubmit: function(data) {
	            data.amount = moneyParse(data.amount,'',coin);
	            data.applyUser = getUserId();
	            return data;
	        }
	    };

    	buildDetail(options);
		
    },hideLoading);

})