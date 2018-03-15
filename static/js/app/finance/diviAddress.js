$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'address',
        title: '地址',
        search: true
    }, {
        title: "拥有者",
        field: "userId",
        formatter: function(v, data) {
            if (data.user) {
                return data.user.mobile + '(' + data.user.nickname + ')';
            }
        },
        type: "select",
        pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "启用",
            "2": "弃用"
        },
        search: true
    }, {
        field: 'balanceString',
        title: '当前余额',
        amount: true,
        formatter: moneyFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802105',
        searchParams: {
            type: 'X',
            companyCode: OSS.company
        },
    });

    $('#diviLedgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./diviAddress_ledger.html?address=" + selRecords[0].address;
    });
    
    $("#sendBtn").click(function(){
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
		var dw = dialog({
    		fixed: true,
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">发送</li></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            container: $('#formContainer'),
            fields: [{
		        field: 'fromUserId',
		        title: '来方',
		        required: true,
		        type: 'select',
		        pageCode: '805120',
		        params: {
            		kind: 'C',
            		updater:''
		        },
		        keyName: 'userId',
		        valueName: '{{mobile.DATA}} - {{nickname.DATA}}',
		        searchName: 'mobile',
		    },{
		        field: 'quantity',
		        title: '发送数量',
		        required: true,
		        number: true,
		        amount: 'true',
		        coin:"OGC",
		        formatter: moneyFormat
		    },{
		        field: 'remark',
		        title: '备注',
		    }],
            buttons: [{
                title: '确定',
        		field: 'confirm',
                handler: function() {
                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        data.toUserId = selRecords[0].userId
                        showLoading()
		                reqApi({
		                    code: '802121',
		                    json: data
		                }).then(function(data) {
                    		dw.close().remove();
                    		sucList();
		                	hideLoading()
		                },hideLoading);
                    }
                }
            }, {
                title: '取消',
        		field: 'cancel',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });
        dw.__center();
	})
    
});