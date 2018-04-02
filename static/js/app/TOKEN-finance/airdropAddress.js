$(function() {
	
	var currencyData = {};
	
	getCoinReq().then(function(data){
		hideLoading()
		var currencyList = []
		var hasCurrency = false;
		for(var i = 0; i < data.length ; i ++){
			if(data[i].type=='1'){
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
        title: '地址'
    }, {
        field: 'symbol',
        title: '币种',
        type: 'select',
        data: currencyData,
        search: true,
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
        title: "创建日期",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: "空投次数",
        field: "useCount"
    }, {
        field: 'useAmountString',
        title: '已空投金额',
        formatter: function(v, data){
        	return moneyFormat(data.useAmountString,'',data.symbol)
        }
    }, {
        title: "余额",
        field: "balanceString",
        formatter: function (v, data) {
            return moneyFormat(data.balanceString,'',data.symbol)
        }
    }];
    buildList({
        columns: columns,
        pageCode: '802305',
        searchParams: {
            type: 'h',
            currencyList: currencyList,
            companyCode: OSS.company
        }
    });
    
    },hideLoading);
    
    //生成
    $('#addBtn').off('click').click(function () {
    	
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">生成空投地址</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
                field: 'symbol1',
                title: '币种',
		        type: 'select',
		        data: currencyData,
        		required: true,
            }],
            buttons: [{
                title: '生成',
                handler: function() {
                	if($('#popForm').valid()){
                        var data = $('#popForm').serializeObject();
                        data.symbol = data.symbol1
                        delete data.symbol1;
                        
                        reqApi({
                            code: '802303',
                            json: data
                        }).done(function(data) {
                            dw.close().remove();
                        	sucList();
                        });
                    }

                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });

        dw.__center();

    });
    
    //弃用
    $('#deleteBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 2) {
            toastr.warning("已经是无效地址，无需重复弃用");
            return;
        }
        confirm("确认弃用？").then(function() {
            reqApi({
                code: '802302',
                json: { "code": selRecords[0].code }
            }).then(function() {
            	sucList();
            });
        }, function() {});
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
                        data.code = selRecords[0].code
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
    
    //流水
    $('#diviLedgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./diviAddress_ledger.html?address=" + selRecords[0].address;
    });
});