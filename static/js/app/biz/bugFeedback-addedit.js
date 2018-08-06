$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var isCheck = !!getQueryString('isCheck');
    var isDetail = !!getQueryString('isDetail');
    var status = getQueryString('status') || '';
    
    var fields = [{
        title: "提交人昵称",
        field: "commitUser",
        formatter: function(v, data){
        	return data.commitUserInfo.nickname;
        },
    }, {
        title: "提交人手机号",
        field: "commitUserMobile",
        formatter: function(v, data){
        	return data.commitUserInfo.mobile;
        }
    }, {
        title: "所在端",
        field: "deviceSystem",
        type: "select",
        key: "bug_device_system",
        formatter: Dict.getNameForList("bug_device_system"),
    }, {
        title: "Bug描述",
        field: "description",
        type: 'textarea',
        normalArea: true
    }, {
        title: "复现步骤",
        field: "reappear",
        type: 'textarea',
        normalArea: true
    }, {
        title: "截图",
        field: "pic",
        type: 'img'
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "bug_status",
        formatter: Dict.getNameForList("bug_status")
    }, {
        field: 'commitDatetime',
        title: '提交时间',
        formatter: dateTimeFormat
    }, {
        title: "备注",
        field: "commitNote"
    }];
    
    // 已支付
    if(status == '3'){
    	fields = fields.concat({
	    	title: "严重等级",
	        field: "level1",
	        type: "select",
	        formatter: function(v, data){
	    		return Dict.getNameForList1('bug_level','',data.level);
	        }
	    }, {
	        title: "修复版本号",
	        field: "repairVersionCode1",
	        formatter: function(v, data){
	    		return data.repairVersionCode;
	        }
	    }, {
	        title: "审核人",
	        field: "approveUser",
	    }, {
	        title: '审批说明',
	        field: 'approveNote',
	    }, {
	        title: "奖励金额",
	        field: "payAmount",
	        formatter: function(v, data) {
	            return moneyFormat(v.toString(),'','WAN') + ' WAN';
	        },
	    }, {
	        title: "支付人",
	        field: "payUser",
	    }, {
	        title: "支付说明",
	        field: "payNote",
		})
    } else if(status == '1' || status == '2') {
    	if(status == '1'){
    		fields = fields.concat({
		        title: "严重等级",
		        field: "level1",
		        type: "select",
		        formatter: function(v, data){
		    		return Dict.getNameForList1('bug_level','',data.level);
		        }
		    }, {
		        title: "修复版本号",
		        field: "repairVersionCode1",
		        formatter: function(v, data){
		    		return data.repairVersionCode;
		        }
			})
    	}
    	fields = fields.concat({
	        title: "审核人",
	        field: "approveUser",
	    }, {
	        title: '审批说明',
	        field: 'approveNote'
		})
    } else {
    	fields = fields.concat({
	        title: '审批说明',
	        field: 'approveNote',
	        readonly: false
		})
    }
    
    var options = {
        fields: fields,
        code: code,
        view: view,
        detailCode: "805106"
    };
    if(isCheck){
    	options.buttons = [{
	        title: '复现成功',
	        handler: function() {
	            if ($('#jsForm').valid()) {
	                var data = $('#jsForm').serializeObject();
	                
	                data.code = code;
	                data.approveResult = '1';
	                data.approveUser = getUserName();
	                
	                var dw = dialog({
			            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
			                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">复现成功</li></ul>' +
			                '</form>'
			        });
			
			        dw.showModal();
			
			        buildDetail({
			            container: $('#formContainer'),
			            fields: [{
					        title: "严重等级",
					        field: "level",
					        type: "select",
					        key: "bug_level",
					        formatter: Dict.getNameForList("bug_level"),
					        required: true
				        }, {
					        title: "修复版本号",
					        field: "repairVersionCode",
					        required: true
			            }],
			            buttons: [{
			                title: '确定',
			                handler: function() {
			                	if($('#popForm').valid()){
			                        var popFormData = $('#popForm').serializeObject();
			                        data.level = popFormData.level;
			                        data.repairVersionCode = popFormData.repairVersionCode
			                        reqApi({
	                    				code: '805101',
					                    json: data
					                }).done(function(data) {
					                    sucDetail();
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
	        }
	    }, {
	        title: '复现不成功',
	        handler: function() {
	            if ($('#jsForm').valid()) {
	                var data = $('#jsForm').serializeObject();
	                data.code = code;
	                data.approveResult = '0';
	                data.approveUser = getUserName();
	                reqApi({
	                    code: '805101',
	                    json: data
	                }).done(function(data) {
	                    sucDetail();
	                });
	            }
	        }
	    }, {
	        title: '返回',
	        handler: function() {
	            goBack();
	        }
	    }];
    }
    
    buildDetail(options);
});