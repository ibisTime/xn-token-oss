$(function() {
  var dappId = getQueryString('id');

  var columns = [{
    field: '',
    title: '',
    checkbox: true
  }, {
    title: '标题',
    field: 'title',
    search: true
  }, {
    title: '作者',
    field: 'author'
  }, {
    title: '点赞数量',
    field: 'likeCount'
  }, {
    title: '浏览数量',
    field: 'scanCount'
  }, {
    title: '状态',
    field: 'status',
    // key: "dapp_status",
    // formatter: Dict.getNameForList("dapp_status"),
  }];
  buildList({
    router: 'banner',
    columns: columns,
    pageCode: '625465',
    searchParams: {
      companyCode: OSS.company,
      dappId: dappId
    }
  });

  $('.toolbar').empty();
  let html = `<div>
                <div class="per">
                    <li style="display:block;" id="addBtn"><span><img src="/static/images/t01.png"></span>新增</li>
                    <li style="display:block;" id="editBtn"><span><img src="/static/images/t01.png"></span>修改</li>
                    <li style="display:block;" id="deleteBtn"><span><img src="/static/images/t01.png"></span>删除</li>
                    <li style="display:block;" id="accordBtn"><span><img src="/static/images/t01.png"></span>显示/隐藏</li>
                    <li style="display:block;" id="detailBtn"><span><img src="/static/images/t01.png"></span>详情</li>
                </div>
              </div>`;
  let divHtml = $(html).find('.per').html();
  $('.toolbar').append(divHtml);

  // 新增
  $('#addBtn').off('click').click(function() {
    window.location.href = "../biz/strategy_addedit.html?dappId=" + dappId;
  });

  // 修改
  $('#editBtn').off('click').click(function() {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }
    window.location.href = "../biz/strategy_addedit.html?id=" + selRecords[0].id  + "&code=" + selRecords[0].id + "&dappId=" + selRecords[0].dappId;
  });

  // 删除
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
          code: '625461',
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

  // 显示/隐藏
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
          code: '625463',
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

  // 详情
  $('#detailBtn').off('click').click(function() {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }
    window.location.href = "../biz/strategy_addedit.html?v=1&id=" + selRecords[0].id  + "&code=" + selRecords[0].id + "&dappId=" + selRecords[0].dappId;
  })
});