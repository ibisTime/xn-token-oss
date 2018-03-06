$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        title: "",
        field: "type",
        value: "1",
        required: true,
        hidden: true
    }, {
        field: 'updater',
        type: 'hidden',
        value: getUserName()
    }, {
        title: '标题',
        field: 'title',
        required: true,
        maxlength: 255,
        readonly: view
    }, {
        title: '缩略图',
        field: 'pic',
        type: 'hidden',
        required: true,
        readonly: view,
    }, {
        title: "广告图",
        field: "advPic",
        type: 'img',
        required: true,
        readonly: view,
        single: true
    }, {
        title: "关键字",
        field: "keywords",
        type: "hidden",
        value: "0",
        required: true
    }, {
        title: '图文详述',
        field: 'content',
        required: true,
        type: 'textarea',
        readonly: view
    }];
    var viewList = [{
        field: 'status',
        title: '状态',
        readonly: true,
        type: 'select',
        data: {
            "0": "草稿",
            "1": "上架",
            "2": "下架"
        }
    }, {
        field: 'orderNo',
        title: 'UI次序',
        formatter: function(v, data) {
            return v
        },
        readonly: true
    }, {
        title: '备注',
        field: 'remark',
        readonly: true
    }]
    if (view) {
        fields = fields.concat(viewList)
    }

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '801006',
        addCode: '801000',
        editCode: '801002',
        view: view
    });

});