$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'mobile',
        title: '手机号',
        search: true
    }, {
        field: 'nickname',
        title: '昵称',
    }, {
        field: 'countryCode',
        title: '国家',
        type: 'select',
        listCode:'801120',
        keyName: 'code',
        valueName: 'chineseName'
    }, {
        field: 'userReferee',
        title: '推荐人',
        formatter: function(v, data) {
            if (data.refereeUser) {
                if(data.refereeUser.mobile) {
                  return data.refereeUser.mobile;
                }else {
                  return data.refereeUser.email;
                }
            } else {
                return "-"
            }
        },
        type: "select",
        pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'user_status',
        formatter: Dict.getNameForList('user_status'),
        search: true
    },{
        field: 'isRealname',
        title: '是否实名',
        formatter: function (v, data) {
            return data.realName?'是':'否'
        }
    }, {
        field: 'realName',
        title: '真实姓名',
        formatter: function (v, data) {
            return data.realName?data.realName:'-'
        }
    }, {
        field: 'jfAmount',
        title: '积分余额'
    }, {
        field: 'divRate1',
        title: '量化理财分成'
    },  {
        field: 'createDatetime',
        title: '注册时间',
        formatter: dateTimeFormat,
        field1: 'createDatetimeStart',
        title1: '注册时间',
        type1: 'date',
        field2: 'createDatetimeEnd',
        type2: 'date',
        twoDate: true,
        search: true,
    },  {
        field: 'createIp',
        title: '注册IP'
    },  {
        field: 'createClient',
        title: '注册端',
        type: 'select',
        key: 'client_type',
        formatter: Dict.getNameForList('client_type'),
        search: true
    }, {
        field: 'lastLogin',
        title: '最后登录时间',
        formatter: dateTimeFormat,
        field1: 'lastLoginStart',
        title1: '最后登录时间',
        type1: 'date',
        field2: 'lastLoginEnd',
        type2: 'date',
        twoDate: true,
        search: true,
    }, {
        field: 'remark',
        title: '备注',
    }];
    buildList({
        router: 'customer',
        columns: columns,
        pageCode: '805120',
        searchParams: {
            kind: 'C',
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            window.location.href = "customer_addedit.html?v=1&userId=" + data.userId;
        }
    });


    //激活
    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 0) {
            toastr.info("已激活");
            return;
        }
        confirm("确定激活？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: '0',
                    remark: selRecords[0].remark
                }
            }).then(function() {
                sucList();
            });

        }, function() {})
    });

    //禁止登陆
    $('#rockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status == 2) {
            toastr.info("已注销");
            return;
        }

        confirm("确定注销？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: '2',
                    remark: selRecords[0].remark
                }
            }).then(function() {
                sucList();
            });

        }, function() {})
    });

    //账户查询
    $('#accountBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "customer_account.html?&c=1&userId=" + selRecords[0].userId;
    });

	//添加备注
    $('#remarkBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">添加备注</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            fields: [{
                field: 'remark1',
                title: '添加备注',
                value: selRecords[0].remark||"",
				required: true,
                maxlength: 250
            }],
            buttons: [{
                title: '添加备注',
                handler: function() {
                	if($('#remark1').val()==""){
						toastr.error("备注不能为空");
					}else{
                        var popFormData = $('#popForm').serializeObject();
                        var data={};
                        data.remark = popFormData.remark1
                        data.userId = selRecords[0].userId;
                        reqApi({
                            code: '805082',
                            json: data
                        }).done(function(data) {
                        	sucList();
                            dw.close().remove();
                        });
                    }

                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });

        dw.__center();

    });

    //设置分成比例
    $('#setDivRateBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">设置量化理财分成</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
                field: 'divRate',
                title: '分成',
                value: selRecords[0].divRate1 || '0',
                required: true,
                number: true,
                min: '0'
            }],
            buttons: [{
                title: '确定',
                handler: function() {
                    if($('#popForm').valid()){
                        var data = $('#popForm').serializeObject();
                        data.userId = selRecords[0].userId
                        reqApi({
                            code: '805093',
                            json: data
                        }).done(function(data) {
                            sucList();
                            dw.close().remove();
                        });
                    }

                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });

        dw.__center();

    });

});