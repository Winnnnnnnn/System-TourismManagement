//路线数据集合
var routeList = null;
//景点集合
var soptList = null;

//页面启动入口
$(function () {
   initNav();
   $("[data-toggle='tooltip']").tooltip({html : true });
});

/**
 * 初始化导航栏
 */
function initNav() {
    $('#back_top_name').html(getUrlParam('name'));
    var menu = getUrlParam('menu');
    if (null == menu) {
        $('#back_nav_sopt').css('background','#FF5A5F');
        initSopt();
    } else {
        switch (menu) {
            case '0':
                $('#back_nav_sopt').css('background','#FF5A5F');
                initSopt();
                break;
            case '1':
                $('#back_nav_route').css('background','#FF5A5F');
                initRoute();
                break;
            case '2':
                $('#back_nav_order').css('background','#FF5A5F');
                initOrder();
                break;
            case '3':
                $('#back_nav_message').css('background','#FF5A5F');
                initMessage();
                break;
            case '4':
                $('#back_nav_user').css('background','#FF5A5F');
                initUser();
                break;
            case '5':
                $('#back_nav_admin').css('background','#FF5A5F');
                initAdmin();
                break;
        }
    }
    $('#back_nav_sopt').click(function () {
        window.location = '/back?id=' + getUrlParam('id') + '&name=' + getUrlParam('name') + "&power=" + getUrlParam('power') + '&menu=0';
    });
    $('#back_nav_route').click(function () {
        window.location = '/back?id=' + getUrlParam('id') + '&name=' + getUrlParam('name') + "&power=" + getUrlParam('power') + '&menu=1';
    });
    $('#back_nav_order').click(function () {
        window.location = '/back?id=' + getUrlParam('id') + '&name=' + getUrlParam('name') + "&power=" + getUrlParam('power') + '&menu=2';
    });
    $('#back_nav_message').click(function () {
        window.location = '/back?id=' + getUrlParam('id') + '&name=' + getUrlParam('name') + "&power=" + getUrlParam('power') + '&menu=3';
    });
    $('#back_nav_user').click(function () {
        window.location = '/back?id=' + getUrlParam('id') + '&name=' + getUrlParam('name') + "&power=" + getUrlParam('power') + '&menu=4';
    });
    $('#back_nav_admin').click(function () {
        window.location = '/back?id=' + getUrlParam('id') + '&name=' + getUrlParam('name') + "&power=" + getUrlParam('power') + '&menu=5';
    });
}

/**
 * 初始化景点管理
 */
function initSopt() {
    if (getUrlParam('power') == '0') {
        $('#back_main_sopt').fadeIn(500);
        initSoptTable(1);
    } else {
        $('#back_main_sopt_no').fadeIn(500);
        initSoptNoTable(1);
    }
}

/**
 * 初始化景点信息表
 * @param pageNumber
 */
function initSoptTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/back',
        id:'#back_main_sopt_table',
        toolbar:'#back_main_sopt_toolbar',
        pageNumber:pageNumber,
        data: {action:'ACTION_ADMIN_GET_SOPT'},
        search:true,
        columns:[{
            field: 'name',
            title: '景点名称',
            align: 'center',
            width: '300px'
        },{
            field: 'detail',
            title: '景点介绍',
            align: 'center',
            width: '500px',
            formatter: function (value, row, index) {
                return "<div style='text-align: left;'>"+value+"</div>"
            }
        }, {
            field: 'img',
            title: '图片',
            align: 'center',
            width: '200px',
            formatter: function (value, row, index) {
                return "<img style='width: 100%;max-width: 200px;height: 100px;' src='/files/" + value + "'/>"
            }
        },{
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var sopt = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#back_sopt_dialog\" onclick='editSopt(\"" + sopt + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#back_sopt_dialog\" onclick='delSopt(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 初始化景点信息表
 * @param pageNumber
 */
function initSoptNoTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/back',
        id:'#back_main_sopt_no_table',
        toolbar:'',
        pageNumber:pageNumber,
        data: {action:'ACTION_ADMIN_GET_SOPT'},
        search:true,
        columns:[{
            field: 'name',
            title: '景点名称',
            align: 'center',
            width: '300px'
        },{
            field: 'detail',
            title: '景点介绍',
            align: 'center',
            width: '500px',
            formatter: function (value, row, index) {
                return "<div style='text-align: left;'>"+value+"</div>"
            }
        }, {
            field: 'img',
            title: '图片',
            align: 'center',
            width: '200px',
            formatter: function (value, row, index) {
                return "<img style='width: 100%;max-width: 200px;height: 100px;' src='/files/" + value + "'/>"
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 绑定图片选择
 */
$('#back_sopt_dialog_img').click(function () {
    $('#back_sopt_dialog_file').click();
});

/**
 * 绑定图片文件选择结果
 */
$('#back_sopt_dialog_file').on('change',function () {
    if (this.files[0]) {
        var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
            $("#back_sopt_dialog_img").attr("src", objUrl); //将图片路径存入src中，显示出图片
        }
    }
});

/**
 * 初始化景点管理对话框
 */
function initSoptDialog() {
    $('#back_sopt_dialog_body').hide();
    $('#back_sopt_dialog_warn').hide();
    $('#back_sopt_dialog_add').hide();
    $('#back_sopt_dialog_edit').hide();
    $('#back_sopt_dialog_del').hide();
}

/**
 * 添加景点
 */
function addSopt() {
    initSoptDialog();
    $('#back_sopt_dialog_body').show();
    $('#back_sopt_dialog_add').show();
    $('#back_sopt_dialog_label').html('添加景点');
    //清除数据
    $('#back_sopt_dialog').modal('hide');
    $('#back_sopt_dialog_name').val('');
    $('#back_sopt_dialog_detail').val('');
    $('#back_sopt_dialog_file').val('');
    $("#back_sopt_dialog_img").attr("src", "/image/景点选择.jpg"); //将图片路径存入src中，显示出图片
}

/**
 * 绑定添加景点按钮
 */
$('#back_sopt_dialog_add').click(function () {
    //获取数据
    var name = $('#back_sopt_dialog_name').val();
    var detail = $('#back_sopt_dialog_detail').val();
    var img = $('#back_sopt_dialog_file').val();
    if ('' == name) {
        alert('请输入景点名称!');
        return;
    }
    if ('' == detail) {
        alert('请输入景点介绍!');
        return;
    }
    if ('' == img) {
        alert('请选择景点图片!');
        return;
    }
    //图片上传
    $.ajax({
        url: '/file',
        type: 'post',
        cache: false,
        data: new FormData($('#back_sopt_dialog_form')[0]),
        processData: false,
        contentType: false,
        dataType: "json",
        complete: function (res) {
            var filename = res.responseText;
            //数据封装
            var data = {
                action:'ACTION_ADMIN_ADD_SOPT',
                name:name,
                detail:getFormatCode(detail),
                img:filename
            };
            $.ajax({
                type: 'post',
                url: '/back',
                dataType: "json",
                data: data,
                success: function (res) {
                    if (res) {
                        alert('添加成功!');
                        //清除数据
                        $('#back_sopt_dialog').modal('hide');
                        $('#back_sopt_dialog_name').val('');
                        $('#back_sopt_dialog_detail').val('');
                        $('#back_sopt_dialog_file').val('');
                        $("#back_sopt_dialog_img").attr("src", "/image/景点选择.jpg"); //将图片路径存入src中，显示出图片
                        //更新列表
                        initSoptTable(1);
                    } else {
                        alert('添加失败!');
                    }
                },
                error: function () {
                    alert('服务器异常，添加失败!');
                }
            });
        }
    });
});

/**
 * 编辑景点
 * @param data
 */
function editSopt(data) {
    var sopt = JSON.parse(unescape(data));
    initSoptDialog();
    $('#back_sopt_dialog_body').show();
    $('#back_sopt_dialog_edit').show();
    $('#back_sopt_dialog_label').html('编辑景点');
    $('#back_sopt_dialog_name').val(sopt.name);
    $('#back_sopt_dialog_detail').val(setFormatCode(sopt.detail));
    $("#back_sopt_dialog_img").attr("src", "/files/" + sopt.img);
    $('#back_sopt_dialog_id').val(sopt.id);
}

/**
 * 绑定编辑景点按钮
 */
$('#back_sopt_dialog_edit').click(function () {
    //获取数据
    var name = $('#back_sopt_dialog_name').val();
    var detail = $('#back_sopt_dialog_detail').val();
    var img = $('#back_sopt_dialog_file').val();
    var id = $('#back_sopt_dialog_id').val();
    if ('' == name) {
        alert('请输入景点名称!');
        return;
    }
    if ('' == detail) {
        alert('请输入景点介绍!');
        return;
    }
    if ('' == img) {
        //不需要上传图片
        var data = {
            action:'ACTION_ADMIN_EDIT_SOPT',
            name:name,
            detail:getFormatCode(detail),
            id:id
        };
        $.ajax({
            type: 'post',
            url: '/back',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('修改成功!');
                    //清除数据
                    $('#back_sopt_dialog').modal('hide');
                    //更新列表
                    initSoptTable($('#back_main_sopt_table').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('修改失败!');
                }
            },
            error: function () {
                alert('服务器异常，修改失败!');
            }
        });
    } else {
        //需要上传图片
        $.ajax({
            url: '/file',
            type: 'post',
            cache: false,
            data: new FormData($('#back_sopt_dialog_form')[0]),
            processData: false,
            contentType: false,
            dataType: "json",
            complete: function (res) {
                var filename = res.responseText;
                //数据封装
                var data = {
                    action:'ACTION_ADMIN_EDIT_SOPT',
                    name:name,
                    detail:getFormatCode(detail),
                    img:filename,
                    id:id
                };
                $.ajax({
                    type: 'post',
                    url: '/back',
                    dataType: "json",
                    data: data,
                    success: function (res) {
                        if (res) {
                            alert('修改成功!');
                            //清除数据
                            $('#back_sopt_dialog').modal('hide');
                            //更新列表
                            initSoptTable($('#back_main_sopt_table').bootstrapTable('getOptions').pageNumber);
                        } else {
                            alert('修改失败!');
                        }
                    },
                    error: function () {
                        alert('服务器异常，修改失败!');
                    }
                });
            }
        });
    }
});

/**
 * 删除景点
 * @param id
 */
function delSopt(id) {
    initSoptDialog();
    $('#back_sopt_dialog_warn').show();
    $('#back_sopt_dialog_del').show();
    $('#back_sopt_dialog_id').val(id);
    $('#back_sopt_dialog_label').html('删除景点');
}

/**
 * 绑定删除景点按钮
 */
$('#back_sopt_dialog_del').click(function () {
    var id = $('#back_sopt_dialog_id').val();
    var data = {
        action:'ACTION_ADMIN_DEL_SOPT',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/back',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                //清除数据
                $('#back_sopt_dialog').modal('hide');
                //更新列表
                initSoptTable($('#back_main_sopt_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('服务器异常，删除失败!');
        }
    });
});

/**
 * 初始化行程管理
 */
function initRoute() {
    $('#back_main_route').fadeIn(500);
    if (getUrlParam('power') == '0') {
        //超級管理員
        initRouteTable(1,0);
    } else {
        //普通管理員
        initRouteTable(1,1);
    }
}

/**
 * 初始化行程管理表
 * @param pageNumber
 */
function initRouteTable(pageNumber,power) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/back',
        id:'#back_main_route_table',
        toolbar:'#back_main_route_toolbar',
        pageNumber:pageNumber,
        data: {action:'ACTION_ADMIN_GET_ROUTE',power:power},
        search:true,
        columns:[{
            field: 'id',
            title: '行程列表',
            align: 'center',
            width: '300px',
            formatter: function (value, row, index) {
                var soptname = row.soptname.split(',');
                var times = row.times.split(',');
                var route = '';
                $.each(soptname,function (i,name) {
                    route += times[i].replace("T","&nbsp;") + '&nbsp;' + name + '<br/>';
                });
                return route;
            }
        },{
            field: 'start',
            title: '开始时间',
            align: 'center'
        },{
            field: 'end',
            title: '结束时间',
            align: 'center'
        },{
            field: 'sponsor',
            title: '旅行社',
            align: 'center'
        },{
            field: 'phone',
            title: '电话',
            align: 'center'
        },{
            field: 'price',
            title: '价格',
            align: 'center'
        },{
            field: 'note',
            title: '说明',
            align: 'center',
            width: '300px'
        },{
            field: 'id',
            title: '操作',
            align: 'center',
            width: '100px',
            formatter: function (value, row, index) {
                var route = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info btn-sm' data-toggle=\"modal\" data-target=\"#back_route_dialog\" onclick='editRoute(\"" + route + "\")'><span class='glyphicon glyphicon-edit'></span></button><button class='btn btn-danger btn-sm' data-toggle=\"modal\" data-target=\"#back_route_dialog\" onclick='delRoute(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span></button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 编辑行程
 * @param data
 */
function editRoute(data) {
    var route = JSON.parse(unescape(data));
    initRouteDialog();
    $('#back_route_dialog_body').show();
    $('#back_route_dialog_edit').show();
    $('#back_route_dialog_label').html('修改行程');
    //初始化路线数据集合
    $('#back_route_dialog_list').empty();
    routeList = null;
    routeList = new Array();
    //景点填充
    var data_soptid = route.soptid.split(',');
    var data_soptname = route.soptname.split(',');
    var data_soptdetail = route.soptdetail.split('----');
    var data_soptimg = route.soptimg.split(',');
    var times = route.times.split(',');
    $.each(data_soptid,function (i,id) {
        var sopt = {
            id: id,
            name: data_soptname[i],
            detail: data_soptdetail[i],
            img: data_soptimg[i],
            time: times[i]
        };
        routeList.push(sopt);
    });
    $.each(routeList,function (i,obj) {
        //数据填充
        var sopt_tmp = "<h4 data-placement=\"left\" data-toggle=\"tooltip\" title=\"<img src='/files/" + obj.img + "' style='width:100%;height:100px;'>\" class=\"BackRouteItem\">"+
            "<label class=\"label label-info\">行程" + NumberToChinese(i+1) + "</label>&nbsp;" + obj.time.replace("T","&nbsp;") + "&nbsp;" + obj.name + "&nbsp;"+
            "<span class=\"close glyphicon glyphicon-remove\" onclick='delSoptFromRoute(\"" + i + "\")'></span>"+
            "</h4>";
        $('#back_route_dialog_list').append(sopt_tmp);
    });
    $("[data-toggle='tooltip']").tooltip({html : true });
    //数据填充
    $('#back_route_dialog_start').val(setFormatCode(route.start));
    $('#back_route_dialog_end').val(setFormatCode(route.end));
    $('#back_route_dialog_sponsor').val(route.sponsor);
    $('#back_route_dialog_phone').val(route.phone);
    $('#back_route_dialog_price').val(route.price);
    $('#back_route_dialog_note').val(setFormatCode(route.note));
    $('#back_route_dialog_id').val(route.id);
}

/**
 * 绑定编辑按钮
 */
$('#back_route_dialog_edit').click(function () {
    //获取数据
    var id = $('#back_route_dialog_id').val();
    var start = $('#back_route_dialog_start').val();
    var end = $('#back_route_dialog_end').val();
    var sponsor = $('#back_route_dialog_sponsor').val();
    var phone = $('#back_route_dialog_phone').val();
    var price = $('#back_route_dialog_price').val();
    var note = $('#back_route_dialog_note').val();
    var sites = '';
    var times = '';
    //数据校验
    if ('' == start || '' == end || '' == sponsor || '' == phone || '' == price || '' == note) {
        alert('数据无效!');
    } else {
        //数据封装
        $.each(routeList,function (i,obj) {
            sites += obj.id + ',';
            times += getFormatCode(obj.time) + ',';
        });
        sites = sites.substr(0, sites.length - 1);
        times = times.substr(0, times.length - 1);
        var data = {
            action: 'ACTION_ADMIN_EDIT_ROUTE',
            sites: sites,
            times: times,
            start: getFormatCode(start),
            end: getFormatCode(end),
            sponsor: sponsor,
            phone: phone,
            price: price,
            note: getFormatCode(note),
            id: id
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/back',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('修改成功!');
                    $('#back_route_dialog').modal('hide');
                    if (getUrlParam('power') == '0') {
                        //超級管理員
                        initRouteTable($('#back_main_route_table').bootstrapTable('getOptions').pageNumber,0);
                    } else {
                        //普通管理員
                        initRouteTable($('#back_main_route_table').bootstrapTable('getOptions').pageNumber,1);
                    }
                } else {
                    alert('修改失败!');
                }
            },
            error: function () {
                alert('服务器异常，修改失败!');
            }
        });
    }
});

/**
 * 删除行程
 * @param id
 */
function delRoute(id) {
    initRouteDialog();
    $('#back_route_dialog_warn').show();
    $('#back_route_dialog_del').show();
    $('#back_route_dialog_label').html('删除行程');
    $('#back_route_dialog_id').val(id);
}

/**
 * 绑定删除按钮
 */
$('#back_route_dialog_del').click(function () {
    var id = $('#back_route_dialog_id').val();
    var data = {
        action:'ACTION_ADMIN_DEL_ROUTE',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/back',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                //清除数据
                $('#back_route_dialog').modal('hide');
                //更新列表
                if (getUrlParam('power') == '0') {
                    //超級管理員
                    initRouteTable($('#back_main_route_table').bootstrapTable('getOptions').pageNumber,0);
                } else {
                    //普通管理員
                    initRouteTable($('#back_main_route_table').bootstrapTable('getOptions').pageNumber,1);
                }
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('服务器异常，删除失败!');
        }
    });
});

/**
 * 初始化行程对话框
 */
function initRouteDialog() {
    $('#back_route_dialog_body').hide();
    $('#back_route_dialog_warn').hide();
    $('#back_route_dialog_add').hide();
    $('#back_route_dialog_edit').hide();
    $('#back_route_dialog_del').hide();
}

/**
 * 添加行程
 */
function addRoute() {
    initRouteDialog();
    $('#back_route_dialog_body').show();
    $('#back_route_dialog_add').show();
    $('#back_route_dialog_label').html('添加行程');
    //初始化路线数据集合
    $('#back_route_dialog_list').empty();
    //清除数据
    $('#back_route_dialog_start').val('');
    $('#back_route_dialog_end').val('');
    $('#back_route_dialog_sponsor').val('');
    $('#back_route_dialog_phone').val('');
    $('#back_route_dialog_price').val('');
    $('#back_route_dialog_note').val('');
    routeList = null;
    routeList = new Array();
}

/**
 * 添加景点到行程中
 */
function addSoptToRoute() {
    $('#back_route_sopt_dialog').on("hidden.bs.modal",function(){
        $(document.body).addClass("modal-open");
    });
    $('#back_route_sopt_dialog_name').empty()
    $('#back_route_sopt_dialog_name').append("<option>请选择景点</option>");
    $('#back_route_sopt_dialog_detail_lay').hide();
    $('#back_route_sopt_dialog_img_lay').hide();
    //获取全部的景点
    var data = {
        action:'ACTION_ADMIN_GET_SOPT'
    };
    $.ajax({
        type: 'post',
        url: '/back',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res.length>0) {
                soptList = res;
                //填充景点选择
                $.each(res,function (i,obj) {
                    var sopt = "<option value='" + i + "'>" + obj.name + "</option>";
                    $('#back_route_sopt_dialog_name').append(sopt);
                });
                $('#back_route_sopt_dialog_name').change(function () {
                   if ($(this).val()!='请选择景点') {
                       //选择有效值
                       $("#back_route_sopt_dialog_img").attr("src", "/files/" + res[$(this).val()].img);
                       $('#back_route_sopt_dialog_detail').val(setFormatCode(res[$(this).val()].detail));
                       $('#back_route_sopt_dialog_detail_lay').show();
                       $('#back_route_sopt_dialog_img_lay').show();
                   } else {
                       //选择无效值
                       $('#back_route_sopt_dialog_detail_lay').hide();
                       $('#back_route_sopt_dialog_img_lay').hide();
                   }
                });
            } else {
                soptList = null;
                alert('请先创建景点！');
                $('#back_route_sopt_dialog').modal('hide');
            }
        },
        error: function () {
            soptList = null;
            alert('获取景点数据失败，请重试！');
            $('#back_route_sopt_dialog').modal('hide');
        }
    });
}

