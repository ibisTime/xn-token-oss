$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '参数名称',
        field: 'remark',
    }, {
        title: '参数说明',
        field: 'cvalue'
    }];
    buildList({
        columns: columns,
        pageCode: '660915',
        searchParams: {
            companyCode: OSS.company,
            type: "sell_ads_hint",
			updater: ''
        },
        beforeEdit: function(data) {
            window.location.href = "./buyETH_addedit.html?code=" + data.id;
        }
    });


});