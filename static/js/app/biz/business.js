$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "店铺名称",
        field: "name",
        search: true
    }, {
        title: "店铺联系电话",
        field: "bookMobile"
    }, {
        title: "店铺主人电话",
        field: "mobile"
    }, {
        title: "店铺主人",
        field: "owner",
        type: 'select',
        pageCode: '805120',
        params:{
            kind: 'C',
            updater:''
        },
        keyName: 'userId',
        valueName: '{{mobile.DATA}}--{{nickname.DATA}}',
        searchName: 'mobile',
        search: true,
        visible: false
    }, {
        title: "省/市/区",
        field: "province",
        formatter: function(v, data){
        	return data.province+'/'+data.city+'/'+data.area
        }
    }, {
        title: "地址",
        field: "address"
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "store_status",
        formatter: Dict.getNameForList("store_status"),
        search: true
    },{
        title: "序号",
        field: "uiOrder",
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '625325',
        searchParams: {
            companyCode: OSS.company
        }
    });
    
    //上架
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">商家上架</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
                field: 'uiOrder',
                title: '序号',
                number: true,
				required: true,
                value: selRecords[0].uiOrder||"",
            },{
                field: 'remark',
                title: '备注',
                value: selRecords[0].remark||"",
                maxlength: 250
            }],
            buttons: [{
                title: '上架',
                handler: function() {
                	if($('#popForm').valid()){
                        var data = $('#popForm').serializeObject();
                        data.code = selRecords[0].code
                        
                        reqApi({
                            code: '625315',
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
    
    //下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != '2') {
            toastr.info("商家不是可下架状态！");
            return;
        }
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">商家下架</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
                field: 'remark',
                title: '备注',
                value: selRecords[0].remark||"",
                maxlength: 250
            }],
            buttons: [{
                title: '下架',
                handler: function() {
                	if($('#popForm').valid()){
                        var data = $('#popForm').serializeObject();
                        data.code = selRecords[0].code
                        reqApi({
                            code: '625316',
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
    
    $('#detailBtn').off("click").click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
    	window.location.href = "business_addedit.html?v=1&isDetail=1&code=" + selRecords[0].code;
    })
});