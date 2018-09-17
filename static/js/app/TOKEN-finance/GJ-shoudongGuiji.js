$(function() {
        
        var fields = [{
		        field: 'symbol',
		        title: 'Token币种',
		        type: 'select',
		        pageCode: '802265',
		        params: {
		        	type: "1",
		        	status: "0"
		        },
		        keyName: 'symbol',
		        valueName: '{{symbol.DATA}}'
		    }, {
		        title: "阈值",
		        field: 'balanceStart',
				required: true,
				number: true,
				min: '0'
		    }];
		
	    var options = {
	        fields: fields,
	         buttons: [{
                title: '手动归集',
                handler: function() {
                	if($('#jsForm').valid()){
                        var data = $('#jsForm').serializeObject();
                        confirm('所有'+$("#symbol").val()+'地址余额大于'+data.balanceStart+'都将被归集，确定进行操作吗？').then(function () {
                            reqApi({
                                code: '802211',
                                json: data
                            }).done(function(data) {
							    toastr.success('操作成功');
							    setTimeout(function(){
                                	location.reload(true);
							    }, 1200)
                            });
                        },function () {})
                    }
                }
            }]
	    };
		
	    buildDetail(options);
        
//  }, hideLoading);

})