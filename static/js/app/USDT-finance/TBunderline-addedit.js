$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var userId = getQueryString('userId') || '';

    var fields = [{
        field: 'accountNumber',
        title: '用户账户',
        required: true,
        type: 'select',
        pageCode: '802500',
        dict: [
            ['type', 'account_type']
        ],
        params: {
        	currency: 'USDT',
            userId: userId,
            type:'C'
        },
        keyName: 'accountNumber',
        valueName: '{{accountName.DATA}} - {{currency.DATA}} - {{typeName.DATA}}',
        searchName: 'realName',
        help: '支持户名查询'
    }, {
        field: 'amount',
        title: '取现金额',
        required: true,
        amount: true,
        formatter: function(v, data) {
            return moneyFormat(v, '', 'USDT')
        },
    }, {
        field: 'payCardInfo',
        title: '区块链类型',
        value: 'ETH',
        readonly: true,
        required: true,
    }, {
        field: 'payCardNo',
        title: '提现地址',
        required: true,
    }, {
        field: 'applyNote',
        title: '申请说明',
        maxlength: 255
    }];

    var options = {
        fields: fields,
        code: code,
        addCode: '802751',
        detailCode: '802756',
        view: view,
        beforeSubmit: function(data) {
            data.applyUser = getUserId();
            data.payCardInfo = $("#payCardInfo").text();
            return data;
        }
    };

    buildDetail(options);

});