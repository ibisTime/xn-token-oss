$(function() {
    var userId = getQueryString('userId') || '';
    var kind = getQueryString('kind') || '';
	
	getCoinReq().then(function(data){
		
		var currencyData = {};
		for(var i = 0; i < data.length ; i ++){
			currencyData[data[i].symbol] = data[i].cname;
		}

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名'
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        data: currencyData,
        search: true
    }, {
        field: 'accountNumber',
        title: '账号'
    }, {
        field: 'amountString',
        title: '余额',
        formatter: function(v, data){
    		return moneyFormat(v,'',data.currency);
        }
    }, {
        field: 'frozenAmountString',
        title: '冻结金额',
        formatter: function(v, data){
    		return moneyFormat(v,'',data.currency);
        }
    }, {
        field: 'amount',
        title: '可用余额',
        formatter: function(v, data) {

            var amount = new BigDecimal(data.amountString);
            var frozenAmount = new BigDecimal(data.frozenAmountString);
            
    		return moneyFormat(amount.subtract(frozenAmount).toString(),'',data.currency);
        }
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'currency_type',
        formatter: Dict.getNameForList('account_status'),
        // search: true
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }];
    buildList({
        router: 'account',
        columns: columns,
        pageCode: '802500',
        searchParams: {
            kind:'0',
            companyCode: OSS.company,
            userId: userId
        }
    });
    
    },hideLoading);


    $('.tools .toolbar').html('<li style="display:block;" id="ledgerBtn"><span><img src="/static/images/t01.png"></span>查看明细</li>'+
    							'<li style="display:block;" id="ledgerFrozenBtn"><span><img src="/static/images/t01.png"></span>查看冻结金额明细</li>'+
    							'<li style="display:block;" id="goBackBtn"><span><img src="/static/images/t01.png"></span>返回</li>');

    $('#ledgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./partner_ledger.html?accountNumber=" + selRecords[0].accountNumber + "&kind=0";
    });
    
    $('#ledgerFrozenBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./partner_ledger.html?accountNumber=" + selRecords[0].accountNumber + "&kind=1";
    });
    
    $('#goBackBtn').click(function() {
        window.location.href = "./customer.html"
    });
});