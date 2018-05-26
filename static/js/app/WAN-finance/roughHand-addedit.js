$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var accountNumber = getQueryString('accountNumber');

    var fields = [{
        field: 'accountName',
        title: '账号',
        formatter: function(v, data) {
            return data.withdraw.accountName;
        },
        readonly: true
    }, {
        field: 'amountString',
        title: '取现金额',
        formatter: function(v, data) {
            return moneyFormat(data.withdraw.amountString);
        },
        readonly: true
    }, {
        field: 'feeString',
        title: '手续费',
        formatter: function(v, data) {
            return moneyFormat(data.withdraw.feeString);
        },
        readonly: true
    }, {
        field: 'amount',
        title: '实际到账金额',
        formatter: function(v, data) {
            var amount = new BigDecimal(data.withdraw.amountString);
            var feeString = new BigDecimal(data.withdraw.feeString);
            return moneyFormat(amount.subtract(feeString).toString());
        },
        readonly: true
    }, {
        field: 'payFeeString',
        title: '实际支付矿工费',
        formatter: function(v, data) {
            return moneyFormat(data.withdraw.payFeeString);
        },
        readonly: true
    }, {
        field: 'channelType',
        title: '渠道',
        formatter: function(v, data) {
            if (data.withdraw) {
            	
            	return Dict.getNameForList1('channel_type','',data.withdraw.channelType);
            }

        },
        readonly: true
    }, {
        title: "区块链类型",
        field: "payCardInfo",
        formatter: function(v, data) {
            return data.withdraw.payCardInfo;
        },
        readonly: true
    }, {
        title: "提现地址",
        field: "payCardNo",
        formatter: function(v, data) {
            return data.withdraw.payCardNo;
        },
        readonly: true
    }, {
        title: "打币地址",
        field: "payUser",
        formatter: function(v, data) {
            return data.withdraw.payUser;
        },
        readonly: true
    }, {
        title: "交易Hash",
        field: "channelOrder",
        formatter: function(v, data) {
            return data.withdraw.channelOrder;
        },
        readonly: true
    }, {
        field: 'applyNote',
        title: '申请说明',
        formatter: function(v, data) {
            return data.withdraw.applyNote;
        },
        readonly: true
    }, {
        field: 'status',
        title: '状态',
        formatter: function(v, data) {
    		return Dict.getNameForList1('withdraw_status','',data.withdraw.status);
        },
        readonly: true
    }, {
        title: "申请时间",
        field: "applyDatetime",
        formatter: function(v, data) {
            return dateTimeFormat(data.withdraw.applyDatetime);
        },
        readonly: true
    }, {
        title: "审核说明",
        field: "approveNote",
        formatter: function(v, data) {
            return data.withdraw.approveNote;
        },
        readonly: true
    }, {
        title: '审核人',
        field: "approveUser",
        formatter: function(v, data) {
            return data.withdraw.approveUser;
        },
        readonly: true
    }, {
        title: "审核时间",
        field: "approveDatetime",
        formatter: function(v, data) {
            return dateTimeFormat(data.withdraw.approveDatetime);
        },
        readonly: true
    }, {
        title: "支付说明",
        field: "payNote",
        formatter: function(v, data) {
            return data.withdraw.payNote;
        },
        readonly: true
    }, {
        title: "支付时间",
        field: "payDatetime",
        formatter: function(v, data) {
            return dateTimeFormat(data.withdraw.payDatetime);
        },
        readonly: true
    }, {
        field: 'jourList',
        title: '本地流水:',
        readonly: true,
        type: 'o2m',
        columns: [{
            field: 'code',
            title: '流水号',
            formatter: function(v, data) {
                return data.code
            }
        }, {
            field: 'realName',
            title: '户名',
            formatter: function(v, data) {
                return data.realName
            }
        }, {
            field: 'currency',
            title: '币种',
            key: 'coin',
            formatter: Dict.getNameForList('coin'),
        }, {
            field: 'channelType',
            title: '渠道',
            type: 'select',
            key: 'channel_type',
            formatter: Dict.getNameForList('channel_type'),
            search: true
        }, {
            field: 'bizType',
            title: '业务类型',
            type: 'select',
            key: 'jour_biz_type',
            formatter: Dict.getNameForList('jour_biz_type'),
            search: true
        }, {
            field: 'transAmountString',
            title: '变动金额',
            formatter: moneyFormat
        }, {
            field: 'preAmountString',
            title: '变动前金额',
            formatter: moneyFormat
        }, {
            field: 'postAmountString',
            title: '变动后金额',
            formatter: moneyFormat
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'jour_status',
            formatter: Dict.getNameForList('jour_status'),
            search: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat
        }, {
            field: 'bizNote',
            title: '生成说明'
        }, ]
    }, {
        field: 'ethTransList',
        title: '区块链流水',
        readonly: true,
        type: 'o2m',
        columns: [{
            field: 'blockNumber',
            title: 'blockNumber',
        }, {
            field: 'from',
            title: 'from'
        }, {
            field: 'to',
            title: 'to'
        }, {
            field: 'gas',
            title: 'gasLimit',
        }, {
            field: 'gasPrice',
            title: 'gasPrice',
            formatter: moneyFormat,
        }, {
            field: 'gasUsed',
            title: 'gasUsed'
        }, {
	        title: "矿工费",
	        field: 'kgPrice',
	        formatter: function(v,data){
	        	var gasPrice = new BigDecimal(data.gasPrice);
	        	var gasUsed = new BigDecimal(data.gasUsed);
	        	kgPrice =  gasPrice.multiply(gasUsed).toString();
	        	return moneyFormat(kgPrice);
	        	}
        },{
            field: 'nonce',
            title: 'nonce'
        }, {
            field: 'refNo',
            title: 'refNo'
        }, {
            title: "交易Hash",
            field: "hash"
        }, {
            field: 'transactionIndex',
            title: 'transactionIndex'
        }, {
            title: "value",
            field: "value",
            formatter: moneyFormat,
        }]
    }, {
//      title: '对账说明',
//      field: 'checkNote',
//      // type: "textarea",
//      // normalArea: true,
//      required: true,
//      readonly: view,
//      maxlength: 250
//  }, {
        field: 'checkUser',
        type: 'hidden',
        value: getUserName()
    }];
    var buttonsView = [{
        title: "返回",
        handler: function() {
            goBack();
        }
    }];

    var buttons2 = [{
        title: "正确",
        handler: function() {
            var data = $('#jsForm').serializeObject();
            // data.result="1";
            reqApi({
                code: '802800',
                json: data
            }).then(function() {
                sucDetail();
            });
        }
    }, {
        title: "不平账",
        handler: function() {
            var data = $('#jsForm').serializeObject();
            // data.result="0";
            reqApi({
                code: '802800',
                json: data
            }).then(function() {
                sucDetail();
            });
        }
    }, {
        title: "返回",
        handler: function() {
            goBack();
        }
    }];
    var options = {
        fields: fields,
        code: code,
        detailCode: '802758',
        view: view,
        buttons: buttonsView
//      buttons: view ? buttonsView : buttons2
    };

    buildDetail(options);


});