$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "提交人昵称",
        field: "commitUser",
        formatter: function(v, data){
        	return data.commitUserInfo.nickname ;
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
        search: true
    }, {
        title: "严重等级",
        field: "level",
        type: "select",
        key: "bug_level",
        formatter: Dict.getNameForList("bug_level"),
        search: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "bug_status",
        formatter: Dict.getNameForList("bug_status"),
        search: true
    }, {
        field: 'commitDatetime',
        title: '更新时间',
        field1: 'commitDatetimeStart',
        title1: '更新时间',
        type: 'date',
        field2: 'commitDatetimeEnd',
        twoDate: true,
        search: true,
        formatter: dateTimeFormat
    }, {
        title: "备注",
        field: "commitNote"
    }];
    buildList({
        columns: columns,
        pageCode: '805105'
    });
    
    //审核
    $('#checkBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
		
        if (selRecords[0].status != '0') {
            toastr.info("不是待确认状态！");
            return;
        }
        
        
    	window.location.href = "./bugFeedback_addedit.html?v=1&isCheck=1&code=" + selRecords[0].code;
    });
    
    //支付
    $('#payBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
		
        if (selRecords[0].status != '1') {
            toastr.info("不是可支付状态！");
            return;
        }
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">支付</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
                title: "奖励金额",
		        field: "amount",
		        amount: true,
		        coin: 'WAN',
    			required: true,
		    }, {
		        title: "支付说明",
		        field: "payNote",
            }],
            buttons: [{
                title: '支付',
                handler: function() {
                	if($('#popForm').valid()){
                        var data = $('#popForm').serializeObject();
                        data.code = selRecords[0].code;
                		data.payUser = getUserName();
                        
                        reqApi({
                            code: '805102',
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
    
    //详情
    $('#detailBtn').off("click").click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
    	window.location.href = "./bugFeedback_addedit.html?v=1&isDetail=1&code=" + selRecords[0].code+"&status="+ selRecords[0].status;
    })
});