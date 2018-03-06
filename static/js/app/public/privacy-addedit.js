$(function() {
    var code;
    reqApi({
        code: '660917',
        json: {
            ckey: 'privacy'
        },
        sync: true
    }).then(function(data) {
        code = data.id;
    });

    var fields = [{
        field: 'remark',
        type: 'hidden',
        value: '隐私政策'
    }, {
        title: '内容',
        field: 'cvalue',
        type: 'textarea',
        required: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '660916',
        buttons: [{
            title: '保存',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['id'] = data['code'];
                    reqApi({
                        code: '660911',
                        json: data
                    }).done(function(data) {
                        toastr.success('操作成功');
                    });
                }
            }
        }]
    });
});