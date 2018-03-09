$(function() {
    var accountNumberCNY;
    var addressOGC;
    
    showLoading();
    
    reqApi({
        code: '802500',
        json: {
            "start": 1,
            "limit": 10,
            "type": "P"
        },
        sync: true
    }).then(function(data) {
    	hideLoading()
    	var lists = data.list;
        lists.forEach(function(d){
        	//平台盈亏账户
        	if(d.accountNumber=="SYS_ACOUNT_OGC"){
        		$("#amount-CNY").text(moneyFormat(d.amountString),'',d.currency);
        		accountNumberCNY = d.accountNumber;
        	}
        })
        
    }, hideLoading);
    
    reqApi({
        code: '802108',
        json: {},
        sync: true
    }).then(function(data) {
    	hideLoading()
		$("#amount-OGC").text(moneyFormat(data.balance));
		addressOGC = data.address
    }, hideLoading);
    
    
    $("#CNYls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCNY;
    });
    
    //OGC
    $("#accoutGrantBtn").click(function() {
        location.href = "ledgerOGC.html?address=" + addressOGC;
    });
	
	$("#zhuanzhangBtn").click(function(){
		var dw = dialog({
    		fixed: true,
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">发送地址</li></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            fields: [{
		        field: 'toAddress',
		        title: '发送地址',
		        required: true,
		        type: 'select',
		        pageCode: '802105',
		        params: {
            		type: 'X',
		        },
		        keyName: 'address',
		        valueName: '{{address.DATA}} - {{userMobile.DATA}}',
		        searchName: 'address',
		    },{
		        field: 'quantity',
		        title: '发送数量',
		        required: true,
		        number: true,
		        amount: 'true',
		        coin:"OGC",
		        formatter: moneyFormat
		    },{
		        field: 'remark',
		        title: '备注',
		    }],
            container: $('#formContainer'),
            buttons: [{
                title: '确定',
        		field: 'confirm',
                handler: function() {
                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        showLoading()
		                reqApi({
		                    code: '802120',
		                    json: data
		                }).then(function(data) {
                    		dw.close().remove();
		                	hideLoading()
		                },hideLoading);
                    }
                }
            }, {
                title: '取消',
        		field: 'cancel',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });
        dw.__center();
	})
});