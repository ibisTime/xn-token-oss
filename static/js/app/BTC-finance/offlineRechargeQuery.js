$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
    }, {
        field: 'accountName',
        title: '户名'
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
    }, {
        field: 'amountString',
        title: '充值金额',
        formatter: moneyFormatBTC
    }, {
        field: 'channelType',
        title: '支付渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
        search: true,
    }, {
        field: "bizNote",
        title: "充值说明"
    }, {
        field: 'applyDatetime',
        title: '充值时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '充值时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "charge_status",
        formatter: Dict.getNameForList("charge_status"),
        search: true
    }];
    buildList({
        router: "offlineRecharge",
        columns: columns,
        pageCode: '802705',
        // singleSelect: false,
        searchParams: {
            currency: "BTC",
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            location.href = "offlineRecharge_check.html?code=" + data.code + "&detail=1";
        }
    });

    //审核
    $('#examineBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length == 1 && selRecords[0].status == 1) {
            window.location.href = "offlineRecharge_check.html?Code=" + selRecords[0].code;
        } else {

            var dataCode = []

            for (var i = 0; i < selRecords.length; i++) {
                dataCode.push(selRecords[i].code)

                if (selRecords[i].status != 1) {
                    toastr.info(selRecords[i].code + "状态不能审核!");
                    return;
                }

            }

            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">批量支付</li></ul>' +
                    '</form>'
            });

            dw.showModal();

            buildDetail({
                fields: [{
                    field: 'payNote',
                    title: '审核意见',
                    required: true,
                    maxlength: 250
                }],
                buttons: [{
                    title: '通过',
                    handler: function() {

                        if ($('#payNote').val() == "") {
                            toastr.error("审核意见不能为空");
                        } else {
                            var data = $('#popForm').serializeObject();
                            data.codeList = dataCode;
                            data.payResult = "1";
                            data.payUser = getUserName();
                            reqApi({
                                code: '802701',
                                json: data
                            }).done(function(data) {
                            	sucList();
                                dw.close().remove();
                            });
                        }

                    }
                }, {
                    title: '不通过',
                    handler: function() {
                        if ($('#payNote').val() == "") {
                            toastr.error("审核意见不能为空");
                        } else {
                            var data = [];
                            data.codeList = dataCode;
                            data.payResult = "1";
                            data.payUser = getUserName();
                            reqApi({
                                code: '802701',
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
        }

    });

});