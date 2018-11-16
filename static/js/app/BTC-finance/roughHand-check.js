$(function() {
    var code = getQueryString('code');
    var jourCode = getQueryString('jourCode');
    var view = true;

    var fields = [{
        field: 'code1',
        title: '编号',
        readonly: true,
        formatter: function(v, data) {
            return data.code
        }
    }, {
        field: 'accountName',
        title: '户名',
        readonly: true
    }, {
        field: 'currency',
        title: '币种',
        readonly: true
    }, {
        field: 'direction',
        title: '方向',
        type: 'select',
        data: {
            '0': '红冲',
            '1': '蓝补'
        },
        readonly: true
    }, {
        field: 'amount',
        title: '金额',
        formatter: moneyFormatBTC,
        readonly: true
    }, {
        field: 'applyUser',
        title: '申请人',
        readonly: true
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        field: 'jourList',
        title: '流水明细:',
        readonly: true,
        type: 'o2m',
        columns: [{
            field: 'code',
            title: '流水号',
            formatter: function(v, data) {
                return data.code
            }
        }, {
            field: 'accountName',
            title: '户名',
            formatter: function(v, data) {
                return data.accountName
            }
        }, {
            field: 'currency',
            title: '币种',
            key: 'currency',
            formatter: Dict.getNameForList('currency'),
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
            key: 'jour_biz_type_plat_btc',
            formatter: Dict.getNameForList('jour_biz_type_plat_btc'),
            search: true
        }, {
            field: 'transAmountString',
            title: '变动金额',
            formatter: moneyFormatBTC
        }, {
            field: 'preAmountString',
            title: '变动前金额',
            formatter: moneyFormatBTC
        }, {
            field: 'postAmount',
            title: '变动后金额',
            formatter: moneyFormatBTC
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
        field: 'jourList2',
        title: '区块链流水:',
        readonly: true,
        type: 'o2m',
        pageCode: "802520",
        o2mvalue: {
            order: code
        },
        columns: [{
            field: 'code',
            title: '流水号',
            formatter: function(v, data) {
                return data.code
            }
        }, {
            field: 'accountName',
            title: '户名',
            formatter: function(v, data) {
                return data.accountName
            }
        }, {
            field: 'currency',
            title: '币种',
            key: 'currency',
            formatter: Dict.getNameForList('currency'),
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
            key: 'biz_type',
            formatter: Dict.getNameForList('biz_type'),
        }, {
            field: 'transAmountString',
            title: '变动金额',
            formatter: moneyFormatBTC
        }, {
            field: 'preAmountString',
            title: '变动前金额',
            formatter: moneyFormatBTC
        }, {
            field: 'postAmountString',
            title: '变动后金额',
            formatter: moneyFormatBTC
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
        title: '意见说明',
        field: 'adjustNote',
        maxlength: 250,
        required: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '802806',
    };

    options.buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.adjustResult = '1';
                data.adjustUser = getUserName();
                reqApi({
                    code: '802801',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.adjustResult = '0';
                data.adjustUser = getUserName();
                reqApi({
                    code: '802801',
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

    buildDetail(options);


});