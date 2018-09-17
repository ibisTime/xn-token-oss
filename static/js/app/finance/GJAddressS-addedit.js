$(function() {
    var start = {
        elem: '#availableDatetimeStart',
        format: 'YYYY-MM-DD',
        istoday: false,
        min: laydate.now(),
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateFormat(d);
            end.min = datas;
            end.start = datas
        }
    };
    var end = {
        elem: '#availableDatetimeEnd',
        format: 'YYYY-MM-DD',
        min: laydate.now(),
        istoday: false,
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateFormat(d);
            start.max = datas;
        }
    };
    var fields = [{
        title: '使用时间起',
        field: 'availableDatetimeStart',
        type: "date",
        required: true,
        dateOption: start,
    }, {
        title: '使用时间止',
        field: 'availableDatetimeEnd',
        type: "date",
        required: true,
        dateOption: end,
    }];

    var options = {
        fields: fields,
        addCode: '625200'
    };
    buildDetail(options);

});