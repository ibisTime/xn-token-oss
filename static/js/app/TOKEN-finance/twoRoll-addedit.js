$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
            field: 'code1',
            title: '订单编号',
            formatter: function(v, data) {
                return data.tradeOrder.code;
            },
            readonly: true
        }, {
            title: "买家",
            field: "buyUser",
            readonly: true,
            formatter: function(v, data) {
                if (data.tradeOrder.buyUserInfo) {
                    return data.tradeOrder.buyUserInfo.mobile + '(' + data.tradeOrder.buyUserInfo.nickname + ')'
                }
            },

        }, {
            title: "卖家",
            field: "sellUser",
            formatter: function(v, data) {
                if (data.tradeOrder.sellUserInfo) {
                    return data.tradeOrder.sellUserInfo.mobile + '(' + data.tradeOrder.sellUserInfo.nickname + ')'
                }
            },
            readonly: true
        }, {
            title: "交易广告名称",
            field: "adsCode",
            formatter: function(v, data) {
                return data.tradeOrder.adsCode;
            },
            readonly: true
        }, {
            title: "交易价格",
            field: "tradePrice",
            formatter: function(v, data) {
                return data.tradeOrder.tradePrice;
            },
            readonly: true
        }, {
            title: "交易数量",
            field: "countString",
            formatter: function(v, data) {
                return moneyFormat(data.tradeOrder.countString,'',data.tradeOrder.tradeCoin) + getCoinName(data.tradeOrder.tradeCoin);
            },
            readonly: true
        }, {
            title: "交易金额",
            field: "tradeAmount",
            formatter: function(v, data) {
                return data.tradeOrder.tradeAmount;
            },
            readonly: true
        }, {
            title: "手续费",
            field: "feeString",
            formatter: function(v, data) {
                return moneyFormat(data.tradeOrder.feeString,"",data.tradeOrder.tradeCoin);
            },
            readonly: true
        }, {
            title: "交易虚拟币币种",
            field: "tradeCoin",
            formatter: function(v, data) {
                if (data.tradeOrder) {
            		return getCoinName(data.tradeOrder.tradeCoin);
                }

            },
            readonly: true
        }, {
            title: "交易法币币种",
            field: "tradeCurrency",
            formatter: function(v, data) {
                if (data.tradeOrder) {
                    if (data.tradeOrder.tradeCurrency == "CNY") {
                        return "人民币"
                    } else if (data.tradeOrder.tradeCurrency == "USD") {
                        return "美元"
                    } else if (data.tradeOrder.tradeCurrency == "HKD") {
                        return "港币"
                    }
                }

            },
            readonly: true
        }, {
            title: "支付方式",
            field: 'payType',
            formatter: function(v, data) {
                if (data.tradeOrder.payType == "0") {
                    return "支付宝"
                } else if (data.tradeOrder.payType == "1") {
                    return "微信"
                } else if (data.tradeOrder.payType == "2") {
                    return "银联转账"
                }
            },
            readonly: true
        }, {
            title: "下单时间",
            field: "createDatetime",
            formatter: function(v, data) {
                return dateTimeFormat(data.tradeOrder.createDatetime)
            },
            readonly: true
        }, {
            title: "支付失效时间",
            field: "invalidDatetime",
            formatter: function(v, data) {
                return dateTimeFormat(data.tradeOrder.invalidDatetime)
            },
            readonly: true
        }, {
            title: "买家标记时间",
            field: "markDatetime",
            formatter: function(v, data) {
                return dateTimeFormat(data.tradeOrder.markDatetime)
            },
            readonly: true
        }, {
            title: "卖家释放时间",
            field: "releaseDatetime",
            formatter: function(v, data) {
                return dateTimeFormat(data.tradeOrder.releaseDatetime)
            },
            readonly: true
        }, {
            title: "状态",
            field: "status",
            formatter: function(v, data) {
                if (data.tradeOrder) {
                	return Dict.getNameForList1("trade_order_status","",data.tradeOrder.status)
                }
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
                key: 'jour_biz_type_plat_eth_token',
                formatter: Dict.getNameForList('jour_biz_type_plat_eth_token'),
                search: true
            }, {
                field: 'transAmountString',
                title: '变动金额',
		        formatter: function(v, data){
		    		return moneyFormat(v,'',data.currency);
		        }
            }, {
                field: 'preAmountString',
                title: '变动前金额',
		        formatter: function(v, data){
		    		return moneyFormat(v,'',data.currency);
		        }
            }, {
                field: 'postAmountString',
                title: '变动后金额',
		        formatter: function(v, data){
		    		return moneyFormat(v,'',data.currency);
		        }
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
//      },{
//             title: '偏离金额',
//             field: 'checkAmount',
//             amount1: true,
//             value: '0',
//             required: true,
//             readonly: false,
//      }, {
//          title: '对账说明',
//          field: 'checkNote',
//          required: true,
//          readonly: false,
//          maxlength: 250
        }, {
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
        detailCode: '625252',
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