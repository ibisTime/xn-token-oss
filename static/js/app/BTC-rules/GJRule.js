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
            type: 'collection_rule_btc',
            companyCode: OSS.company,
			updater: ''
        }
    });
});