$(function() {
    var address = getQueryString('address');
    
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "交易ID",
        field: 'transactionid'
    }, {
        field: 'value',
        title: '交易数量',
        formatter: moneyFormatBTC
    }, {
        title: "矿工费",
        field: 'minerfee',
        formatter: moneyFormatBTC
    }, {
        field: 'from',
        title: '来方地址',
    }, {
        title: "去方地址",
        field: "to"
    }, {
        title: "确认高度",
        field: "confirmationheight"
    }, {
        title: "确认时间",
        field: "confirmationtime"
    }, {
        field: 'refNo',
        title: '关联订单号',
    }];
    buildList({
        columns: columns,
        pageCode: '802157',
        searchParams: {
        	address: address,
            companyCode: OSS.company
        }
    });
    $(".tools .toolbar").html('<li style="display:block;" id="goBackBtn"><span><img src="/static/images/t01.png"></span>返回</li>')

    $("#goBackBtn").on("click", function() {
        goBack();
    });

});