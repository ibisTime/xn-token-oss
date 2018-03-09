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
        field: 'tokenValue',
        title: '交易金额',
        formatter: function(v,data){
        	if(data.tokenFrom==address){
        		return '-'+moneyFormat(v);
        	}else{
        		return moneyFormat(v);
        	}
        }
    }, {
        field: 'fromTo',
        title: '对方地址',
        formatter: function(v,data){
        	if(data.tokenFrom==address){
        		return data.tokenTo;
        	}else{
        		return data.tokenFrom;
        	}
        }
    }, {
        title: "gasLimit",
        field: 'gas'
    }, {
        title: "gas价格",
        field: 'gasPrice',
        formatter: function(v, data){
        	return moneyFormat(v,'',"ETH");
        },
    }, {
        title: "消耗gas",
        field: 'gasUsed'
    }, {
        title: "矿工费",
        field: 'kgPrice',
        formatter: function(v,data){
        	var gasPrice = new BigDecimal(data.gasPrice);
        	var gasUsed = new BigDecimal(data.gasUsed);
        	kgPrice =  gasPrice.multiply(gasUsed).toString();
        	return moneyFormat(kgPrice,'',"ETH");
        }
    }, {
        field: 'creates',
        title: '网络记账时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802107',
        searchParams: {
            kind:'0',
            tokenAddress: address,
        }
    });
    $(".tools .toolbar").html('<li style="display:block;" id="goBackBtn"><span><img src="/static/images/t01.png"></span>返回</li>')

    $("#goBackBtn").on("click", function() {
        goBack();
    });

});