$(function() {
  var detId = getQueryString('id');
  var code = getQueryString('code') || '';
  var view = getQueryString('v');

  var fields = [{
    field: "status",
    required: 'true',
    value: 1,
    hidden: true
  }, {
    field: "companyCode",
    hidden: true,
    value: sessionStorage.getItem('systemCode')
  }, {
    title: '分类',
    field: "category",
    required: 'true',
    type: 'select',
    data: {
      '0': '游戏类',
      '1': '工具类 ',
      '2': '资讯类'
    }
  }, {
    title: '应用名称',
    field: 'name',
    required: true,
    readonly: view,
    maxlength: 32
  }, {
    title: '星级评分',
    field: 'grade',
    required: true,
    readonly: view,
  }, {
    title: '厂商',
    field: 'location',
    required: true,
    readonly: view,
  }, {
    title: '标签',
    field: 'label',
    type: 'checkbox',
    required: true,
    items: [
      {
        key: '0',
        value: '标签1'
      }, {
        key: '1',
        value: '标签2'
      }, {
        key: '2',
        value: '标签3'
      }
    ]
  }, {
    title: '位置',
    field: 'location',
    type: "select",
    key: "banner_location",
    required: true,
    readonly: view,
  }, {
    title: '顺序',
    field: 'orderNo',
    number: true,
    maxlength: 10,
    required: true,
    readonly: view
  }, {
    title: "列表展示图",
    field: "picList",
    type: "img",
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
    field: "picScreenshot",
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
    title: '执行动作',
    field: "action",
    required: true,
    readonly: view
  }, {
    title: 'url地址',
    field: "url",
    required: true,
    readonly: view
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
    id: detId,
    code: code,
    addCode: "625450",
    editCode: "625452",
    detailCode: '625457'
  });

});