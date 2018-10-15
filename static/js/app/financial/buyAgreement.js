$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "remark",
        title: '说明'
    }];
    buildList({
        columns: columns,
        pageCode: '660915',
        searchParams: {
            companyCode: OSS.company,
            type: 'quantitative_finance'
        }
    });
	
	$('#editBtn').off("click").click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
    	window.location.href = "buyAgreement_addedit.html?code=" + selRecords[0].id;
    })


});