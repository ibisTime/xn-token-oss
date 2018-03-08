$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var collectionData;
    reqApi({
        code: "802707",
        json: {
            code: code
        },
        sync: true
    }).then(function(data) {
        collectionData = data.collection?[data.collection]:[]
    });
    var fields = [{
            title: '户名',
            field: 'accountName',
            formatter: function(v, data) {
                return data.charge.accountName;
            },
            readonly: true
        }, {
            title: '账号',
            field: 'accountNumber',
            readonly: true,
            formatter: function(v, data) {
                return data.charge.accountNumber;
            },

        }, {
            field: 'currency',
            title: '币种',
            type: 'select',
            formatter: function(v, data) {
                if (data.charge) {
            		return Dict.getNameForList1('coin','',data.charge.currency);
            	}
            },
            readonly: true,
        }, {
            field: 'channelType',
            title: '渠道类型',
            formatter: function(v, data) {
                if (data.charge) {
                	return Dict.getNameForList1('channel_type','',data.charge.channelType);
                }

            },
            readonly: true
        }, {
            field: 'bizType',
            title: '业务类型',
            formatter: function(v, data) {
                if (data.charge) {
                	return Dict.getNameForList1('jour_biz_type','',data.charge.bizType);
                }

            },
            readonly: true,
        }, {
            field: 'bizNote',
            title: '业务说明',
            formatter: function(v, data) {
                return data.charge.bizNote
            },
            readonly: true
        },
        {
            field: 'amountString',
            title: '交易金额',
            formatter: function(v, data) {
                return moneyFormat(data.charge.amountString)
            },
            readonly: true
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            formatter: function(v, data) {
                return dateTimeFormat(data.charge.applyDatetime)
            },
            readonly: true
        }, {
            field: 'status',
            title: '状态',
            formatter: function(v, data) {
            	if(data.charge){
            		return Dict.getNameForList1('charge_status','',data.charge.status);
            	}
            },
            readonly: true
        }, {
            field: 'refNo',
            title: '交易Hash',
            formatter: function(v, data) {
                return data.charge.refNo;
            },
            readonly: true
        }, {
            field: 'jourList',
            title: '本地流水:',
            readonly: true,
            type: 'o2m',
            columns: [{
                field: 'code1',
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
                formatter: Dict.getNameForList('channel_type')
            }, {
                field: 'bizType',
                title: '业务类型',
                type: 'select',
                key: 'jour_biz_type',
                formatter: Dict.getNameForList('jour_biz_type'),
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
            }]
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
//          title: '对账说明',
//          field: 'checkNote',
//          // type: "textarea",
//          // normalArea: true,
//          required: true,
//          readonly: view,
//          maxlength: 250
//      }, {
            field: 'checkUser',
            type: 'hidden',
            value: getUserName()
        }
    ];
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
        detailCode: '802707',
        view: view,
        beforeSubmit: function(data) {
            data.order = data.code;
            return true;
        },
        buttons: buttonsView
//      buttons: view ? buttonsView : buttons2
    };
    buildDetail(options);
});