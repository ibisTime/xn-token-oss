$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var isDetail = !!getQueryString('isDetail');
    
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
        amount: true,
        required: true,
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "可售金额",
        field: "avilAmount",
        amount: true,
        required: true,
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "募集成功金额",
        field: "successAmount",
        amount: true,
        required: true,
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "起购金额",
        field: "minAmount",
        amount: true,
        required: true,
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "递增金额",
        field: "increAmount",
        amount: true,
        required: true,
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "限购金额",
        field: "limitAmount",
        amount: true,
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
        type : 'datetime',
        required: true,
    }, {
        title: "回款方式",
        field: "paymentType",
        type: "select",
        key: "coin_status",
        formatter: Dict.getNameForList("coin_status"),
        required: true,
    }];
    
    var options = {
        fields: fields,
        code: code,
        view: view,
        editCode: "625402",
        detailCode: "625411",
        beforeSubmit: function(data){
        	return data;
        }
    };
    
    options.buttons = [{
	    title: '保存',
	    handler: function() {
	    	if ($('#jsForm').valid()) {
	            var data = $('#jsForm').serializeObject();
	            if(code){
	            	data.code = code;
	            }
	            data.isPublish = '0';
	            data.creator = getUserName();
	            reqApi({
	                code: '805101',
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
	            }
	            data.isPublish = '1';
	            data.creator = getUserName();
	            reqApi({
	                code: '805101',
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
});