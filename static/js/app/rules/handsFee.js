$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'remark',
        title: '规则名称'
    }, {
        field: 'cvalue',
        title: '数值'
    }];
    buildList({
        columns: columns,
        pageCode: '660915',
        searchParams: {
            type: 'trade_rule',
            companyCode: OSS.company,
			updater: ''
        },
        beforeEdit: function(r) {
            location.href = 'handsFee_addedit.html?code=' + r.id + "&t=" + r.type+"&ckey="+r.ckey;
        }
    });
});