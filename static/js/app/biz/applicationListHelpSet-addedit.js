$(function() {
	var refCode = getQueryString('refCode');
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    
    var fields = [{
        title: "问题",
        field: "question",
        required: true
    }, {
        title: "答案",
        field: "answer",
        type: 'textarea',
        required: true
    }, {
        title: "序号",
        field: "orderNo",
        required: true
    }];
    
    var options = {
        fields: fields,
        code: code,
        view: view,
        addCode: "625420",
        editCode: "625422",
        detailCode: "625426",
        beforeSubmit: function(data){
        	data.refCode = refCode;
        	return data;
        }
    };
    buildDetail(options);
});