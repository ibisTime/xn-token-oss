$(function() {

    var columns = [{
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
        columns: columns,
        pageCode: '802265',
        searchParams: {
            status:'0',
            type: '1',
            companyCode: OSS.company
        },
    });

    $(".tools .toolbar").html('<li style="display:block;" id="queryBtn"><span><img src="/static/images/t01.png"></span>查询分发地址</li>')

    $("#queryBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        location.href = "diviAddressList.html?currency=" + selRecords[0].symbol;
    });

});