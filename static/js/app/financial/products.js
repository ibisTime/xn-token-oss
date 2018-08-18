$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "产品名称",
        field: "name",
        search: true
    }, {
        title: "币种",
        field: "symbol",
        type: "select",
        pageCode: '802265',
        params: {
        	status:"0"
        },
        keyName: 'symbol',
        valueName: '{{symbol.DATA}}-{{cname.DATA}}',
        searchName: 'symbol',
        search: true
    }, {
        title: "产品期限（天）",
        field: "limitDays"
    }, {
        title: "预期年化收益率",
        field: "expectYield",
    }, {
        title: "总募集金额",
        field: "amount",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "可售金额",
        field: "avilAmount",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "募集成功金额",
        field: "successAmount",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "起购金额",
        field: "minAmount",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "递增金额",
        field: "increAmount",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "限购金额",
        field: "limitAmount",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "序号",
        field: "orderNo"
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "product_status",
        formatter: Dict.getNameForList("product_status"),
        required: true,
    }, {
        title: "更新时间",
        field: "updateDatetime",
        formatter: dateTimeFormat,
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '625510'
    });
    
    //显示设置
    $('#setShowHideBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">显示设置</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
		        title: "设置显示状态为",
		        field: "status1",
		        type: "select",
		        data: {
		        	'0':'不显示',
		        	'1':'显示'
		        },
		        value: selRecords[0].status == '0' ? '1' : '0',
        		required: true,
        		readonly: true
		    }, {
		        title: "序号",
		        field: "orderNo1",
				required: true,
		        value: selRecords[0].orderNo,
		        hidden: selRecords[0].status == '1'
	    	}, {
	    		title:'位置',
		        field: "location1",
		        hidden: true,
		        value: selRecords[0].location,
		        hidden: selRecords[0].status == '1'
		    }, {
		        title: "备注",
		        field: "remark1",
		        value: selRecords[0].remark
            }],
            buttons: [{
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }, {
                title: '确定',
                handler: function() {
                	if($('#popForm').valid()){
                		var params = {};
                        var data = $('#popForm').serializeObject();
                        var bizCode = '';
                        if(data.status1=='0'){
                        	bizCode = '625404';
                        } else if(data.status1=='1') {
                        	bizCode = '625403';
                        	params.orderNo = data.orderNo1;
                        	params.location = data.location1;
                        }
                        params.code = selRecords[0].code;
                        params.remark1 = data.remark1;
                        params.updater = getUserName();
                        
                        reqApi({
                            code: bizCode,
                            json: params
                        }).done(function(data) {
                            dw.close().remove();
                        	sucList();
                        });
                    }

                }
            }]
        });

        dw.__center();
    });
    
    //修改
    $('#editBtn').off("click").click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status != '0' && selRecords[0].status!= '1' && selRecords[0].status!= '3') {
            toastr.info("不是可修改状态！");
            return;
        }
        
    	window.location.href = "./products_addedit.html?isEdit=1&code=" + selRecords[0].code;
    })
    
    //详情
    $('#detailBtn').off("click").click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
    	window.location.href = "./products_detail.html?v=1&isDetail=1&code=" + selRecords[0].code;
    })
    
    //审核
    $('#checkBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != "1") {
            toastr.info("不是待确认状态！");
            return;
        }
        
    	window.location.href = "./products_detail.html?v=1&isCheck=1&code=" + selRecords[0].code;
    });
    
    
    //上架
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status != "2") {
            toastr.warning('不是可以上架的状态');
            return;
        }
        
        confirm("产品上架后不可下架,确定上架该产品？").then(function() {
            reqApi({
                code: '625503',
                json: { "code": selRecords[0].code, updater: getUserName(), remark: selRecords[0].remark || '平台上架' }
            }).then(function() {
            	sucList();
            });
        }, function() {});

    });
    
    
    //还款
    $('#repaymentBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status != "7") {
            toastr.warning('不是可以还款的状态');
            return;
        }
        
        confirm("确定还款？").then(function() {
            reqApi({
                code: '625504',
                json: { "code": selRecords[0].code, repayUser: getUserName() }
            }).then(function() {
            	sucList();
            });
        }, function() {});

    });
    
    //还款计划
    $('#repaymentPlanBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != "7" && selRecords[0].status != "5") {
            toastr.info("该产品还没有还款计划！");
            return;
        }
        
    	window.location.href = "./repaymentPlan.html?code=" + selRecords[0].code;
    });
    
    //认购明细
    $('#investFlowBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var statusList = {"5":"5","6":"6","7":"7","8":"8","9":"9"};
        if (!statusList[selRecords[0].status]) {
            toastr.info("该产品未募集！");
            return;
        }
        
    	window.location.href = "./investFlow.html?code=" + selRecords[0].code;
    });
});