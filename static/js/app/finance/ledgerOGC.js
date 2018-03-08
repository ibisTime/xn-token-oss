$(function() {
    var address = getQueryString('address');

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'hash',
        title: '交易hash',
    }, {
        field: 'blockNumber',
        title: '区块编号',
    }, {
        field: "tokenFrom",
        title: "发起地址",
    }, {
        field: 'tokenTo',
        title: '接收地址',
    }, {
        field: 'tokenValue',
        title: '数量',
        formatter: moneyFormat
    }, {
        field: 'gas',
        title: '消耗gas',
        formatter: moneyFormat
    }, {
        title: "创建时间",
        field: "creates",
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: "802107",
        searchParams: {
        	tokenAddress: address
        }
    });

    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
        window.location.href = "../finance/breakBalance.html";
    });
    
});