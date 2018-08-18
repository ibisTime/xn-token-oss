$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var isEdit = !!getQueryString('isEdit');
    
    var d = new Date();
    d.setDate(d.getDate());
    var minDate = d.format('yyyy-MM-dd');
    
    var fields = [{
        title: "产品名称",
        field: "name",
        required: true
    }, {
        title: "币种",
        field: "symbol",
        type: "select",
        pageCode: '802265',
        params: {
        	status:"0"
        },
        keyName: 'symbol',
        valueName: '{{symbol.DATA}}-{{cname.DATA}}',
        searchName: 'symbol',
        required: true,
        readonly: !!code
    }, {
        title: "币种",
        field: "symbol1",
        formatter: function(v,data){
        	return data.symbol;
        },
        hidden: true
    }, {
        title: "产品期限（天）",
        field: "limitDays",
        required: true,
        number: true,
        isPositive: true,
        'Z+': true
    }, {
        title: "预期年化收益率",
        field: "expectYield",
        required: true,
        number: true,
        range: [0, 1]
    }, {
        title: "总募集金额",
        field: "amount",
        coinAmount: true,
        required: true,
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "可售金额",
        field: "avilAmount",
        coinAmount: true,
        required: true,
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "募集成功金额",
        field: "successAmount",
        coinAmount: true,
        required: true,
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "起购金额",
        field: "minAmount",
        coinAmount: true,
        required: true,
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "递增金额",
        field: "increAmount",
        coinAmount: true,
        required: true,
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "限购金额",
        field: "limitAmount",
        coinAmount: true,
        required: true,
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: '募集时间',
        formatter: dateTimeFormat,
        field1: 'startDatetime',
        field2: 'endDatetime',
        minDate: minDate,
        type : 'datetime',
        twoDate: true,
        required: true,
    }, {
        title: '起息时间',
        field: 'incomeDatetime',
        formatter: dateTimeFormat,
        type : 'datetime',
        required: true,
    }, {
        title: '到期时间',
        field: 'arriveDatetime',
        formatter: dateTimeFormat,
        type : 'datetime',
        required: true,
    }, {
        title: '还款日',
        field: 'repayDatetime',
        formatter: dateTimeFormat,
        type : 'date',
        required: true,
    }, {
        title: "回款方式",
        field: "paymentType",
        value: '0',
        required: true,
        hidden: true
    }, {
        title: "详情",
        field: "description",
        type: 'textarea',
        required: true,
    }];
    
    
    var options = {
        fields: fields,
        code: code,
        view: view,
        addCode: "625500",
        editCode: "625501",
        detailCode: "625511"
    };
    
    var bizCode = options.addCode;
    	
    if(isEdit){
    	bizCode = options.editCode;
    	
    	options.fields = options.fields.concat([{
	        title: "备注",
	        field: "remark"
    	}])
    }
    
    options.buttons = [{
	    title: '保存',
	    handler: function() {
	    	if ($('#jsForm').valid()) {
	            var data = $('#jsForm').serializeObject();
	            if(code){
	            	data.code = code;
	            	data.symbol = data.symbol1;
	            	delete data.symbol1;
	            }
	            data.isPublish = '0';
	            data.creator = getUserName();
	            data = setFormatAmount(data);
	            reqApi({
	                code: bizCode,
	                json: data
	            }).done(function(data) {
	                sucDetail();
	            });
	        }
	    }
	}, {
	    title: '提交',
	    handler: function() {
	        if ($('#jsForm').valid()) {
	            var data = $('#jsForm').serializeObject();
	            if(code){
	            	data.code = code;
	            	data.symbol = data.symbol1;
	            	delete data.symbol1;
	            }
	            data.isPublish = '1';
	            data.creator = getUserName();
	            data = setFormatAmount(data);
	            reqApi({
	                code: bizCode,
	                json: data
	            }).done(function(data) {
	                sucDetail();
	            });
	        }
	    }
	}, {
	    title: '返回',
	    handler: function() {
	        goBack();
	    }
	    
    }]
    
    buildDetail(options);
    
    // 格式化金额
    function setFormatAmount(data){
		data.amount = moneyParse(data.amount.toString(),'',data.symbol);
    	data.avilAmount = moneyParse(data.avilAmount.toString(),'',data.symbol);
    	data.successAmount = moneyParse(data.successAmount.toString(),'',data.symbol);
    	data.minAmount = moneyParse(data.minAmount.toString(),'',data.symbol);
    	data.increAmount = moneyParse(data.increAmount.toString(),'',data.symbol);
    	data.limitAmount = moneyParse(data.limitAmount.toString(),'',data.symbol);
    	return data;
    }
});