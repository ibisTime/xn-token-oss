$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
	
	var buttons = [{
        title: '广播',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.code = code;
                data.approveResult = "1";
                data.approveUser = getUserName();
                reqApi({
                    code: '802754',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }

        }
    }, {
        title: '不广播',
        handler: function() {
            if ($('#jsForm').valid()) {
                data.code = code;
                data.approveResult = "0";
                data.approveUser = getUserName();
                reqApi({
                    code: '802754',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];
    

    var fields = [{
        field: 'accountName',
        title: '账号'
    }, {
        field: 'amountString',
        title: '取现金额',
        formatter: function(v, data) {
            return moneyFormat(v, '', 'USDT')
        },
    }, {
        field: 'feeString',
        title: '手续费',
        formatter: function(v, data) {
            return moneyFormat(v, '', 'USDT')
        },
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
    },{
        title: '审核意见',
        field: 'approveNote',
        maxlength: 250,
        required: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '802756',
        view: true,
        buttons: buttons
    };

    buildDetail(options);
});