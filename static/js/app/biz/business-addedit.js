$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var isDetail = !!getQueryString('isDetail');
    
    var fields = [{
        title: "店铺名称",
        field: "name",
        required: true,
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "store_status",
        formatter: Dict.getNameForList("store_status"),
        hidden: !isDetail
    },{
        title: "主人电话(登录手机号)",
        field: "mobile",
        type: 'select',
        pageCode: '805120',
        params:{
            kind: 'C',
            updater:''
        },
        keyName: 'mobile',
        valueName: '{{mobile.DATA}}--{{nickname.DATA}}',
        searchName: 'mobile',
        required: true,
    }, {
        title: "联系电话",
        field: "bookMobile",
        required: true,
    }, {
        title: "省市区",
        field: "province",
        type:'citySelect',
        required: true,
    }, {
        title: "地址",
        field: "address",
        required: true,
    }, {
        title: "广告语",
        field: "slogan",
        required: true,
    }, {
        title: "广告图",
        field: "advPic",
        type: 'img',
        single: true,
        required: true,
    }, {
        title: "缩略图",
        field: "pic",
        type: 'img',
        required: true,
    }, {
        title: "图文描述",
        field: "description",
        type: 'textarea',
        required: true,
    }, {
        title: "序号",
        field: "uiOrder",
        hidden: !isDetail
    }, {
        title: "备注",
        field: "remark"
    }];
    var options = {
        fields: fields,
        code: code,
        view: view,
        addCode: "625310",
        editCode: "625312",
        detailCode: "625326",
        beforeSubmit: function(data){
        	delete data.status;
        	delete data.uiOrder;
        	return data;
        }
    };
    buildDetail(options);

});