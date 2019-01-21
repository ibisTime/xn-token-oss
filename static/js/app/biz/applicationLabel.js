$(function() {
  let dappLabel = {};
  reqApi({
    code: '660906',
    json: {
      parentKey: 'open_dapp_tag_type'
    },
    sync: true
  }).then(function(data) {
    data.forEach(item => {
      dappLabel[item.dkey] = item.dvalue;
    })
  });
  var columns = [{
    field: '',
    title: '',
    checkbox: true
  }, {
    title: '标签ID',
    field: 'id',
    search: true
  }, {
    title: '标签类型',
    field: 'type',
    type: 'select',
    data: dappLabel,
    search: true
  }, {
    title: '标签中文名',
    field: 'name',
    search: true
  }, {
    title: '标签英文名',
    field: 'nameEn',
    search: true
  }, {
    title: '标签韩文名',
    field: 'nameKr',
    search: true
  }, {
    title: '更新时间',
    field: 'updateTime',
    search: true
  }];
  buildList({
    router: 'banner',
    columns: columns,
    pageCode: '625475',
    searchParams: {
      companyCode: OSS.company
    }
  });

  $('#addBtn').off('click').click(function() {
    window.location.href = "../biz/applicationLabel-addedit.html";
  });

  $('#editBtn').off('click').click(function() {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }
    window.location.href = "../biz/applicationLabel-addedit.html?code=1&id=" + selRecords[0].id;
  });

  $('#deleteBtn').off('click').click(function() {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }
    var dw = dialog({
      content: '是否删除',
      ok: function() {
        reqApi({
          code: '625471',
          json: {
            id: selRecords[0].id
          },
          sync: true
        }).then(function() {
          window.location.reload();
        });
        return true;
      },
      cancel: function() {
        return true;
      },
      cancelValue: '取消',
      okValue: '确定'
    });
    dw.showModal();
  });

});
