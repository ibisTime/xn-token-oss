$(function() {

        var fields = [{
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
                        confirm('未归集的ETH总额大于'+data.balanceStart+'都将被归集，确定进行操作吗？').then(function () {
                            showLoading();
                            reqApi({
                                code: '802110',
                                json: data
                            }).done(function(data) {
                                hideLoading();
                                toastr.success('操作成功');
                                setTimeout(function () {
                                    location.reload(true);
                                }, 500)
                            });
                        },function () {})
                    }
                }
            }]
	    };
		
	    buildDetail(options);
        
//  }, hideLoading);

})