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
});