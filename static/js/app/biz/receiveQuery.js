$(function() {
    var code = getQueryString('code') || '';
    var searchFlag = !!getQueryString('code');

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '领取人',
        field: 'userId',
        formatter: function(v, data) {
            return data.userMobile;
        },
        type: 'select',
        pageCode: '805120',
        params: {
            updater: '',
            kind: 'C'
        },
        keyName: 'userId',
        valueName: '{{mobile.DATA}}--{{nickname.DATA}}',
        searchName: 'mobile',
        search: true
    }, {
        title: '币种',
        field: 'symbol',
        type: 'select',
        pageCode: '802265',
        keyName: 'symbol',
        valueName: '{{symbol.DATA}}-{{cname.DATA}}',
        searchName: 'symbol',
        search: !searchFlag,
        formatter: function(v, data) {
            return data.redPacketInfo.symbol;
        }
    }, {
        title: '类型',
        field: 'type',
        type: 'select',
        key: 'red_packet_type',
        search: !searchFlag,
        formatter: function(v, data) {
            return Dict.getNameForList1('red_packet_type', '', data.redPacketInfo.type);
        }
    }, {
        title: '领取数量',
        field: 'count'
    }, {
        field: 'createDatetime',
        title: '领取时间',
        formatter: dateTimeFormat
    }, {
        title: '红包编号',
        field: 'redPacketCode'
    }, {
        title: '红包发送人',
        field: 'redPacketUser',
        formatter: function(v, data) {
            return data.redPacketInfo.sendUserMobile + '(' + data.redPacketInfo.sendUserNickname + ')'
        }
    }, {
        title: '红包总个数',
        field: 'sendNum',
        formatter: function(v, data) {
            return data.redPacketInfo.sendNum;
        }
    }, {
        title: '红包总额',
        field: 'totalCount',
        formatter: function(v, data) {
            return data.redPacketInfo.totalCount;
        }
    }, {
        field: 'createDateTime',
        title: '发送时间',
        formatter: function(v, data) {
            return dateTimeFormat(data.redPacketInfo.createDateTime);
        }
    }];
    buildList({
        columns: columns,
        pageCode: '623010',
        searchParams: {
            redPacketCode: code
        },
    });
    
    if(code) {
        $('.tools .toolbar').html('<li style="display:block;" id="goBackBtn"><span><img src="/static/images/t01.png"></span>返回</li>')

        $('#goBackBtn').on('click', function() {
            goBack();
        });
    }
});