$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
        search: true
    }, {
        field: 'accountName',
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
            return data.user ? data.user.realName : '';
        }
    }, {
        field: 'amountString',
        title: '提现金额',
        formatter: moneyFormatBTC
    }, {
        field: 'amount',
        title: '实际到账金额',
        formatter: function(v, data) {
            var amount = new BigDecimal(data.amountString);
            var feeString = new BigDecimal(data.feeString);
            return moneyFormatBTC(amount.subtract(feeString).toString());
        }
    }, {
        field: 'feeString',
        title: '手续费',
        formatter: moneyFormatBTC
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
        search: true
    }, {
        title: "区块链类型",
        field: "payCardInfo"
    }, {
        title: "提现地址",
        field: "payCardNo"
    }, {
        field: 'mobile',
        title: '申请人',
        formatter: function(v, data) {
        	
            if (data.user) {
            	if(data.user.kind="P"){
            		return data.user.loginName;
            	}else{
                	return data.user.mobile;
            	}
            } else {
                return data.approveUser
            }
        }
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        field1: 'applyDateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true,
        formatter: dateTimeFormat
    }, {
        title: "申请说明",
        field: "applyNote"
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'withdraw_status',
        formatter: Dict.getNameForList('withdraw_status'),
        search: true
    }, {
        field: 'approveNote',
        title: '审核意见',
    }, {
        field: 'approveUser',
        title: '审核人'
    }, {
        field: 'approveDatetime',
        title: '审核时间',
        formatter: dateTimeFormat,
        field1: 'approveDateStart',
        title1: '审核时间',
        type: 'date',
        field2: 'approveDateEnd',
        twoDate: true,
        search: true
    }];
    buildList({
        columns: columns,
        pageCode: '802755',
        singleSelect: false,
        searchParams: {
        	currency: 'BTC',
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            window.location.href = "./TBunderline_detail.html?v=1&code=" + data.code;
        }
    });
    
    //提币广播
    $('#spBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length > 1) {
            toastr.info("请选择一条记录");
            return;
        }
		
		if (selRecords[0].status !="3") {
            toastr.info("只有审批通过的记录才可以广播");
            return;
        }

        window.location.href = "./TBunderline_sp.html?code=" + selRecords[0].code;
    });
	
    //审核
    $('#multiCheckBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords.length == 1 && selRecords[0].status == 1) {

            window.location.href = "TBunderline_check.html?Code=" + selRecords[0].code;
        } else {
	        var dataCode = []
	        for (var i = 0; i < selRecords.length; i++) {
	            dataCode.push(selRecords[i].code)
	
	            if (selRecords[i].status != 1) {
	                toastr.info(selRecords[i].code + "状态不能审核!");
	                return;
	            }
	        }
	
	        var dw = dialog({
	            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
	                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">审核</li></ul>' +
	                '</form>'
	        });
	        dw.showModal();
	
	        buildDetail({
	            fields: [{
	                field: 'approveNote',
	                title: '审核意见',
	                required: true,
	                maxlength: 250
	            }],
	            buttons: [{
	                title: '通过',
	                handler: function() {
	
	                    if ($('#approveNote').val() == "") {
	                        toastr.error("审核意见不能为空");
	                    } else {
	                        var data = $('#popForm').serializeObject();
	                        data.codeList = dataCode;
	                        data.approveResult = "1";
	                        data.approveUser = getUserName();
	                        reqApi({
	                            code: '802752',
	                            json: data
	                        }).done(function(data) {
	                        	sucList();
	                            dw.close().remove();
	                        });
	                    }
	
	                }
	            }, {
	                title: '不通过',
	                handler: function() {
	                    if ($('#approveNote').val() == "") {
	                        toastr.error("审核意见不能为空");
	                    } else {
	                        var data = $('#popForm').serializeObject();
	                        data.codeList = dataCode;
	                        data.approveResult = "0";
	                        data.approveUser = getUserName();
	                        reqApi({
	                            code: '802752',
	                            json: data
	                        }).done(function(data) {
	                        	sucList();
	                            dw.close().remove();
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
	    }
    });

});