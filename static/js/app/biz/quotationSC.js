$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "币种",
        field: "coin",
        type: "select",
        key: "coin",
        formatter: Dict.getNameForList("coin"),
    }, {
        title: "最新成交价",
        field: "lastPrice",
    }, {
        title: "卖家期望价格",
        field: "ask",
    }, {
        title: "买家期望价格",
        field: "bid",
    }, {
        title: "最高价",
        field: "high",
    }, {
        title: "最低价",
        field: "low",
    }, {
        title: "中间价",
        field: "mid",
    }, {
        title: "来源",
        field: "origin"
    }, {
        title: "参照货币",
        field: "referCurrency",
        type: "select",
        data:{
        	'CNY':'人民币'
        }
    }, {
        title: "过去24小时成交量",
        field: "volume",
    }, {
        title: "更新时间",
        field: "updateDatetime",
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '625291',
        searchParams: {
        	coin:'SC'
        },
    });
    
    
});