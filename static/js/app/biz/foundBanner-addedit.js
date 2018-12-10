$(function() {
  var detId = getQueryString('id');
  var code = getQueryString('code') || '';
  var view = getQueryString('v');

  var dappLabel = [];
  reqApi({
    code: '660906',
    json: {
      parentKey: 'dapp_label'
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
    title: '分类',
    field: "category",
    required: 'true',
    type: 'select',
    readonly: view,
    key: 'dapp_category',
    formatter: Dict.getNameForList("dapp_status")
  }, {
    title: '应用名称',
    field: 'name',
    required: true,
    readonly: view,
    maxlength: 32
  }, {
    title: '星级评分',
    field: 'grade',
    type: 'start',
    value: '0',
    required: true,
    readonly: view,
  }, {
    title: '厂商',
    field: 'company',
    required: true,
    readonly: view,
  }, {
    title: '标签',
    field: 'labelList',
    type: 'checkbox',
    required: true,
    readonly: view,
    items: dappLabel
  }, {
    title: '位置',
    field: 'location',
    hidden: true
  }, {
    title: '顺序',
    field: 'orderNo',
    number: true,
    maxlength: 10,
    required: true,
    readonly: view
  }, {
    title: "展示图",
    field: "picList",
    type: "img",
    single: true,
    required: true,
    readonly: view
  }, {
    title: "ICON图",
    field: "picIcon",
    type: "img",
    single: true,
    required: true,
    readonly: view
  }, {
    title: "详情截图",
    field: "picScreenshotList",
    type: "img",
    required: true,
    readonly: view
  }, {
    title: '下载量',
    field: "download",
    required: true,
    readonly: view
  }, {
    title: '成交量',
    field: "volume",
    readonly: view
  }, {
    title: 'url地址',
    field: "url",
    required: true,
    readonly: view
  }, {
    title: '执行动作',
    field: "action",
    type: 'select',
    required: true,
    readonly: view,
    data: {
      '1': 'third_part'
    }
  }, {
    title: '是否置顶',
    field: "isTop",
    required: true,
    readonly: view,
    type: 'select',
    data: {
      '0': '否',
      '1': '是'
    }
  }, {
    title: '语言',
    field: "language",
    required: true,
    readonly: view,
    type: 'select',
    data: {
      'ZH_CN': '简体中文 ',
      'ZN': '英语',
      'KO': '韩语'
    }
  }, {
    title: '应用描述',
    field: 'desc',
    readonly: view,
    maxlength: 255
  }];

  buildDetail({
    fields: fields,
    view,
    id: detId,
    code: code,
    addCode: "625450",
    editCode: "625452",
    detailCode: '625457',
    beforeSubmit(data) {
      data.picScreenshotList = data.picScreenshotList.split('||');
      console.log(data.picScreenshotList);
      data.location = '0';
      return data;
    }
  });

});