/**
 * 绑定添加按钮
 */
$('#back_route_sopt_dialog_ok').click(function () {
    //获取当前选择的索引
    var index = $('#back_route_sopt_dialog_name').val();
    if (index=='请选择景点') {
        alert('请选择景点!');
        return;
    } else {
        var sopt = soptList[index];
        sopt.time = $('#back_route_sopt_dialog_time').val();
        routeList.push(soptList[index]);
        if (routeList.length>1) {
            sortTimes(routeList);
        }
        $('#back_route_dialog_list').empty();
        //重新排序行程
        $.each(routeList,function (i,obj) {
            //数据填充
            var sopt_tmp = "<h4 data-placement=\"left\" data-toggle=\"tooltip\" title=\"<img src='/files/" + obj.img + "' style='width:100%;height:100px;'>\" class=\"BackRouteItem\">"+
                "<label class=\"label label-info\">行程" + NumberToChinese(i+1) + "</label>&nbsp;" + obj.time.replace("T","&nbsp;") + "&nbsp;" + obj.name + "&nbsp;"+
                "<span class=\"close glyphicon glyphicon-remove\" onclick='delSoptFromRoute(\"" + i + "\")'></span>"+
                "</h4>";
            $('#back_route_dialog_list').append(sopt_tmp);
        });
        //开始时间&结束时间
        $('#back_route_dialog_start').val(setFormatCode(routeList[0].time.replace("T","&nbsp;")));
        $('#back_route_dialog_end').val(setFormatCode(routeList[routeList.length-1].time.replace("T","&nbsp;")));
        $("[data-toggle='tooltip']").tooltip({html : true });
        $('#back_route_sopt_dialog').modal('hide');
    }
});

