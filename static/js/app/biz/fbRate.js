$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "币种",
        field: "currency",
        type: "select",
        key: "currency",
        formatter: Dict.getNameForList("currency"),
        search: true
    }, {
        title: "汇率",
        field: "rate"
    }, {
        title: "更新时间",
        field: "updateDatetime",
        formatter: dateTimeFormat,
    }];
    buildList({
        columns: columns,
        pageCode: '625282',
        searchParams: {
            companyCode: OSS.company
        },
    });
});