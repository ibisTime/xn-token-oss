$(function() {
  var detId = getQueryString('id');
  var code = getQueryString('id') || '';
  var view = getQueryString('v');
  console.log(detId);
  var fields = [{
    title: '标签类型',
    field: 'type',
    type: 'select',
    key: 'open_dapp_tag_type',
    required: true
  }, {
    title: '标签中文名',
    field: 'name',
    required: true
  }, {
    title: '标签英文名',
    field: 'nameEn',
    required: true
  }, {
    title: '标签韩文名',
    field: 'nameKo',
    required: true
  }];

  buildDetail({
    fields: fields,
    view,
    id: detId,
    code: code,
    addCode: "625470",
    editCode: "625472",
    detailCode: '625477'
  });

});
