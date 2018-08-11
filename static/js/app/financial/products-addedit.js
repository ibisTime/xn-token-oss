$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var isDetail = !!getQueryString('isDetail');
    
    var fields = [{
         title: "应用名",
        field: "name",
        required: true
    }, {
        title: "语言",
        field: "language",
        type: "select",
        data: {
        	'ZH_CN':'中文',
        	'EN':'英文',
        	'KO':'韩文'
        },
//      key: "coin_type",
//      formatter: Dict.getNameForList("coin_type"),
        hidden: !isDetail
    }, {
        title: "应用简介",
        field: "slogan",
        type:"textarea",
        normalArea: true,
        required: true
    }, {
        title: "description",
        field: "slogan",
        required: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        data: {
        	'0':'不显示',
        	'1':'显示'
        },
        hidden: !isDetail
    }, {
        title: "序号",
        field: "orderNo",
        hidden: !isDetail
    }, {
        title: "更新人",
        field: "updater",
        hidden: !isDetail
    }, {
        title: "更新时间",
        field: "updateDatetime",
        formatter: dateTimeFormat,
        hidden: !isDetail
    }, {
        title: "备注",
        field: "remark"
    }];
    
    var options = {
        fields: fields,
        code: code,
        view: view,
        editCode: "625402",
        detailCode: "625411",
        beforeSubmit: function(data){
        	delete data.language;
        	delete data.orderNo;
        	delete data.updater;
        	delete data.updateDatetime;
        	delete data.status;
        	return data;
        }
    };
    buildDetail(options);
});