/**
 * 从行程中移除路线
 * @param index
 */
function delSoptFromRoute(index) {
    routeList.splice(index,1);
    if (routeList.length>1) {
        sortTimes(routeList);
    }
    $('#back_route_dialog_list').empty();
    //重新排序行程
    if (routeList.length>0) {
        $.each(routeList,function (i,obj) {
            //数据填充
            var sopt_tmp = "<h4 data-placement=\"left\" data-toggle=\"tooltip\" title=\"<img src='/files/" + obj.img + "' style='width:100%;height:100px;'>\" class=\"BackRouteItem\">"+
                "<label class=\"label label-info\">行程" + NumberToChinese(i+1) + "</label>&nbsp;" + obj.time.replace("T","&nbsp;") + "&nbsp;" + obj.name + "&nbsp;"+
                "<span class=\"close glyphicon glyphicon-remove\" onclick='delSoptFromRoute(\"" + i + "\")'></span>"+
                "</h4>";
            $('#back_route_dialog_list').append(sopt_tmp);
        });
        //开始时间&结束时间
        $('#back_route_dialog_start').val(setFormatCode(routeList[0].time.replace("T","&nbsp;")));
        $('#back_route_dialog_end').val(setFormatCode(routeList[routeList.length-1].time.replace("T","&nbsp;")));
    } else {
        //开始时间&结束时间
        $('#back_route_dialog_start').val('');
        $('#back_route_dialog_end').val('');
    }
    $("[data-toggle='tooltip']").tooltip({html : true });
}

