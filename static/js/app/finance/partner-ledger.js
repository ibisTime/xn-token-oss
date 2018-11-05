$(function() {
    var accountNumber = getQueryString('accountNumber');
    var accountCode = getQueryString('accountCode');
    var kind = getQueryString('kind')||'0';
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'accountName',
        title: '户名'
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        key: 'coin',
        formatter: Dict.getNameForList("coin"),
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
        key: kind=='1'?'frezon_jour_biz_type_user':'jour_biz_type_user',
        formatter: kind=='1'?Dict.getNameForList('frezon_jour_biz_type_user'):Dict.getNameForList('jour_biz_type_user'),
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
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '创建时间',
        type: 'date',
        field2: 'dateEnd',
        type2: 'datetime',
        twoDate: true,
        search: true
    }];
    buildList({
        columns: columns,
        pageCode: '802520',
        searchParams: {
            kind:kind,
            accountNumber: accountNumber ? accountNumber : accountCode,
            companyCode: OSS.company
        }
    });
    $(".tools .toolbar").html('<li style="display:block;" id="goBackBtn"><span><img src="/static/images/t01.png"></span>返回</li>')

    $("#goBackBtn").on("click", function() {
        goBack();
    });

});