$(function() {
    
	var columnsP = [{
        field: '',
        title: '',
        checkbox: true
    },{
        title: "符号",
        field: "symbol",
        search: true
    }, {
        title: "中文名称",
        field: "cname"
    }, {
        title: "单位",
        field: "unit"
    }];
    buildList({
        columns: columnsP,
        pageCode: '802265',
        searchParams: {
        	status:'0',
        	type: '1',
            companyCode: OSS.company
        },
    });
    
    $(".tools .toolbar").html('<li style="display:block;" id="accountBtn"><span><img src="/static/images/t01.png"></span>查询账户</li>')
		
    $("#accountBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
    	
        location.href = "breakBalance_detail.html?currency=" + selRecords[0].symbol;
    });

});