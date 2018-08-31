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
        title: "起购金额",
        field: "minAmount",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "递增金额",
        field: "increAmount",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "限购金额",
        field: "limitAmount",
        formatter: function(v, data) {
            return moneyFormat(v.toString(),'',data.symbol);
        },
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "product_status",
        formatter: Dict.getNameForList("product_status"),
        required: true,
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
        	statusList:['2']
        }
    });
    
    //详情
    $('#detailBtn').off("click").click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
    	window.location.href = "./products_detail.html?v=1&isDetail=1&code=" + selRecords[0].code;
    })
    
    //上架
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status != "2") {
            toastr.warning('不是可以上架的状态');
            return;
        }
        
        confirm("产品上架后不可下架,确定上架该产品？").then(function() {
            reqApi({
                code: '625503',
                json: { "code": selRecords[0].code, updater: getUserName(), remark: selRecords[0].remark || '平台上架' }
            }).then(function() {
            	sucList();
            });
        }, function() {});

    });
    
});