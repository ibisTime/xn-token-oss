$(function() {

    var userId = getQueryString('userId');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'mobile',
        title: '手机号',
        required: true,
        readonly: view
    }, {
        field: 'email',
        title: '邮箱',
        required: true,
        readonly: view
    }, {
        title: "昵称",
        field: "nickname",
        readonly: view
    }, {
        field: 'level',
        title: '用户等级',
        type: 'select',
        key: 'user_level',
        formatter: Dict.getNameForList('user_level'),
    }, {
        field: 'idKind',
        title: '证件类型',
        type: 'select',
        readonly: view,
        data: { '1': '身份证' }
    }, {
        field: 'idNo',
        title: '证件号',
        readonly: view,
        maxlength: 30
    }, {
        field: 'realName',
        title: '真实姓名',
        readonly: view,
        maxlength: 10
    }, {
        field: 'userReferee',
        title: '推荐人',
        formatter: function(v, data) {
            if (data.refereeUser) {
                if(data.refereeUser.mobile) {
                  return data.refereeUser.mobile;
                }else {
                  return data.refereeUser.email;
                }
            } else {
                return "-"
            }
        },
        required: true
    }, {
        field: 'userRefereeLevel',
        title: '推荐人等级',
        type: 'select',
        key: 'user_level',
        formatter: Dict.getNameForList('user_level'),
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'user_status',
        formatter: Dict.getNameForList('user_status'),
    }, {
        field: 'jfAmount',
        title: '积分余额'
    }, {
        field: 'createDatetime',
        title: '注册时间',
        formatter: dateTimeFormat,
    },  {
        field: 'createIp',
        title: '注册IP'
    },  {
        field: 'createClient',
        title: '注册端',
        type: 'select',
        key: 'client_type',
        formatter: Dict.getNameForList('client_type')
    }, {
        field: 'lastLogin',
        title: '最后登录时间',
        formatter: dateTimeFormat,
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildDetail({
        fields: fields,
        code: {
            userId: userId
        },
        detailCode: '805121',
        view: view
    });

});
