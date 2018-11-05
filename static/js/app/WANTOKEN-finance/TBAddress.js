$(function() {
	
	var currencyData = {};
	
	getCoinReq().then(function(data){
		hideLoading()
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
        key: 'maddress_status',
        formatter: Dict.getNameForList('maddress_status'),
        search: true
    }, {
        title: "创建日期",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: "使用次数",
        field: "useCount"
    }, {
        field: 'useAmountString',
        title: '提币金额',
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
        pageCode: '802355',
        searchParams: {
            type: 'M',
            currencyList: currencyList,
            companyCode: OSS.company
        }
    });
    
    },hideLoading);
    
    $('#addBtn').off('click').click(function () {
    	
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">生成提币地址</li></ul>' +
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
                            code: '802401',
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
    
    
    $('#deleBtn').click(function() {
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
                code: '802402',
                json: { "code": selRecords[0].code }
            }).then(function() {
            	sucList();
            });
        }, function() {});
    });
});