/**
 * 绑定添加行程按钮
 */
$('#back_route_dialog_add').click(function () {
    //获取数据
    var start = $('#back_route_dialog_start').val();
    var end = $('#back_route_dialog_end').val();
    var sponsor = $('#back_route_dialog_sponsor').val();
    var phone = $('#back_route_dialog_phone').val();
    var price = $('#back_route_dialog_price').val();
    var note = $('#back_route_dialog_note').val();
    var admin = getUrlParam("id");
    var sites = '';
    var times = '';
    //数据校验
    if ('' == start || '' == end || '' == sponsor || '' == phone || '' == price || '' == note) {
        alert('数据无效!');
    } else {
        //数据封装
        $.each(routeList,function (i,obj) {
            sites += obj.id + ',';
            times += getFormatCode(obj.time) + ',';
        });
        sites = sites.substr(0, sites.length - 1);
        times = times.substr(0, times.length - 1);
        var data = {
            action: 'ACTION_ADMIN_ADD_ROUTE',
            sites: sites,
            times: times,
            start: getFormatCode(start),
            end: getFormatCode(end),
            sponsor: sponsor,
            phone: phone,
            price: price,
            note: getFormatCode(note),
            admin: admin
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/back',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('添加成功!');
                    $('#back_route_dialog').modal('hide');
                    if (getUrlParam('power') == '0') {
                        //超級管理員
                        initRouteTable(1,0);
                    } else {
                        //普通管理員
                        initRouteTable(1,1);
                    }
                } else {
                    alert('删除失败!');
                }
            },
            error: function () {
                alert('服务器异常，添加失败!');
            }
        });
    }
});

/**
 * 初始化订单管理
 */
function initOrder() {
    $('#back_main_order').fadeIn(500);
    initOrderTable(1);
}

/**
 * 初始化订单列表
 * @param pageNumber
 */
function initOrderTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/back',
        id:'#back_main_order_table',
        toolbar:'',
        pageNumber:pageNumber,
        data: {action:'ACTION_ADMIN_GET_ORDER'},
        search:true,
        columns:[{
            field: 'userphone',
            title: '客户账号',
            align: 'center'
        },{
            field: 'username',
            title: '客户姓名',
            align: 'center'
        },{
            field: 'start',
            title: '开始时间',
            align: 'center'
        },{
            field: 'end',
            title: '结束时间',
            align: 'center'
        },{
            field: 'sponsor',
            title: '旅行社',
            align: 'center'
        },{
            field: 'phone',
            title: '联系电话',
            align: 'center'
        },{
            field: 'price',
            title: '售价',
            align: 'center'
        },{
            field: 'id',
            title: '行程',
            align: 'center',
            formatter: function (value, row, index) {
                return "<a onclick='openMyRoute(\"" + row.routeid + "\")' data-toggle=\"modal\" data-target=\"#search_main_route_dialog\" href='#'>查看</a>";
            }
        },{
            field: 'state',
            title: '行程状态',
            align: 'center',
            formatter: function (value, row, index) {
                var result = '待启动';
                //判断开始时间与当前时间
                if (daysBetween(row.start.replace("&nbsp;"," ")) <= 0) {
                    result = '计划已启动';
                }
                if (daysBetween(row.end.replace("&nbsp;"," ")) <= 0) {
                    result = '计划已完成';
                }
                //判断是否已经被取消
                if (value == 1) {
                    result = '计划已取消';
                }
                return result;
            }
        },{
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var result = "<div class='btn-group'><button class='btn btn-info btn-sm' data-toggle=\"modal\" data-target=\"#search_main_del_dialog\" onclick='delOrder(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;取消行程</button></div>";
                return result;
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 查看详情安排
 * @param id
 */
function openMyRoute(id) {
    $('#search_main_route_dialog_list').empty();
    //获取当前行程的资料
    var data = {
        action:'ACTION_SERACH_GET_ROUTE',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/search',
        dataType: "json",
        data: data,
        success: function (res) {
            $('#search_main_route_dialog_id').val(res.id);
            $('#search_main_route_dialog_note').html(res.note);
            $('#search_main_route_dialog_start').html(res.start);
            $('#search_main_route_dialog_end').html(res.end);
            $('#search_main_route_dialog_sponsor').html(res.sponsor);
            $('#search_main_route_dialog_phone').html(res.phone);
            $('#search_main_route_dialog_price').html(res.price);
            //数据填充
            var soptname = res.soptname.split(',');
            var times = res.times.split(',');
            var soptimg = res.soptimg.split(',');
            $.each(soptname,function (i,obj) {
                //数据填充
                var sopt_tmp = "<h4 data-placement=\"left\" data-toggle=\"tooltip\" title=\"<img src='/files/" + soptimg[i] + "' style='width:100%;height:100px;'>\" class=\"BackRouteItem\">"+
                    "<label class=\"label label-info\">行程" + NumberToChinese(i+1) + "</label>&nbsp;" + times[i].replace("T","&nbsp;") + "&nbsp;" + obj + "&nbsp;"+
                    "</h4>";
                $('#search_main_route_dialog_list').append(sopt_tmp);
            });
            $("[data-toggle='tooltip']").tooltip({html : true });
        },
        error: function () {
            alert("服务器异常，获取行程计划失败!");
            $('#search_main_route_dialog').modal('hide');
        }
    });
}

/**
 * 取消行程
 * @param id
 */
function delOrder(id) {
    $('#search_main_del_dialog_id').val(id);
}

/**
 * 绑定取消行程按钮
 */
$('#search_main_del_dialog_ok').click(function () {
    var id = $('#search_main_del_dialog_id').val();
    //封装数据
    var data = {
        action:'ACTION_SEARCH_DEL_ORDER',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/search',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('取消成功!');
                $('#search_main_del_dialog').modal('hide');
                initOrderTable($('#back_main_order_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('取消失败!');
            }
        },
        error: function () {
            alert('服务器异常，取消失败!');
        }
    });
});

/**
 * 初始化申诉管理
 */
function initMessage() {
    $('#back_main_message').fadeIn(500);
    initMessageTable(1);
}

/**
 * 初始化申诉信息表
 * @param pageNumber
 */
function initMessageTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/back',
        id:'#back_main_message_table',
        toolbar:'',
        pageNumber:pageNumber,
        data: {action:'ACTION_ADMIN_GET_MESSAGE'},
        search:true,
        columns:[{
            field: 'phone',
            title: '客户账号',
            align: 'center'
        },{
            field: 'name',
            title: '客户姓名',
            align: 'center'
        },{
            field: 'detail',
            title: '申诉内容',
            align: 'center'
        },{
            field: 'time',
            title: '申诉时间',
            align: 'center'
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 初始化用户管理
 */
function initUser() {
    $('#back_main_user').fadeIn(500);
    initUserTable();
}

/**
 * 初始化用户信息表
 * @param pageNumber
 */
function initUserTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/back',
        data:{action:'ACTION_ADMIN_GET_USER'},
        id:'#back_main_user_table',
        toolbar:'',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'phone',
            title: '手机号',
            align: 'center'
        }, {
            field: 'name',
            title: '姓名',
            align: 'center'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var user = escape(JSON.stringify(row));
                return "<button onclick='editUser(\"" + user + "\")' data-toggle=\"modal\" data-target=\"#admin_user_dialog\" class='btn btn-info'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 修改用户信息
 * @param data
 */
function editUser(data) {
    var user = JSON.parse(unescape(data));
    $('#admin_user_dialog_id').val(user.id);
    $('#admin_user_dialog_phone').val(user.phone);
    $('#admin_user_dialog_name').val(user.name);
    $('#admin_user_dialog_pwd').val(new Base64().decode(user.pwd));
}

/**
 * 绑定修改用户信息按钮
 */
$('#admin_user_dialog_ok').click(function () {
    var id = $('#admin_user_dialog_id').val();
    var name = $('#admin_user_dialog_name').val();
    var pwd = $('#admin_user_dialog_pwd').val();
    if ('' == name || '' == pwd) {
        alert('数据无效!');
    } else {
        var data = {
            action:'ACTION_ADMIN_EDIT_USER',
            id:id,
            name:name,
            pwd:pwd
        };
        $.ajax({
            type: 'post',
            url: '/back',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('修改成功!');
                    $('#admin_user_dialog').modal('hide');
                    initUserTable($('#back_main_user_table').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('修改失败!');
                }
            },
            error:function() {
                alert('修改失败!');
            }
        });
    }
});

/**
 * 管理员管理
 */
function initAdmin() {
    //权限判断
    var power = getUrlParam("power");
    if (power == '0') {
        $('#back_main_has_power').fadeIn(500);
        var table = new AdminTableInit();
        table.Init(1);
    } else {
        $('#back_main_no_power').fadeIn(500);
    }
}

/**
 * 初始化管理员信息表
 * @returns {Object}
 * @constructor
 */
var AdminTableInit = function () {
    var adminTableInit = new Object();
    adminTableInit.Init = function (pageNumber) {
        var data = {action: "ACTION_ADMIN_GET_ADMIN"};
        $.ajax({
            type: 'post',
            url: '/back',
            dataType: "json",
            data: data,
            success: function (data) {
                $("#back_main_has_power_table").bootstrapTable('destroy');
                $('#back_main_has_power_table').bootstrapTable({
                    pagination: true,
                    sortable: false,
                    pageNumber: pageNumber,
                    striped: true,
                    pageSize: 10,
                    pageList: [10, 25, 50, 100],
                    uniqueId: "id",
                    data: data,
                    toolbar:'#back_main_has_power_toolbar',
                    columns: [{
                        field: 'acount',
                        title: '账号',
                        align: 'center'
                    },{
                        field: 'name',
                        title: '姓名',
                        align: 'center'
                    }, {
                        field: 'id',
                        title: '操作',
                        align: 'center',
                        formatter: function (value, row, index) {
                            var admin = escape(JSON.stringify(row));
                            return "<div class=\"btn-group\"><button class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#admin_admin_dialog\" onclick='editAdmin(\"" + admin + "\")'><span class=\"glyphicon glyphicon-edit\"></span>&nbsp;编辑</button><button class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#admin_admin_dialog\" onclick='delAdmin(\"" + value + "\")'><span class=\"glyphicon glyphicon-remove\"></span>&nbsp;删除</button></div>";
                        }
                    }]
                });
            },
            error: function () {
                console.log('失败');
            }
        });
    };
    return adminTableInit;
};

/**
 * 隐藏
 */
function hideAdminBtn() {
    $('#admin_admin_dialog_btn_add').hide();
    $('#admin_admin_dialog_btn_edit').hide();
    $('#admin_admin_dialog_btn_del').hide();
    $('#admin_admin_dialog_body').hide();
    $('#admin_admin_dialog_warn').hide();
}

/**
 * 添加管理员
 */
function addAdmin() {
    hideAdminBtn();
    $('#admin_admin_dialog_label').html('添加管理员');
    $('#admin_admin_dialog_btn_add').show();
    $('#admin_admin_dialog_body').show();
    $('#admin_admin_dialog_name').val('');
    $('#admin_admin_dialog_pwd').val('');
    $('#admin_admin_dialog_account').val('');
}

/**
 * 绑定添加按钮
 */
$('#admin_admin_dialog_btn_add').click(function () {
    //获取数据
    var name = $('#admin_admin_dialog_name').val();
    var pwd = $('#admin_admin_dialog_pwd').val();
    var acount = $('#admin_admin_dialog_account').val();
    //数据校验
    if ('' == name || '' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_ADD_ADMIN',
            name:name,
            pwd:pwd,
            acount:acount
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/back',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    $('#admin_admin_dialog').modal('hide');
                    //刷新表格
                    var table = new AdminTableInit();
                    table.Init(1);
                } else {
                    alert('添加失败!');
                }
            },
            error: function () {
                alert('发生错误!');
            }
        });
    }
});

/**
 * 编辑管理员
 * @param data
 */
function editAdmin(data) {
    hideAdminBtn();
    var admin = JSON.parse(unescape(data));
    $('#admin_admin_dialog_label').html('编辑管理员');
    $('#admin_admin_dialog_btn_edit').show();
    $('#admin_admin_dialog_body').show();
    $('#admin_admin_dialog_name').val(admin.name);
    $('#admin_admin_dialog_pwd').val(new Base64().decode(admin.pwd));
    $('#admin_admin_dialog_id').val(admin.id);
    $('#admin_admin_dialog_account').val(admin.acount);
}

