$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var isEdit = !!getQueryString('isEdit');
    
    var d = new Date();
    var minDate = dateTimeFormat(d);
    
    $.fn.update = function(attrJsonObj){
        for(var key in attrJsonObj) {
            if ( $(this).prop(key)!=attrJsonObj[key] ) {
                $(this).prop(key, attrJsonObj[key]);
                $(this).change();
            }
        }
    };
    
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
        title: "预期年化收益率(%)",
        field: "expectYield",
        required: true,
        number: true,
        range: [0, 100],
        rate: true,
        formatter: function(v, data) {
            return v*100;
        },
    }, {
        title: "总募集金额",
        field: "amount",
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
        title: '募集时间',
        formatter: dateTimeFormat,
        field1: 'startDatetime',
        field2: 'endDatetime',
        minDate: minDate,
        type : 'datetime',
        twoDate: true,
        required: true,
        dateOption2: {
            elem: '#endDatetime',
            min: minDate,
            istime: true,
            format: 'YYYY-MM-DD hh:mm:ss',
            choose: function(v,data){
            	$("#endDatetime").val(v);
            	if(!$("#incomeDatetime").val() || compareDate(v, $("#incomeDatetime").val())){
            		$("#incomeDatetime").val(addDate(v, 1))
            	}
            	if(!$("#arriveDatetime").val() || compareDate(v, $("#arriveDatetime").val())){
            		$("#arriveDatetime").val(addDate($("#incomeDatetime").val(), parseInt($("#limitDays").val())))
            	}
            	if(!$("#repayDatetime").val() || compareDate(v, $("#repayDatetime").val())){
            		$("#repayDatetime").val(dateFormatData(addDate($("#incomeDatetime").val(), parseInt($("#limitDays").val())+1)))
            	}
            	
            	$("#incomeDatetime").off("click").click(function(){
	            	laydate({
		                elem: '#incomeDatetime',
		                min: v,
			            istime: true,
			            format: 'YYYY-MM-DD hh:mm:ss',
		            });
		            laydate.reset();
            	})
            	
            	$("#arriveDatetime").off("click").click(function(){
	            	laydate({
		                elem: '#arriveDatetime',
		                min: v,
			            istime: true,
			            format: 'YYYY-MM-DD hh:mm:ss',
		            });
		            laydate.reset();
            	})
            	
            	$("#repayDatetime").off("click").click(function(){
	            	laydate({
		                elem: '#repayDatetime',
		                min: v,
			            istime: true,
			            format: 'YYYY-MM-DD',
		            });
		            laydate.reset();
            	})
            }
        }
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
        formatter: dateFormatData,
        type : 'date',
        required: true,
    }, {
        title: "回款方式",
        field: "paymentType",
        value: '0',
        required: true,
        hidden: true
    }, {
        title: "购买属性（中文简体）",
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
        required: true,
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
        		data.expectYield = data.expectYield / 100;
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
        		data.expectYield = data.expectYield / 100;
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
    	data.successAmount = moneyParse(data.successAmount.toString(),'',data.symbol);
    	return data;
    }
    
    // 比较时间大小
    function compareDate(d1,d2){
	  return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
	}
    
    // 日期加法
    function addDate(date, days, format){ 
       var d = new Date(date); 
       d.setDate(d.getDate()+days); 
       var m = d.getMonth()+1; 
       return dateFormat(d.getFullYear()+'-'+m+'-'+d.getDate()); 
	} 
});