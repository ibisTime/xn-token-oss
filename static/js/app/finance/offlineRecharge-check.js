$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var isDetail = !!getQueryString('detail');

    var approveNoteField = {
        title: '支付意见',
        field: 'payNote',
        maxlength: 250,
        required: true,
        readonly: false
    };
  	var payList = [approveNoteField]

    var buttons = [{
        title: '支付',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.payResult = '1';
                data.payUser = getUserName();
                data.codeList = [data.code];
                reqApi({
                    code: '802701',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不支付',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.payResult = '0';
                data.payUser = getUserName();
                data.codeList = [data.code];
                reqApi({
                    code: '802701',
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


    if (isDetail) {
        approveNoteField = {
            title: '支付说明',
            field: 'payNote',
            maxlength: 250
        };
        approveCodeField = {
            title: '支付渠道号',
            field: 'payCode',
            maxlength: 250,
        };
        buttons = "";
        payList = [{
            field: 'payUser',
            title: '支付人'
        }, {
            field: 'payDatetime',
            title: '支付时间',
            formatter: dateTimeFormat
        }, approveNoteField]
    }

    var fields = [{
        title: '编号',
        field: 'code1',
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        title: '账号',
        field: 'accountNumber',
        required: true
    }, {
        title: '户名',
        field: 'accountName',
        required: true
    }, {
        field: 'amountString',
        title: '金额',
        formatter: moneyFormat
    }, {
        field: 'currency',
        title: '币种',
    }, {
        field: 'channelType',
        title: '支付渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
    }, {
        field: 'payCardInfo',
        title: '打币渠道',
        required: true,
        maxlength: 255
    }, {
        field: 'payCardNo',
        title: '打币地址',
        required: true,
        maxlength: 255
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'charge_status',
        formatter: Dict.getNameForList('charge_status'),
    }, {
        field: 'applyUser',
        title: '申请人',
        formatter: function(v, data) {
        	if(data.user){
        		if (data.user.kind == 'P') {
                	return data.user.loginName;
	            } else if(data.user.mobile) {
	                return data.user.interCode + data.user.mobile;
	            } else {
                return data.user.email;
              }
        	}else{
        		return data.applyUser
        	}
        }
    }, {
        field: 'bizNote',
        title: '申请说明'
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
    }];
    fields = fields.concat(payList)

    var options = {
        fields: fields,
        code: code,
        detailCode: '802706',
        view: true,
        buttons: buttons
    };

    buildDetail(options);
});
