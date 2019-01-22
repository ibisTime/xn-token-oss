$(function() {
  var detId = getQueryString('id');
  var code = getQueryString('code') || '';
  var view = getQueryString('v');

  var dappLabel = [];
  var dappCategory = {};
  var actionData = {};
  reqApi({
    code: '625476',
    json: {
      type: '0'
    },
    sync: true
  }).then(function(data) {
    console.log(data);
    data.forEach(item => {
      dappLabel.push({
        key: item.id,
        value: item.name
      })
    })
  });

  reqApi({
    code: '660906',
    json: {
      parentKey: 'dapp_action'
    },
    sync: true
  }).then(function(data) {
    data.forEach(item => {
      actionData[item.dkey] = item.dvalue;
    })
  });

  reqApi({
    code: '660906',
    json: {
      parentKey: 'dapp_category'
    },
    sync: true
  }).then(function(data) {
    data.forEach(item => {
      dappCategory[item.dkey] = item.dvalue;
    })
  });

  var fields = [{
    title: '语言',
    field: "language",
    required: true,
    readonly: view,
    type: 'select',
    data: {
      'ZH_CN': '简体中文 ',
      'EN': '英语',
      'KO': '韩语'
    }
  }, {
    field: "companyCode",
    hidden: true,
    value: OSS.system
  }, {
    title: '分类',
    field: "category",
    required: 'true',
    type: 'select',
    readonly: view,
    data: dappCategory,
    key: 'dapp_category'
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
    field: 'label',
    type: 'checkbox',
    required: true,
    readonly: view,
    items: dappLabel
  }, {
    title: '位置',
    field: 'location',
    hidden: true
  }, {
    title: '列表显示顺序(数字越小越靠前)',
    field: 'orderNo',
    number: true,
    maxlength: 10,
    required: true,
    readonly: view
  }, {
    title: "列表展示图",
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
    readonly: view,
    required: true,
  }, {
    title: '点击开始后执行的动作',
    field: "action",
    type: 'select',
    required: true,
    readonly: view,
    key: 'dapp_action',
    data: actionData
    // data: {
    //   '1': 'third_part'
    // }
  }, {
    title: '点击开始后跳转的地址',
    field: "url",
    required: true,
    readonly: view
  },
  // {
  //   title: '是否置顶',
  //   field: "isTop",
  //   required: true,
  //   readonly: view,
  //   type: 'select',
  //   data: {
  //     '0': '否',
  //     '1': '是'
  //   }
  // },
  {
    title: '应用描述',
    field: 'desc',
    readonly: view,
    type: 'textarea',
    normalArea: true
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
      if(Array.isArray(data.label)) {
        data.label = data.label.join('||');
      }
      data.isTop = '0';
      data.location = '0';
      return data;
    }
  });

});
