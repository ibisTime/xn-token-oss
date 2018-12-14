$(function() {
  var dappId = getQueryString('dappId');
  var id = getQueryString('id');
  var code = getQueryString('code') || '';
  var view = getQueryString('v');

  var dappLabel = [];
  reqApi({
    code: '660906',
    json: {
      parentKey: 'dapp_trategy_label'
    },
    sync: true
  }).then(function(data) {
    data.forEach(item => {
      dappLabel.push({
        key: item.dkey,
        value: item.dvalue
      })
    })
  });

  var fields = [{
    field: "companyCode",
    hidden: true,
    value: sessionStorage.getItem('systemCode')
  }, {
    title: '攻略名称',
    field: 'title',
    required: true,
    readonly: view,
    maxlength: 32
  }, {
    title: '作者',
    field: 'author',
    required: true,
    readonly: view,
  }, {
    title: '内容',
    field: 'content',
    type: 'textarea',
    required: true,
    readonly: view
  }, {
    title: '标签',
    field: 'label',
    type: 'checkbox',
    required: true,
    readonly: view,
    items: dappLabel
  }, {
    title: '点赞数量',
    field: 'likeCount',
    readonly: view,
    hidden: !view
  }, {
    title: '浏览数量',
    field: 'scanCount',
    readonly: view,
    hidden: !view
  }, {
    title: '起始点赞数量',
    field: 'likeCountFake',
    required: true,
    readonly: view
  }, {
    title: '起始浏览数量',
    field: 'scanCountFake',
    required: true,
    readonly: view
  }, {
    title: '顺序',
    field: 'orderNo',
    number: true,
    maxlength: 10,
    required: true,
    readonly: view
  }];

  buildDetail({
    fields: fields,
    view,
    id: id,
    code: code,
    addCode: "625460",
    editCode: "625462",
    detailCode: '625467',
    beforeSubmit(data) {
      if(Array.isArray(data.label)) {
        data.label = data.label.join('||');
      }
      data.dappId = dappId;
      return data;
    }
  });

});