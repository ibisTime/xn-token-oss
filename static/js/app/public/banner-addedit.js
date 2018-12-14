$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');
    var bannerAction = {};

    reqApi({
      code: '660906',
      json: {
        parentKey: 'banner_action'
      },
      sync: true
    }).then(function(data) {
      data.forEach(item => {
        bannerAction[item.dkey] = item.dvalue;
      })
    });

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
        field: "type",
        value: 2,
        required: 'true',
        hidden: true
    }, {
        field: "belong",
        title: '属于',
        value: 1,
        required: 'true',
        hidden: true
    }, {
        field: "parentCode",
        value: 0,
        required: 'true',
        hidden: true
    }, {
        field: "contentType",
        required: 'true',
        value: 1,
        hidden: true
    }, {
        field: "isCompanyEdit",
        required: 'true',
        value: 0,
        hidden: true
    }, {
        title: 'banner名称',
        field: 'name',
        required: true,
        readonly: view,
        maxlength: 32
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
        title: "banner图片",
        field: "pic",
        type: "img",
        single: true,
        required: true,
        readonly: view
    }, {
      title: '点击后跳转类型',
      field: "action",
      type: 'select',
      key: 'banner_action',
      data: bannerAction,
      readonly: view,
      onChange(v) {
        if(v === '0') {
          $('#url').parents('li').hide();
        }
        if(v === '1') {
          $('#url').parents('li').show();
          $('#url').prev('label').text('url地址');
        }
        if(v === '2') {
          $('#url').parents('li').show();
          $('#url').prev('label').text('应用ID');
        }
      }
    }, {
      title: 'url地址',
      field: "url",
      readonly: view
    }, {
        title: '备注',
        field: 'remark',
        readonly: view,
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        addCode: "805800",
        editCode: "805802",
        detailCode: '805807',
        beforeSubmit(data) {
          if(data.action === '0') {
            data.url = null;
          }
          return data;
        }
    });

});