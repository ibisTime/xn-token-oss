$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var thisCoin = 'BTC';

	var buttons = [{
        title: '广播',
        handler: function() {
            var dw = dialog({
                content: '<form class="pop-form pop-form-uRef " id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">选择广播地址</li></ul>' +
                    '</form>'
            });

            dw.showModal();

            buildDetail({
                container: $('#formContainer'),
                fields: [{
                    field: 'mAddressCode',
                    title: '地址',
                    required: true,
                    type: "select",
                    pageCode: "802205",
                    params: {
                        type: 'M',
                        statusList: ['0'],
                        companyCode: OSS.company
                    },
                    keyName: "code",
                    valueName: "{{address.DATA}}--{{btcBalanceString.DATA}}",
                    searchName: "address",
                    valueFormatter: {
                        btcBalanceString: function(v){
                            return moneyFormat(v,'',thisCoin)
                        }
                    }
                }],
                buttons: [{
                    title: '确定',
                    handler: function() {
                        if($('#popForm').valid()){
                            showLoading();
                            var data = $('#popForm').serializeObject();
                            data.approveUser = getUserName();
                            data.code = code;
                            reqApi({
                                code: '802754',
                                json: data
                            }).then(function() {
                                hideLoading();
                                sucDetail();
                                dw.close().remove();
                            }, hideLoading);
                        }

                    }
                }, {
                    title: '取消',
                    handler: function() {
                        dw.close().remove();
                    }
                }]
            });

            dw.__center();

        }
    }, {
        title: '不广播',
        handler: function() {
            var dw = dialog({
                content: '<form class="pop-form pop-form-uRef " id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">备注说明</li></ul>' +
                    '</form>'
            });

            dw.showModal();

            buildDetail({
                container: $('#formContainer'),
                fields: [{
                    field: 'approveNote',
                    title: '说明',
                    required: true
                }],
                buttons: [{
                    title: '确定',
                    handler: function() {
                        if($('#popForm').valid()){
                            showLoading();

                            var data = $('#popForm').serializeObject();
                            data.approveUser = getUserName();
                            data.code = code;
                            reqApi({
                                code: '802759',
                                json: data
                            }).then(function() {
                                hideLoading();
                                sucDetail();
                                dw.close().remove();
                            },hideLoading);
                        }

                    }
                }, {
                    title: '取消',
                    handler: function() {
                        dw.close().remove();
                    }
                }]
            });

            dw.__center();

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
            return moneyFormat(v, '', thisCoin)
        },
    }, {
        field: 'feeString',
        title: '手续费',
        formatter: function(v, data) {
            return moneyFormat(v, '', thisCoin)
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
    }, {
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