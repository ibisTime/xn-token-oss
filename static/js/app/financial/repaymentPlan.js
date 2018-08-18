$(function() {
	var productCode = getQueryString('code');

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "期数",
        field: "periods",
        search: true
    }, {
        title: "应还本金",
        field: "principalTotal"
    }, {
        title: "应还本息",
        field: "amountTotal"
    }, {
        title: "应还利息",
        field: "interestTotal"
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "repay_plan_status",
        formatter: Dict.getNameForList("repay_plan_status"),
        search: true
    }, {
        title: "已还本金",
        field: "principalYet"
    }, {
        title: "已还本息",
        field: "amountYet"
    }, {
        title: "已还利息",
        field: "interestYet"
    }, {
        title: "还款时间",
        field: "repayDatetime",
        formatter: dateTimeFormat,
    }];
    buildList({
        columns: columns,
        pageCode: '625540',
        searchParams: {
            productCode: productCode
        },
    });
    
    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
    	goBack();
    });
});