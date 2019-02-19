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
          $('#url_symbol').parents('li').hide();
        }
        if(v === '1') {
          $('#url').parents('li').show();
          $('#url_symbol').parents('li').hide();
          $('#url').prev('label').text('url地址');
        }
        if(v === '2') {
          $('#url').parents('li').show();
          $('#url_symbol').parents('li').hide();
          $('#url').prev('label').text('应用ID');
        }
        if(v === '3') {
          $('#url').parents('li').hide();
          $('#url_symbol').parents('li').show().height('34px');
          setTimeout(() => {
            $('#url_symbol').val($('#url').val());
          }, 10);
        }
      }
    }, {
      title: 'url地址',
      field: "url",
      readonly: view
    }, {
      title: '币种',
      field: "url_symbol",
      type: 'select',
      pageCode: '802265',
      params: {
        type: "",
        status: ""
      },
      keyName: 'symbol',
      valueName: '{{symbol.DATA}}',
      readonly: view,
      hidden: true
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
          data.status = 1;
          data.companyCode = sessionStorage.getItem('systemCode');
          data.type = 2;
          data.belong = 1;
          data.parentCode = 0;
          data.contentType = 1;
          data.isCompanyEdit = 0;
          if(data.action === '0') {
            data.url = null;
          }
          if(data.action === '3') {
            data.url = data.url_symbol;
            delete data.url_symbol;
          }
          return data;
        }
    });

});