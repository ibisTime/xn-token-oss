$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var userId = getQueryString('userId') || '';

    var fields = [{
        field: 'accountName',
        title: '账号'
    }, {
        field: 'amountString',
        title: '取现金额',
        formatter: moneyFormat
    }, {
        field: 'feeString',
        title: '手续费',
        formatter: moneyFormat
    }, {
        field: 'amount',
        title: '实际到账金额',
        formatter: function(v, data) {
            var amount = new BigDecimal(data.amountString);
            var feeString = new BigDecimal(data.feeString);
            return moneyFormat(amount.subtract(feeString).toString());
        },
        readonly: true
    }, {
        field: 'payFeeString',
        title: '实际支付矿工费',
        formatter: function(v,data){
        	return moneyFormat(v,'',"ETH")
        }
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
    }, {
        title: "区块链类型",
        field: "payCardInfo"
    }, {
        title: "提现地址",
        field: "payCardNo"
    }, {
        title: "打币地址",
        field: "payUser"
    }, {
        title: "交易Hash",
        field: "channelOrder"
    }, {
        field: 'mobile',
        title: '申请人',
        formatter: function(v, data) {
            if (data.user) {
            	if(data.user.kind="P"){
            		return data.user.loginName;
            	}else{
                	return data.user.mobile;
            	}
            } else {
                return data.approveUser
            }
        }
    }, {
        field: 'applyNote',
        title: '申请说明',
        maxlength: 255
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'withdraw_status'
    }, {
        title: "申请时间",
        field: "applyDatetime",
        formatter: dateTimeFormat
    }, {
        title: '审核人',
        field: "approveUser"
    }, {
        title: "审核意见",
        field: "approveNote"
    }, {
        title: "审核时间",
        field: "approveDatetime",
        formatter: dateTimeFormat
    }, {
        title: "支付说明",
        field: "payNote"
    }, {
        title: "支付时间",
        field: "payDatetime",
        formatter: dateTimeFormat
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '802756',
        view: view
    };

    buildDetail(options);
});