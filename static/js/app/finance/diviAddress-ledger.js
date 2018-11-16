$(function() {
    var address = getQueryString('address');

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "交易HASH",
        field: 'hash'
    }, {
        field: 'value',
        title: '交易金额',
        formatter: function(v,data){
        	if(data.from==address){
        		return '-'+moneyFormat(v);
        	}else{
        		return moneyFormat(v);
        	}
        }
    }, {
        field: 'fromTo',
        title: '对方地址',
        formatter: function(v,data){
        	if(data.from==address){
        		return data.to;
        	}else{
        		return data.from;
        	}
        }
    }, {
        title: "gasLimit",
        field: 'gasLimit'
    }, {
        title: "gas价格",
        field: 'gasPrice'
    }, {
        title: "消耗gas",
        field: 'gasUsed'
    }, {
        title: "矿工费",
        field: 'gasFee',
        formatter: function(v,data){
            return moneyFormat(v, '', 'ETH');
        }
    }, {
        field: 'refNo',
        title: '关联订单号',
    }, {
        field: 'blockCreateDatetime',
        title: '网络记账时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802107',
        searchParams: {
            kind:'0',
            address: address,
        }
    });
    $(".tools .toolbar").html('<li style="display:block;" id="goBackBtn"><span><img src="/static/images/t01.png"></span>返回</li>')

    $("#goBackBtn").on("click", function() {
        goBack();
    });

});