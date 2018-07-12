$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '名称'
	},{
		field : 'cvalue',
		title : '账号'
	}];
	buildList({
		columns: columns,
		pageCode: '660915',
		searchParams: {
			type: 'followUs',
			companyCode: OSS.company,
			updater: '',
			orderColumn:'id',
			orderDir: 'asc'
		},
		beforeEdit: function(r) {
			location.href = '../rules/ruleAccount_addedit.html?code=' + r.id +"&t="+ r.type;
		}
	});
});
