$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'address',
        title: '地址'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "启用",
            "2": "弃用"
        },
        // key: 'account_status',
        // formatter: Dict.getNameForList('account_status'),
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
        title: '归集总额',
        formatter: moneyFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802105',
        searchParams: {
            type: 'W',
            companyCode: OSS.company
        },
        //导入
//      getImportData: function(list) {
//          reqApi({
//              code: "802101",
//              json: { wAddressList: list }
//          }).then(function() {
//              sucList();
//          })
//
//      }
    });
    
    $('#addBtn').off("click").click(function() {
    	var dw = dialog({
            content: '<form class="pop-form pop-form-uRef " id="popForm" novalidate="novalidate">' +
            '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">新增归集地址</li></ul>' +
            '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
                field: 'address',
                title: '地址',
                required: true,
            }],
            buttons: [{
                title: '确定',
                handler: function() {
                    if($('#popForm').valid()){
                        showLoading();

                        var data = $('#popForm').serializeObject();
                        reqApi({
                            code: '802100',
                            json: data
                        }).then(function() {
                            hideLoading();
                            sucList();
                            dw.close().remove();
                        },hideLoading);
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
    })
	
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
                code: '802102',
                json: { "code": selRecords[0].code }
            }).then(function() {
            	sucList();
            });
        }, function() {});
    });

});