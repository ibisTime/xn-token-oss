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
    	var lists = data.list;
        lists.forEach(function(d){
        	//平台盈亏账户
        	if(d.accountNumber=="SYS_ACOUNT_OGC"){
        		$("#amount-CNY").text(moneyFormat(d.amountString),'',d.currency);
        		accountNumberCNY = d.accountNumber;
        	}
        })
        
    	hideLoading()
        
    }, hideLoading);
    
    reqApi({
        code: '802108',
        json: {},
        sync: true
    }).then(function(data) {
		$("#amount-OGC").text(moneyFormat(data.balance));
		$("#useBalance").text(moneyFormat(data.useBalance));
		$("#useRate").text(data.useRate);
		
    	hideLoading()
		addressOGC = data.address
    }, hideLoading);
    
    
    $("#CNYls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCNY;
    });
    
    //OGC
    $("#accoutGrantBtn").click(function() {
        location.href = "ledgerOGC.html?address=" + addressOGC;
    });
	
	$("#sendBtn").click(function(){
		var dw = dialog({
    		fixed: true,
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">发送</li></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            fields: [{
		        field: 'toUserId',
		        title: '发送用户',
		        required: true,
		        type: 'select',
		        pageCode: '805120',
		        params: {
            		kind: 'C',
            		updater:''
		        },
		        keyName: 'userId',
		        valueName: '{{mobile.DATA}} - {{nickname.DATA}}',
		        searchName: 'mobile',
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
		                	hideLoading();
            				toastr.info("发送成功");
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