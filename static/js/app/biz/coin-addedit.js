$(function() {
    var symbol = getQueryString('symbol');
    var view = !!getQueryString('v');
    var isDetail = !!getQueryString('isDetail');
    var isDdit = !!getQueryString('isDdit');
    var selectData = {
      '0': '否',
      '1': '是'
    };

    var fields = [{
        title: "符号",
        field: "symbol",
        readonly: !!symbol,
        maxlength: 6,
        minlength: 1,
        required: true,
    }, {
        title: "类型",
        field: "type",
        type: 'select',
        data: {
        	'1': '基于ETH的token币'
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
      title: "默认添加自选",
      field: "isSelect",
      type: 'select',
      required: true,
      readonly: isDdit || isDetail,
      data: selectData
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
        	switch($('#isSelect').text()) {
            case '否': data.isSelect = '0';break;
            case '是': data.isSelect = '1';break;
          }
        	data.pic1 = data.icon;
        	data.pic2 = data.icon;
        	data.pic3 = data.icon;
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