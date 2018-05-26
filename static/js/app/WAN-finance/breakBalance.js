$(function() {
    var accountNumberCNY;
    var accountNumberJF;
    var accountNumberTG;
    
    showLoading();
    $('#tableList').bootstrapTable({
        columns: [{
	        field: 'name',
	        title: '名称',
	    }, {
	        title: "数量",
	        field: "amount",
	        formatter: function(v, data){
	        	return moneyFormat(v,'','WAN')
	        }
	    }],
        singleSelect: true, //禁止多选
        clickToSelect: true, //自动选中
        uniqueId: 'id'
    });
    
    
    reqApi({
        code: '802500',
        json: {
            "start": 1,
            "limit": 10,
            "type": "P",
            "currency": 'WAN'
        },
        sync: true
    }).then(function(data) {
    	hideLoading()
    	var lists = data.list;
        lists.forEach(function(d){
        	//平台WAN冷钱包
        	if(d.accountNumber=="SYS_ACOUNT_WAN_COLD"){
        		$("#amount-TG").text(moneyFormat(d.amountString,'','WAN'));
        		accountNumberTG = d.accountNumber;
        	}
        	//WAN
        	if(d.accountNumber=="SYS_ACOUNT_WAN"){
        		$("#amount-CNY").text(moneyFormat(d.amountString,'','WAN'));
        		accountNumberCNY = d.accountNumber;
        	}
        })
        
    }, hideLoading);
    
    reqApi({
        code: '802900',
        sync: true
    }).then(function(data) {
    	hideLoading()
        var tableData = [{
	        	name: '平台所有币',
	        	amount: data.totalCount
	        },{
	        	name: '客户未归集总额',
	        	amount: data.toCollectCount
	        },{
	        	name: '当前散取地址余额',
	        	amount: data.toWithdrawCount
	        },{
	        	name: '历史归集总额',
	        	amount: data.totolCollectCount
	        },{
	        	name: '历史散取总额',
	        	amount: data.totolWithdrawCount
	        }]
        
        $('#tableList').bootstrapTable('prepend', tableData)
    }, hideLoading);
    
    $("#CNYls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCNY;
    });
    $("#accoutGrantBtn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberTG + "&kind=TG";
    });

});