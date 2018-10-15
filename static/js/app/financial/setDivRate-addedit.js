$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: "remark",
        title: '说明',
        readonly: true,
        required: true
    }, {
        title: '数值',
        field: 'cvalue',
        required: true,
        number: true,
        min: '0'
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        editCode: '660911',
        detailCode: '660916',
        beforeSubmit: function(data){
        	data.remark = $("#remark").text();
            return data;
        }
    });

});