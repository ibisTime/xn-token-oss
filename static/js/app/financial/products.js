$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "名称（中文简体）",
        field: "nameZhCn",
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
        title: "类型",
        field: "type",
        type: "select",
        key: "product_type",
        formatter: Dict.getNameForList("product_type"),
        search: true
    }, {
        title: "产品期限（天）",
        field: "limitDays"
    }, {
        title: "预期年化收益率(%)",
        field: "expectYield",
        formatter: function(v, data) {
            return v*100;
        },
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
        title: "总份数",
        field: "totalFen",
    }, {
        title: "限购份数",
        field: "limitFen",
    }, {
        title: "状态",
        field: "status",
        type: "select",
        data: {
        	'0': '草稿',
        	'1': '待审核',
        	'3': '审核不通过'
        },
        required: true,
        search: true
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
        pageCode: '625510',
        searchParams:{
        	statusList:['0', '1', '3']
        }
    });
    
    //修改
    $('#editBtn').off("click").click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status != '0' && selRecords[0].status!= '3') {
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
    
});