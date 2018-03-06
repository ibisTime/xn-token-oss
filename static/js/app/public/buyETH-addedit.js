$(function() {
    var code = getQueryString('code');

    var fields = [ {
        field: 'remark',
        title: '参数名称',
        maxlength: 255
    },{
        title: '参数说明',
        field: 'cvalue',
        required: true,
        maxlength: 255,
        type: 'textarea',
        normalArea: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '660916',
        editCode: "660911"
    };

    buildDetail(options);
});