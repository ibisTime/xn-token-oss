$(function() {

  var columns = [{
    field: '',
    title: '',
    checkbox: true
  }, {
    title: '分类',
    field: 'category',
    key: 'dapp_category',
    search: true
  }, {
    title: 'banner名称',
    field: 'name',
    search: true
  }, {
    title: '所属厂商',
    field: 'company'
  }, {
    title: '顺序',
    field: 'orderNo'
  }, {
    title: '状态',
    field: 'status',
    key: "dapp_status"
  }, {
    title: '描述',
    field: 'desc',
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
  })

});