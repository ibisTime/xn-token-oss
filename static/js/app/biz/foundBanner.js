$(function() {

  var columns = [{
    field: '',
    title: '',
    checkbox: true
  }, {
    title: '分类',
    field: 'category',
    type: 'select',
    key: 'dapp_category',
    formatter: Dict.getNameForList("dapp_category"),
    search: true
  }, {
    title: '应用名称',
    field: 'name',
    search: true
  }, {
    title: '所属厂商',
    field: 'company'
  }, {
    title: '评分',
    field: 'grade',
    type: 'start'
  }, {
    title: '顺序',
    field: 'orderNo'
  }, {
    title: '显示状态',
    field: 'status',
    type: 'select',
    data: {
      '0':'不显示',
      '1':'显示'
    },
    search: true
  }];
  buildList({
    router: 'banner',
    columns: columns,
    pageCode: '625455',
    deleteCode: '625451',
    searchParams: {
      companyCode: OSS.company
    }
  });

  $('#editBtn').off('click').click(function() {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }
    window.location.href = "../biz/banner_addedit.html?id=" + selRecords[0].id  + "&code=" + selRecords[0].id;
  });

  $('#accordBtn').off('click').click(function() {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }
    var dw = dialog({
      content: '是否显示或隐藏',
      ok: function() {
        reqApi({
          code: '625453',
          json: {
            id: selRecords[0].id
          },
          sync: true
        }).then(function(data) {
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

  $('#strategyBtn').off('click').click(function() {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }
    window.location.href = "../biz/strategy.html?id=" + selRecords[0].id;
  })
});