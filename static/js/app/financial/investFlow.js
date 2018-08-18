$(function() {
	var productCode = getQueryString('code');
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
        	return data.userInfo.nickname + '(' + data.userInfo.mobile +')';
        },
        search: true
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
        title: "认购/赎回金额",
        field: "amount",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "认购明细类型",
        field: "type",
        type: "select",
        data: {
        	'0':'认购',
        	'1':'赎回'
        }
    }, {
        title: "认购预期收益或赎回收益",
        field: "income",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "认购/赎回本金",
        field: "principal",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "创建时间",
        field: "createDatetime",
        formatter: dateTimeFormat,
    }, {
        title: "认购汇总记录编号",
        field: "investCode",
        search: true
    }];
    buildList({
        columns: columns,
        pageCode: '625530',
        searchParams: {
            productCode: productCode
        },
    });
    
    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
    	goBack();
    });
});