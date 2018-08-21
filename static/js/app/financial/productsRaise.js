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
        title: "预期年化收益率",
        field: "expectYield",
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
        data: {
        	'4': '即将开始',
        	'5': '募集中',
        	'6': '停止交易'
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
        	statusList:['4', '5', '6']
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
    
    //认购明细
    $('#investFlowAllBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var statusList = {"5":"5","6":"6","7":"7","8":"8","9":"9"};
        if (!statusList[selRecords[0].status]) {
            toastr.info("该产品还未开始募集！");
            return;
        }
        
    	window.location.href = "./investFlowAll.html?code=" + selRecords[0].code;
    });
});