$(function() {
    var code;
    reqApi({
        code: '660917',
        json: {
            ckey: 'time'
        },
        sync: true
    }).then(function(data) {
        code = data.id;
    });

    var fields = [{
        field: 'remark',
        type: 'hidden',
        value: '服务热线'
    }, {
        title: '内容',
        field: 'cvalue',
        required: true
    }];

    var options = {
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
    };

    buildDetail(options);
});