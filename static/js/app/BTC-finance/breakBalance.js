$(function () {
    var accountNumberCNY;
    var accountNumberTG;
    var currency = 'BTC';

    showLoading();
    $('#tableList').bootstrapTable({
        columns: [{
            field: 'name',
            title: '名称',
        }, {
            title: '数量',
            field: 'amount',
            formatter: function (v, data) {
                return moneyFormat(v, '', currency);
            },
        }],
        singleSelect: true, //禁止多选
        clickToSelect: true, //自动选中
        uniqueId: 'id'
    });

    reqApi({
        code: '802500',
        json: {
            'start': 1,
            'limit': 10,
            'type': 'P',
            'currency': currency
        },
        sync: true
    }).then(function (data) {
        hideLoading();
        var lists = data.list;
        var html = '';

        lists.forEach(function (d) {
            html += buildHtml(d);
        });
        $("#accountWrap").html(html);
        $('#accountWrap').on('click', '.account-list-w .accoutFlowBtn', function () {
            location.href = './ledger.html?accountNumber=' + $(this).attr('data-accountNumber')+ '&currency=' + currency;
        });
    }, hideLoading);

    function buildHtml(item) {
        var btnHtml = '';
        if(item.accountNumber.indexOf('_COLD') != -1) {
            btnHtml = `<div class="btn accoutFlowColdBtn" data-accountNumber="${item.accountNumber}">资金流水</div>`;
        } else {
            btnHtml = `<div class="btn accoutFlowBtn" data-accountNumber="${item.accountNumber}">资金流水</div>`;
        }
        return `<div class="account-list-w">
                    <div class="account-list">
                        <div class="account-fs">${item.realName}：
                            <p class="account-amount">${moneyFormat(item.amountString, '', item.currency)}</p>
                        </div>
                        <div class="account-btn">
                            ${btnHtml}
                        </div>
                    </div>
                </div>`;
    }

    reqApi({
        code: '802900',
        json: {
            'symbol': currency
        },
        sync: true
    }).then(function (data) {
        hideLoading()
        var tableData = [{
            name: '平台所有币',
            amount: data.totalCountString
        }, {
            name: '历史总归集',
            amount: data.totalCollectCountString
        }, {
            name: '历史总取现',
            amount: data.totalWithdrawCountString
        }, {
            name: '散取地址总余额',
            amount: data.totalMAddressCountString
        }, {
            name: '分发地址总余额',
            amount: data.totalXAddressCountString
        }, {
            name: '取现手续费收入',
            amount: data.totalWithdrawFeeCountString
        }, {
            name: '取现矿工费支出',
            amount: data.totalWithdrawMineFeeCountString
        }];

        if(data.coinType === '0') {
            tableData = tableData.concat([{
                name: '归集矿工费支出',
                amount: data.totalWithdrawMineFeeCountString
            }, {
                name: '生态币归集补给矿工费支出',
                amount: data.totalExtCollectSupplyFeeCountString
            }, {
                name: '补给地址总余额',
                amount: data.totalSAddressCountString
            }]);
        }
        $('.createDatetime').html('统计时间: ' + dateTimeFormat(data.createDatetime));
        $('#tableList').bootstrapTable('prepend', tableData)
    }, hideLoading);

});