$(function() {
	getCoinReq().then(function(data){
		hideLoading()
		var currencyData = {};
		var currencyList = []
		var hasCurrency = false;
		for(var i = 0; i < data.length ; i ++){
			if(data[i].type=='2'){
				hasCurrency = true;
				currencyData[data[i].symbol] = data[i].cname;
				currencyList.push(data[i].symbol)
			}
		}
		if(!hasCurrency){
			currencyList.push("无")
		}
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'address',
        title: '地址',
        search: true
    }, {
        field: 'symbol',
        title: '币种',
        type: 'select',
        data: currencyData,
        search: true,
    }, {
        title: "拥有者",
        field: "userId",
        formatter: function(v, data) {
            if (data.user) {
                return data.user.mobile + '(' + data.user.nickname + ')';
            }
        },
        type: "select",
        pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "启用",
            "2": "弃用"
        },
        search: true
    }, {
        field: 'balanceString',
        title: '当前余额',
        formatter: function(v, data){
    		return moneyFormat(v,'',data.symbol);
        }
    }];
    buildList({
        columns: columns,
        pageCode: '802405',
        searchParams: {
            type: 'X',
            currencyList: currencyList,
            companyCode: OSS.company
        },
    });
    
    },hideLoading);

    $('#diviLedgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./diviAddress_ledger.html?address=" + selRecords[0].address;
    });
    
    //发送
    $("#sendBtn").click(function(){
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status == 2) {
            toastr.warning("无效地址，不能发送");
            return;
        }
		var dw = dialog({
    		fixed: true,
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">发送</li></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            fields: [{
		        field: 'addressCode',
		        title: '地址',
		        type: 'select',
		        pageCode: '802405',
                params: {
                    type: "H",
                    status: '0',
                    currencyList: [selRecords[0].symbol]
                },
                keyName: 'code',
                valueName: '{{address.DATA}}-{{balanceString.DATA}}{{symbol.DATA}}',
                searchName: 'name',
                valueFormatter: {
                    balanceString: function(v){
            			return moneyFormat(v,'',selRecords[0].symbol)
                    }
                },
		        required: true,
		    },{
		        field: 'value',
		        title: '发送数量',
		        required: true,
		        number: true,
		        coinAmount: true
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
                        data.code = data.addressCode
                        data.toUserId = selRecords[0].user.userId;
                        delete data.symbol1;
                        delete data.addressCode;
                        
                        showLoading()
		                reqApi({
		                    code: '802304',
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