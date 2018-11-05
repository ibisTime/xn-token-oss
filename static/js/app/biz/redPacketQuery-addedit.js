$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        title: '红包编号',
        field: 'code'
    }, {
        title: '用户',
        field: 'userId',
        formatter: function(v, data) {
            return data.sendUserMobile + '(' + data.sendUserNickname + ')'
        }
    }, {
        title: '币种',
        field: 'symbol',
        type: 'select',
        pageCode: '802265',
        keyName: 'symbol',
        valueName: '{{symbol.DATA}}-{{cname.DATA}}',
        searchName: 'symbol'
    }, {
        title: '类型',
        field: 'type',
        type: 'select',
        key: 'red_packet_type',
        formatter: Dict.getNameForList('red_packet_type')
    }, {
        title: '红包总个数',
        field: 'sendNum'
    }, {
        title: '红包总额',
        field: 'totalCount'
    }, {
        title: '已领取个数',
        field: 'receivedNum'
    }, {
        title: '已领取总额',
        field: 'receivedCount'
    }, {
        title: '状态',
        field: 'status',
        type: 'select',
        key: 'red_packet_status',
        formatter: Dict.getNameForList('red_packet_status')
    }, {
        field: 'createDateTime',
        title: '发送时间',
        formatter: dateTimeFormat
    }, {
        field: 'bestHandUserNickname',
        title: '最佳手气用户'
    }, {
        field: 'bestHandCount',
        title: '手气最佳金额'
    }];
    
    var options = {
        fields: fields,
        code: code,
        view: view,
        detailCode: "623006"
    };
    buildDetail(options);
});