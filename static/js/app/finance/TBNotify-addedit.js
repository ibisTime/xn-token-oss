$(function() {
    var columns = [ {
        title: '手机号',
        field: 'dvalue',
        required: true,
        mobile: true
    }];

    buildDetail({
        fields: columns,
        addCode: '660900',
        beforeSubmit:function (data) {
            data.parentKey = 'qx_sms_notice';
            data.dkey = data.dvalue;
            data.type = 1;
            return data;
        }
    });
});