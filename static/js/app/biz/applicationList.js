$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "应用名",
        field: "name",
        search: true
    }, {
        title: "语言",
        field: "language",
        type: "select",
        data: {
        	'ZH_CN':'中文',
        	'EN':'英文',
        	'KO':'韩文'
        },
//      key: "coin_type",
//      formatter: Dict.getNameForList("coin_type"),
        search: true
    }, {
        title: "应用简介",
        field: "slogan"
    }, {
        title: "显示状态",
        field: "status",
        type: "select",
        data: {
        	'0':'不显示',
        	'1':'显示'
        },
        search: true
    }, {
        title: "序号",
        field: "orderNo"
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
        pageCode: '625410',
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
		        title: "当前状态为",
		        field: "status2",
		        type: "select",
		        data: {
		        	'0':'不显示',
		        	'1':'显示'
		        },
		        value: selRecords[0].status,
        		required: true,
        		readonly: true
		    }, {
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
		        title: "备注",
		        field: "remark1",
		        value: selRecords[0].remark || ''
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
                        if(selRecords[0].status=='0'){
                        	bizCode = '625403';
                        	params.orderNo = data.orderNo1;
                        	params.location = '0';
                        } else if(selRecords[0].status=='1') {
                        	bizCode = '625404';
                        }
                        params.code = selRecords[0].code;
                        params.remark = data.remark1;
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
        
    	window.location.href = "./applicationList_addedit.html?code=" + selRecords[0].code;
    })
    
    //详情
    $('#detailBtn').off("click").click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
    	window.location.href = "./applicationList_addedit.html?v=1&isDetail=1&code=" + selRecords[0].code;
    })
    
    //问题列表问答
    $('#helpSetBtn').off("click").click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
    	window.location.href = "./applicationListHelpSet.html?code=" + selRecords[0].code;
    })
});