$(function() {
    var refCode = getQueryString('code');

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
    	title: 'id',
    	field: 'id',
    	visible: false
    }, {
        title: "问题",
        field: "question",
        search: true
    }, {
        title: "序号",
        field: "orderNo"
    }];
    
    buildList({
        columns: columns,
        pageCode: '625425',
        searchParams: {
        	refType: 'DAPP',
        	refCode: refCode
        }
    });
    
    $('.tools .toolbar').html('<li style="display:block;" id="addBtn"><span><img src="/static/images/t01.png"></span>新增</li>'+
    							'<li style="display:block;" id="editBtn"><span><img src="/static/images/t01.png"></span>修改</li>'+
    							'<li style="display:block;" id="deleteBtn"><span><img src="/static/images/t01.png"></span>删除</li>'+
    							'<li style="display:block;" id="detailBtn"><span><img src="/static/images/t01.png"></span>详情</li>'+
    							'<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    							
    $('#backBtn').on('click', function() {
        window.location.href = "./applicationList.html";
    });
    
    $('#addBtn').click(function(){
    	window.location.href = './applicationListHelpSet_addedit.html?refCode='+refCode;
    })
    
    $('#editBtn').click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
    	window.location.href = "./applicationListHelpSet_addedit.html?code=" + selRecords[0].id+'&refCode='+refCode;
    })
    
    $('#detailBtn').click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
    	window.location.href = "./applicationListHelpSet_addedit.html?v=1&code=" + selRecords[0].id+'&refCode='+refCode;
    })
    
    $('#deleteBtn').click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
    	var data = {
            id: selRecords[0].id
        }
        confirm('确认删除吗').then(function () {
            reqApi({code: '625421', json: data, sync: true}, true).then(function () {
                sucList();
            })
        },function () {})
    })
});