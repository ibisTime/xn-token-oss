$(function() {
	var productCode = getQueryString('code');
	var menu = getQueryString('menu');
	var menuList = {
		'raise': './productsRaise.html',
		'raisefail': './productsRaisefail.html',
		'raiseSuccess': './productsRaiseSuccess.html',
		'repay': './productsRepay.html'
	}
	
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "认购用户",
        field: "userId",
        type: 'select',
        pageCode: '805120',
        params: {
            kind: 'C',
            updater: ''
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        formatter: function(v, data){
        	return data.userInfo.nickname;
        },
        search: true
    }, {
        title: "认购用户手机号",
        field: "mobile",
        formatter: function(v, data){
        	return data.userInfo.mobile;
        },
    }, {
        title: "产品名称",
        field: "name",
        formatter: function(v, data){
        	return data.productInfo.name;
        }
    }, {
        title: "产品币种",
        field: "symbol",
        formatter: function(v, data){
        	return data.productInfo.symbol;
        }
    }, {
        title: "投资总金额",
        field: "investAmount",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.productInfo.symbol);
        },
    }, {
        title: "投资次数",
        field: "investNum",
    }, {
        title: "预期收益",
        field: "expectIncome",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.productInfo.symbol);
        },
    }, {
        title: "实际到账收益",
        field: "income",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.productInfo.symbol);
        },
    }, {
        title: "认购状态",
        field: "status",
        type: "select",
        key: "invest_status",
        formatter: Dict.getNameForList("invest_status"),
        required: true,
        search: true
    }, {
        title: "最后认购时间",
        field: "lastInvestDatetime",
        formatter: dateTimeFormat,
    }];
    buildList({
        columns: columns,
        pageCode: '625525',
        searchParams: {
            productCode: productCode
        },
    });
    
    $('.tools .toolbar').html('<li style="display:block;" id="userInvestFlowBtn"><span><img src="/static/images/t01.png"></span>认购明细</li><li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
    	window.location.href = menuList[menu];
    });
    
    //认购明细
    $('#userInvestFlowBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
    	window.location.href = "./investFlow.html?code=" + selRecords[0].code + '&productCode='+productCode;
    });
    
});