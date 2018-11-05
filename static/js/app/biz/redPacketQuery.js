$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '红包编号',
        field: 'code'
    }, {
        title: '用户',
        field: 'userId',
        formatter: function(v, data) {
            return data.sendUserMobile + '(' + data.sendUserNickname + ')'
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
        search: true
    }, {
        title: '类型',
        field: 'type',
        type: 'select',
        key: 'red_packet_type',
        formatter: Dict.getNameForList('red_packet_type'),
        search: true
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
        formatter: Dict.getNameForList('red_packet_status'),
        search: true
    }, {
        field: 'createDateTime',
        title: '发送时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '发送时间',
        type1: 'date',
        field2: 'dateEnd',
        type2: 'date',
        twoDate: true,
        search: true,
    }];
    buildList({
        columns: columns,
        pageCode: '623009',
        beforeSearch:function(data){
            if(data.status){
                var statusList = [];
                statusList.push(data.status);
                data.statusList = statusList;
            }
            return data;
        }
    });
    
    //领取记录
    $('#receiveQueryBtn').off('click').click(function(){
    	var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info('请选择记录');
            return;
        }
        
    	window.location.href = './receiveQuery.html?code=' + selRecords[0].code;
    })
});