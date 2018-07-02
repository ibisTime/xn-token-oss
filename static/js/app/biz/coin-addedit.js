$(function() {
    var symbol = getQueryString('symbol');
    var view = !!getQueryString('v');
    var isDetail = !!getQueryString('isDetail');
    
    var fields = [{
        title: "符号",
        field: "symbol",
        readonly: !!symbol,
        required: true,
    }, {
        title: "类型",
        field: "type",
        type: 'select',
        data: {
        	'1': '基于ETH的token币',
        	'2': '基于WAN的token币'
        }
    }, {
        title: "英文名称",
        field: "ename",
        required: true,
    }, {
        title: "中文名称",
        field: "cname",
        required: true,
    }, {
        title: "图标",
        field: "icon",
        type: "img",
        single: true,
        required: true,
    }, {
        title: "钱包水印图标",
        field: "pic1",
        type: "img",
        single: true,
        required: true,
    }, {
        title: "流水加钱图标",
        field: "pic2",
        type: "img",
        single: true,
        required: true,
    }, {
        title: "流水减钱图标",
        field: "pic3",
        type: "img",
        single: true,
        required: true,
    }, {
        title: "单位",
        field: "unit",
        readonly: !!symbol,
        required: true,
    }, {
        title: "归集阀值",
        field: "collectStart",
        formatter: function(v, data){
        	return moneyFormat(data.collectStartString,"",data.symbol)
        },
        coinAmount: true,
        required: true,
        hidden: isDetail
    }, {
        title: "取现手续费",
        field: "withdrawFee",
        formatter: function(v, data){
        	return moneyFormat(data.withdrawFeeString,"",data.symbol)
        },
        coinAmount: true,
        required: true,
        hidden: isDetail
    }, {
        title: "归集阀值",
        field: "collectStartString",
        required: true,
        formatter: function(v, data){
        	return moneyFormat(v,"",data.symbol)
        },
        readonly: !!symbol,
        hidden: !isDetail
    }, {
        title: "取现手续费",
        field: "withdrawFeeString",
        required: true,
        formatter: function(v, data){
        	return moneyFormat(v,"",data.symbol)
        },
        readonly: !!symbol,
        hidden: !isDetail
    }, {
        title: "合约地址",
        field: "contractAddress",
        required: true,
        readonly: !!symbol,
    }, {
        title: "合约ABI",
        field: "contractABI",
        required: true,
        readonly: !!symbol,
        type:"textarea",
        normalArea: true
    }, {
        title: "序号",
        field: "orderNo",
        number: true,
        required: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "coin_status",
        formatter: Dict.getNameForList("coin_status"),
        hidden: !isDetail
    }, {
        title: "更新人",
        field: "updater",
        hidden: !isDetail
    }, {
        title: "更新时间",
        field: "updateDatetime",
        formatter: dateTimeFormat,
        hidden: !isDetail
    }, {
        title: "备注",
        field: "remark"
    }];
    
    var options = {
        fields: fields,
        code: {
        	symbol: symbol
        },
        view: view,
        addCode: "802250",
        editCode: "802252",
        detailCode: "802266",
        beforeSubmit: function(data){
        	delete data.collectStartString;
        	delete data.withdrawFeeString;
        	delete data.updater;
        	delete data.updateDatetime;
        	delete data.status;
        	delete data.type;
        	if(symbol){
        		data.symbol = symbol
        	}
        	return data;
        },
        submitSuccess: function(data){
        	getCoinUpdate();
        }
    };
    buildDetail(options);
});