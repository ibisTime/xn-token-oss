$(function() {
    var currency = getQueryString('currency') || "";
    var accountNumber = getQueryString('accountNumber') || "";
    var type = getQueryString('type') || 0; // 币种类型
    var bizTypelist = {
        '_CLOD': 'jour_biz_type_plat_cold', // 平台冷钱包账户业务类型
        '_WITHDRAW': 'jour_biz_type_plat_withdraw', // 平台散取账户业务类型
        '_LHLC': 'jour_biz_type_plat_lhlc', // 平台量化理财账户业务类型
        '_HB': 'jour_biz_type_plat_hb', // 平台量化理财账户业务类型
        '_eth': 'jour_biz_type_plat_income_eth', // ETH盈亏账户业务类型
        '_wan': 'jour_biz_type_plat_income_wan', // WAN盈亏账户业务类型
        '_btc': 'jour_biz_type_plat_income_btc', // BTC盈亏账户业务类型
        '_eth_token': 'jour_biz_type_plat_income_eth_token', // ETHToken盈亏账户业务类型
        '_wan_token': 'jour_biz_type_plat_income_wan_token'  // WANToken盈亏账户业务类型
    };
    var bizType = '';
    // 盈亏账户业务类型
    if (bizTypelist['_' + accountNumber.split('_')[3].toUpperCase()] === '_INCOME') {
        if(type == 1) {
            bizType = bizTypelist['_' + 'eth_token'];
        } else if(type == 2) {
            bizType = bizTypelist['_' + 'wan_token'];
        } else {
            bizType = bizTypelist['_' + currency.toLowerCase()];
        }
    } else {
        bizType = bizTypelist['_' + accountNumber.split('_')[3].toUpperCase()];
    }


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名',
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        search: true,
        formatter: Dict.getNameForList('channel_type'),
    }, {
        title: "币种",
        field: "currency",
        type: "select",
        key: "coin",
        formatter: Dict.getNameForList("coin")
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        key: bizType,
        formatter: Dict.getNameForList(bizType),
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
        title: "创建时间",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        search: true,
        formatter: Dict.getNameForList('jour_status'),
    }, {
        field: 'bizNote',
        title: '生成说明'
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: "802524",
        searchParams: {
            kind: "0",
            currency: currency,
            userId: accountNumber ? "" : getUserId(),
            accountNumber: accountNumber,
            companyCode: OSS.company
        }
    });

    $('.tools .toolbar').html('<li style="display:block;" id="detailBtn"><span><img src="/static/images/t01.png"></span>详情</li><li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
        window.location.href = "../finance/breakBalance.html";
    });
    
    //详情
    $('#detailBtn').on('click',function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "ledger_addedit.html?code=" + selRecords[0].code + "&kind="+kind+"&v=1";
    });
    
});