/**
 * 删除管理员
 * @param id
 */
function delAdmin(id) {
    hideAdminBtn();
    $('#admin_admin_dialog_id').val(id);
    $('#admin_admin_dialog_label').html('删除管理员');
    $('#admin_admin_dialog_btn_del').show();
    $('#admin_admin_dialog_warn').show();
}

/**
 * 删除管理员
 */
$('#admin_admin_dialog_btn_del').click(function () {
    var id = $('#admin_admin_dialog_id').val();
    //封装数据
    var data = {
        action:'ACTION_ADMIN_DEL_ADMIN',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/back',
        dataType: "json",
        data: data,
        success: function (data) {
            if (data) {
                alert('删除成功!');
                $('#admin_admin_dialog').modal('hide');
                //刷新表格
                var table = new AdminTableInit();
                table.Init($('#back_main_has_power_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('发生错误!');
        }
    });
});

/**
 * 绑定编辑按钮
 */
$('#admin_admin_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#admin_admin_dialog_id').val();
    var name = $('#admin_admin_dialog_name').val();
    var pwd = $('#admin_admin_dialog_pwd').val();
    //数据校验
    if ('' == name || '' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_EDIT_ADMIN',
            id:id,
            name:name,
            pwd:pwd
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/back',
            dataType: "json",
            data: data,
            success: function (data) {
                if (data) {
                    alert('修改成功!');
                    $('#admin_admin_dialog').modal('hide');
                    //刷新表格
                    var table = new AdminTableInit();
                    table.Init($('#back_main_has_power_table').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('修改失败!');
                }
            },
            error: function () {
                alert('发生错误!');
            }
        });
    }
});

/**
 * 获取url中的指定参数
 * @param {any} name
 */
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null)
        return decodeURI(r[2]);
    return null;
}

//视频控件绑定
(function () {
    var bv = new Bideo();
    bv.init({
        //获取视频播放控件
        videoEl: document.querySelector('#bg_video'),
        //获取根布局
        container: document.querySelector('body'),
        // Resize
        resize: true,
        //控制手机屏幕
        isMobile: window.matchMedia('(max-width: 768px)').matches,
        //设置视频播放资源
        src: [
            {
                src: '../data/Amalfi.mp4',
                type: 'video/mp4'
            }
        ],

        //加载完成后隐藏封面
        onLoad: function () {
            document.querySelector('#bg_cover').style.display = 'none';
        }
    });
}());

/**
 * 获取图片的url
 * @param file
 * @returns {*}
 */
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) {
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) {
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) {
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

/**
 * 文本转html
 * @param strValue
 * @returns {string}
 */
function getFormatCode(strValue) {
    return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
}

/**
 * html转文本
 * @param strValue
 * @returns {string}
 */
function setFormatCode(strValue) {
    return strValue.replace(/<br\/>/g, '\r\n').replace(/<br\/>/g, '\n').replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
}

/**
 * 获取当前日期
 * @returns {string}
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

/**
 * 按照时间对数据进行排序
 * @param arr
 */
function sortTimes(arr) {
    arr.sort(function(a,b) {
        return Date.parse(a.time) - Date.parse(b.time);
    });
}

var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
var chnUnitSection = ["","万","亿","万亿","亿亿"];
var chnUnitChar = ["","十","百","千"];

/**
 * 数字转中文
 * @param section
 * @returns {string}
 * @constructor
 */
function SectionToChinese(section){
    var strIns = '', chnStr = '';
    var unitPos = 0;
    var zero = true;
    while(section > 0){
        var v = section % 10;
        if(v === 0){
            if(!zero){
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
            }
        }else{
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
    }
    return chnStr;
}

/**
 * 数字转中文
 * @param num
 * @returns {*}
 * @constructor
 */
function NumberToChinese(num){
    var unitPos = 0;
    var strIns = '', chnStr = '';
    var needZero = false;

    if(num === 0){
        return chnNumChar[0];
    }

    while(num > 0){
        var section = num % 10000;
        if(needZero){
            chnStr = chnNumChar[0] + chnStr;
        }
        strIns = SectionToChinese(section);
        strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
        chnStr = strIns + chnStr;
        needZero = (section < 1000) && (section > 0);
        num = Math.floor(num / 10000);
        unitPos++;
    }

    return chnStr;
}

/**
 * 获取当前时间
 */
function getNowTime() {
    var myDate = new Date();
    //获取当前年
    var year=myDate.getFullYear();
    //获取当前月
    var month=myDate.getMonth()+1;
    //获取当前日
    var date=myDate.getDate();
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
    var s=myDate.getSeconds();

    var now=year+'-'+getNow(month)+"-"+getNow(date)+" "+getNow(h)+':'+getNow(m)+":"+getNow(s);
    return now;
}

function getNow(s) {
    return s < 10 ? '0' + s: s;
}
/**
 * 计算时间差
 * @param date
 * @returns {number}
 */
function daysBetween(date){
    var time1 = Date.parse(new Date(date));
    var time2 = Date.parse(new Date(getNowTime()));
    var nDays = time1 - time2;
    return  nDays;
}
