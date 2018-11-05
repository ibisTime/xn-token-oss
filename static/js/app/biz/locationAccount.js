$(function() {
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
        field: 'userId',
        title: '账号',
        type: 'select',
        pageCode: '802500',
        params: {
            type:'C'
        },
        keyName: 'realName',
        valueName: '{{realName.DATA}}',
        searchName: 'realName',
        search: true,
        formatter: function (v, data) {
            return data.accountName;
        }
    }, {
        title: "账号",
        field: "accountNumber"
    }, {
        field: "currency",
        title: "币种",
        type: 'select',
        data: currencyData,
        search: true
    }, {
        title: '余额',
        field: 'amountString',
        formatter: function(v, data){
    		return moneyFormat(v,'',data.currency);
        }
    }, {
        title: '冻结金额',
        field: 'frozenAmountString',
        formatter: function(v, data){
    		return moneyFormat(v,'',data.currency);
        }
    }, {
        title: '可用余额',
        field: 'amount',
        formatter: function(v,data){
        	var amount = new BigDecimal(data.amountString);
        	var frozenAmount = new BigDecimal(data.frozenAmountString);
        	amount =  amount.subtract(frozenAmount).toString();
        	return moneyFormat(amount,'',data.currency);
        	
        }
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'account_status',
        formatter: Dict.getNameForList('account_status'),
        search: true
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802500',
        searchParams: {
            companyCode: OSS.company,
            type: "C"
        },
    });
    
    },hideLoading);

    $('#ledgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "../user/partner_ledger.html?accountNumber=" + selRecords[0].accountNumber + "&kind=0";
    });

});