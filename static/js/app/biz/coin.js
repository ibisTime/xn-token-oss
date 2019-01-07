$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "符号",
        field: "symbol",
        search: true
    }, {
        title: "英文名称",
        field: "ename"
    }, {
        title: "中文名称",
        field: "cname"
    }, {
        title: "类型",
        field: "type",
        type: "select",
        key: "coin_type",
        formatter: Dict.getNameForList("coin_type"),
        search: true
    }, {
        title: "单位",
        field: "unit"
    }, {
        title: "归集阀值",
        field: "collectStartString",
        formatter: function(v, data){
        	return moneyFormat(v,"",data.symbol)
        }
    }, {
        title: "取现手续费",
        field: "withdrawFeeString",
        formatter: function(v, data){
        	return moneyFormat(v,"",data.symbol)
        }
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "coin_status",
        formatter: Dict.getNameForList("coin_status"),
        search: true
    }, {
      title: "默认添加自选",
      field: "isSelect",
      type: 'select',
      data: {
        '0': '否',
        '1': '是'
      }
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
        pageCode: '802265',
        searchParams: {
            companyCode: OSS.company
        },
    });

    //发布
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status == '0') {
            toastr.info("不是可发布状态！");
            return;
        }
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">发布币种</li></ul>' +
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
                title: '发布',
                handler: function() {
                	if($('#popForm').valid()){
                        var data = $('#popForm').serializeObject();
                        data.symbol = selRecords[0].symbol

                        reqApi({
                            code: '802253',
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

    //撤下
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != '0') {
            toastr.info("不是可撤下状态！");
            return;
        }
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">撤下币种</li></ul>' +
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
                title: '撤下',
                handler: function() {
                	if($('#popForm').valid()){
                        var data = $('#popForm').serializeObject();
                        data.symbol = selRecords[0].symbol
                        reqApi({
                            code: '802254',
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

    //修改
    $('#editBtn').off("click").click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

    	window.location.href = "./coin_addedit.html?isDdit=1&symbol=" + selRecords[0].symbol;
    })

    //详情
    $('#detailBtn').off("click").click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

    	window.location.href = "./coin_addedit.html?v=1&isDetail=1&symbol=" + selRecords[0].symbol;
    })
});