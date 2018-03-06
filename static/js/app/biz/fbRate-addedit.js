$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    
    var fields = [{
        field: '',
        title: '日期',
        formatter: dateTimeFormat
    }, {
        title: "1eth",
        field: ""
    }, {
        title: "CNY",
        field: ""
    }, {
        title: "类型",
        field: ""
    }];
    var options = {
        fields: fields,
        code: code,
        view: view,
        detailCode: "",
        editCode: ""
    };
    buildDetail(options);

});