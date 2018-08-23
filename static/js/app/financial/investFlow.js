$(function() {
	var productCode = getQueryString('productCode');
	var investCode = getQueryString('code');
	var menu = getQueryString('menu');
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
        title: "认购金额",
        field: "amount",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.productInfo.symbol);
        },
    }, {
        title: "认购预期收益",
        field: "income",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.productInfo.symbol);
        },
    }, {
        title: "认购本金",
        field: "principal",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.productInfo.symbol);
        },
    }, {
        title: "创建时间",
        field: "createDatetime",
        formatter: dateTimeFormat,
    }];
    buildList({
        columns: columns,
        pageCode: '625530',
        searchParams: {
            investCode: investCode,
            type: '0'
        },
    });
    
    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
    	window.location.href = "./investFlowAll.html?code=" + productCode+'&menu='+menu;
    });
});