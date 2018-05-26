$(function() {
    var view = !!getQueryString('v');
    var userId = getQueryString('userId') || '';


    var fields = [{
        field: 'accountNumber',
        title: '充值账户',
        required: true,
        type: 'select',
        pageCode: userId ? '802503' : '802500',
        keyCode1: '660906',
        dict: [
            ['currency', 'coin'],
            ['type', 'account_type']
        ],
        params: {
            userId: userId,
            currency:'WAN',
            type:"C"
        },
        keyName: 'accountNumber',
        valueName: '{{realName.DATA}} - {{currencyName.DATA}} - {{typeName.DATA}}',
        searchName: 'realName',
        help: '支持户名查询'
    }, {
        title: "充值数量",
        field: 'amount',
        required: true,
        number: true,
        maxlength: 13,
        amount: 'true',
        coin:"WAN",
        formatter: moneyFormat
    }, {
        field: 'payCardInfo',
        title: '打币渠道',
        maxlength: 255
    }, {
        field: 'payCardNo',
        title: '打币地址',
        maxlength: 255
    }, {
        field: 'applyNote',
        title: '充值说明',
        maxlength: 255
    }];

    var options = {
        fields: fields,
        addCode: '802700',
        view: view,
        beforeSubmit: function(data) {
            var BIGvalue = new BigDecimal(data.amount);
//          value = BIGvalue.multiply(new BigDecimal("1000000000000000000")).toString();
//          data.amount = value;
            data.applyUser = getUserId();
            return data;
        }
    };

    buildDetail(options);

})