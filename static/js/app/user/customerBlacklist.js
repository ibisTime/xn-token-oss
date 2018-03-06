$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'mobile',
        title: '手机号',
        formatter: function(v, data){
        	if(data.user){
        		return data.user.mobile;
        	}
        },
    }, {
    	field: 'userId',
        title: '手机号',
        type: 'select',
    	pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        search: true,
        visible: false
    }, {
        field: 'nickname',
        title: '昵称',
        formatter: function(v, data){
        	if(data.user){
        		return data.user.nickname;
        	}
        },
    }, {
        field: 'createDatetime',
        title: '拉黑时间',
        formatter: dateTimeFormat,
    }, {
        field: 'updater',
        title: '操作人',
    }, {
        field: 'remark',
        title: '备注',
    }];
    buildList({
        columns: columns,
        pageCode: '805205',
        searchParams: {
        	status: '1',
            companyCode: OSS.company
        },
    });
    
	//移出黑名单
	$('#deleteBtn').off('click').on('click',function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
		if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
		confirm("确定移出黑名单？").then(function() {
            reqApi({
                code: '805201',
                json: {
                    id: selRecords[0].id,
                }
            }).then(function() {
                sucList();
            });

        }, function() {})
	})
	
	//添加备注
    $('#addBtn').off('click').on('click',function() {

        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">加入黑名单</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            fields: [{
                field: 'userId1',
                title: '用户',
                type: "select",
		        pageCode: "805120",
		        params: {
		            updater: "",
		            kind: "C"
		        },
		        keyName: "userId",
		        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
		        searchName: "mobile",
                required: true
            },{
                field: 'remark1',
                title: '备注',
            }],
            buttons: [{
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }, {
                title: '加入黑名单',
                handler: function() {
                    if ($('#popForm').validate()) {
                        var popFormdata = $('#popForm').serializeObject();
                        var data={}
                        data.type = '0';
                        data.userId = popFormdata.userId1;
                        data.remark = popFormdata.remark1;
                        reqApi({
                            code: '805200',
                            json: data
                        }).done(function(data) {
                            sucList()
                            dw.close().remove();
                        });
                    }

                }
            }]
        });

        dw.__center();

    });

});