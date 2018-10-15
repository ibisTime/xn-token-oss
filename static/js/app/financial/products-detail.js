$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var isDetail = !!getQueryString('isDetail');
    var isCheck = !!getQueryString('isCheck');
    
    var fields = [{
        title: "名称（中文简体）",
        field: "nameZhCn",
        required: true
    }, {
        title: "名称（英文）",
        field: "nameEn",
        required: true
    }, {
        title: "名称（韩文）",
        field: "nameKo",
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
        title: "类型",
        field: "type",
        type: "select",
        key: "product_type",
        formatter: Dict.getNameForList("product_type"),
        required: true
    }, {
        title: "产品期限（天）",
        field: "limitDays",
        required: true,
        number: true,
        isPositive: true,
        'Z+': true
    }, {
        title: "预期年化收益率(%)",
        field: "expectYield",
        required: true,
        formatter: function(v, data) {
            return v*100;
        },
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
        title: "总份数",
        field: "totalFen",
        'Z+': true,
        required: true
    }, {
        title: "限购份数",
        field: "limitFen",
        'Z+': true,
        required: true
    }, {
        title: '募集开始时间',
        field: 'startDatetime',
        type: 'datetime',
        formatter: dateTimeFormat,
        required: true,
    }, {
        title: '募集结束时间',
        field: 'endDatetime',
        type: 'datetime',
        formatter: dateTimeFormat,
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
    }, {title: "购买属性（中文简体）",
        field: "buyDescZhCn",
        type: 'textarea',
        required: true,
    }, {
        title: "购买属性（英文）",
        field: "buyDescEn",
        type: 'textarea',
        required: true,
    }, {
        title: "购买属性（韩文）",
        field: "buyDescKo",
        type: 'textarea',
        required: true,
    }, {
        title: "赎回属性（中文简体）",
        field: "redeemDescZhCn",
        type: 'textarea',
        required: true,
    }, {
        title: "赎回属性（英文）",
        field: "redeemDescEn",
        type: 'textarea',
        required: true,
    }, {
        title: "赎回属性（韩文）",
        field: "redeemDescKo",
        type: 'textarea',
        required: true,
    }, {
        title: "说明书（中文简体）",
        field: "directionsZhCn",
        type: 'textarea',
        required: true,
    }, {
        title: "说明书（英文）",
        field: "directionsEn",
        type: 'textarea',
    }, {
        title: "说明书（韩文）",
        field: "directionsKo",
        type: 'textarea',
        required: true,
    }];
    
    var options = {
        fields: fields,
        code: code,
        view: view,
        detailCode: "625511",
    };
    
    if(isCheck){
    	options.buttons = [{
	        title: '审核通过',
	        handler: function() {
	            if ($('#jsForm').valid()) {
	                var data = $('#jsForm').serializeObject();
	                data.code = code;
	                data.approveResult = '1';
	                data.approver = getUserName();
	                reqApi({
	                    code: '625502',
	                    json: data
	                }).done(function(data) {
	                    sucDetail();
	                });
	            }
	        }
	    }, {
	        title: '审核不通过',
	        handler: function() {
	            if ($('#jsForm').valid()) {
	                var data = $('#jsForm').serializeObject();
	                data.code = code;
	                data.approveResult = '0';
	                data.approver = getUserName();
	                reqApi({
	                    code: '625502',
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
	    }];
    }
    
    buildDetail(options);
});