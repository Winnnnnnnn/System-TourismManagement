//启动入口
$(function () {
   initNav();
});

/**
 * 初始化导航栏
 */
function initNav() {
    $('#search_nav_name').html(getUrlParam("name"));
    var menu = getUrlParam('menu');
    if (menu == null) {
        //默认为搜索页
        var key = getUrlParam("key");
        $('#search_nav_key').val(key);
        //搜索数据
        initData(key);
        $('#search_main_list').show();
    } else {
        $('#search_main_user').show();
        initOrderTable(1);
    }
    //绑定个人中心
    $('#search_nav_user').click(function () {
        window.location = "/search?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&menu=user";
    });
    $('#search_nav_home').click(function () {
        window.location = "/home?id=" + getUrlParam("id") + "&name=" + getUrlParam("name");
    });
}

/**
 * 监听搜索框
 */
$('#search_nav_key').change(function () {
    window.location = "/search?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&key=" + $(this).val();
});

/**
 * 搜索数据
 * @param key
 */
function initData(key) {
    var data = {
        action:'ACTION_SERACH',
        key:key
    };
    $.ajax({
        type: 'post',
        url: '/search',
        dataType: "json",
        data: data,
        success: function (res) {
            console.log(res);
            $('#search_main_list').empty();
            //数据填充
            $.each(res,function (i,obj) {
                var sopt_id = obj.soptBean.id;
                var searchCard =
                    "<div class=\"SearchCard\">" +
                        "<div class=\"SearchCardTop\">" +
                            "<img id='search_card_img_" + i + "' src=\"/files/" + obj.soptBean.img + "\">" +
                            "<div>" +
                                "<h3>" + obj.soptBean.name + "</h3>" +
                                "<p>" + obj.soptBean.detail + "</p>" +
                            "</div>" +
                        "</div>" +
                        "<div class=\"cf\"></div>" +
                        "<div class=\"SearchCardTool\">" +
                            "<button id='search_card_btn_" + i + "' onclick='openBottom(\"" + i + "\")' class=\"btn btn-info fr\">查看评价&行程&nbsp;<span class=\"glyphicon glyphicon-chevron-down\"></span></button>" +
                        "</div>";
                //处理评价
                searchCard +=
                    "<div id='search_card_bottom_" + i + "' class=\"SearchCardBottom\">" +
                        "<div class=\"SearchCardLeft\">" +
                            "<h3>用户评价</h3>";
                if (obj.commBeans != null && obj.commBeans.length>0) {
                    //遍历添加评价
                    $.each(obj.commBeans,function (i,obj) {
                        searchCard +=
                            "<div class=\"SearchCardLeftDetail\">" +
                                "<h4>" + obj.name + "</h4>" +
                                "<h5>" + obj.time + "</h5>" +
                                "<p>" + obj.detail + "</p>" +
                            "</div>";
                    });
                    //闭合处理
                    searchCard += "</div>";
                } else {
                    searchCard +=
                        "<div>暂无评价</div>" +
                        "</div>";
                }

                //处理行程
                searchCard +=
                    "<div class=\"SearchCardRight\">" +
                        "<h3>行程列表</h3>";
                if (obj.routeBeans != null && obj.routeBeans.length>0) {
                    //遍历添加行程
                    $.each(obj.routeBeans,function (i,obj) {
                        //获取行程时间
                        var sites = obj.sites.split(',');
                        var times = obj.times.split(',');
                        var time = '';
                        $.each(sites,function (i,sopt) {
                            if (sopt == sopt_id) {
                                time = times[i].replace("T","&nbsp;");
                            }
                        });
                        searchCard +=
                            "<div class=\"SearchCardRightDetail\">" +
                                "<h4>" + time + "&nbsp;&nbsp;" + obj.sponsor + "&nbsp;&nbsp;¥" + obj.price + "</h4>" +
                                "<h4>&nbsp;&nbsp;<a onclick='openRoute(\"" + obj.id + "\")' data-toggle=\"modal\" data-target=\"#search_main_route_dialog\" href=\"#\">查看详情</a></h4>" +
                            "</div>";
                    });
                    //闭合处理
                    searchCard += "</div>";
                } else {
                    searchCard +=
                        "<div>暂无行程</div>" +
                        "</div>";
                }
                //闭合处理
                searchCard +=
                    "</div>" +
                    "<div class=\"cf\"></div>" +
                "</div>";
                $('#search_main_list').append(searchCard);
            });
        },
        error: function () {
            //填充无结果页面
            var item = " <div style=\"width: 100%;font-size: 30px;font-weight: bold;text-align: center;\">这里再也没有您要的内容啦!</div>";
            $('#search_main_list').append(item);
        }
    });
}

/**
 * 查看行程
 * @param id
 */
function openRoute(id) {
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
            //检验是否已经加入过行程
            $.ajax({
                type: 'post',
                url: '/search',
                dataType: "json",
                data: {action:'ACTION_SEARCH_CHECK_ROUTE',route:res.id,user:getUrlParam("id")},
                success: function (res) {
                    if (res) {
                        //未加入行程
                        $('#search_main_route_dialog_btn_add').removeAttr('disabled');
                    } else {
                        //已经加入了该行程
                        $('#search_main_route_dialog_btn_add').attr('disabled','disabled');
                    }
                },
                error: function () {
                    //发生错误
                    $('#search_main_route_dialog_btn_add').attr('disabled','disabled');
                }
            });
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
 * 绑定加入行程按钮
 */
$('#search_main_route_dialog_btn_add').click(function () {
    //获取数据
    var routeid = $('#search_main_route_dialog_id').val();
    var userid = getUrlParam("id");
    var time = getNowFormatDate();
    var data = {
        action:'ACTION_SEARCH_ADD_ORDER',
        route:routeid,
        user:userid,
        time:time
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/search',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('加入行程成功!');
                $('#search_main_route_dialog').modal('hide');
            } else {
                alert('加入行程失败!');
            }
        },
        error: function () {
            alert('服务器异常，加入行程失败!');
        }
    });
});

/**
 * 初始化訂單列表
 * @param pageNumber
 */
function initOrderTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/search',
        id:'#search_main_user_table',
        toolbar:'#search_main_user_toolbar',
        pageNumber:pageNumber,
        data: {action:'ACTION_SEARCH_GET_ORDER',user:getUrlParam("id")},
        search:true,
        columns:[{
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
            field: 'note',
            title: '说明',
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
                //判断开始时间与当前时间
                if (daysBetween(row.start.replace("&nbsp;"," ")) <= 0) {
                    //计划已经启动，开放申诉按钮
                    result = "<div class='btn-group'><button class='btn btn-danger btn-sm' data-toggle=\"modal\" data-target=\"#search_main_message_dialog\" onclick='addMessage()'><span class='glyphicon glyphicon-envelope'></span>&nbsp;申诉</button></div>";
                }
                if (daysBetween(row.end.replace("&nbsp;"," ")) <= 0) {
                    //计划已经完成，开放评价按钮
                    result = "<div class='btn-group'><button onclick='addCom(\"" + row.soptid + "\")' class='btn btn-info btn-sm' data-toggle=\"modal\" data-target=\"#search_main_com_dialog\"><span class='glyphicon glyphicon-edit'></span>&nbsp;评价</button><button class='btn btn-danger btn-sm' data-toggle=\"modal\" data-target=\"#search_main_message_dialog\" onclick='addMessage()'><span class='glyphicon glyphicon-envelope'></span>&nbsp;申诉</button></div>";
                }
                //判断是否已经被取消
                if (row.state == 1) {
                    result = "不可操作";
                }
                return result;
            }
        }]
    };
    //创建表格
    table.Init(parm);
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
                initOrderTable($('#search_main_user_table').bootstrapTable('getOptions').pageNumber);
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
 * 添加申诉
 */
function addMessage() {
    $('#search_main_message_dialog_detail').val('');
}

/**
 * 绑定提交申诉按钮
 */
$('#search_main_message_dialog_ok').click(function () {
    //获取数据
    var detail = $('#search_main_message_dialog_detail').val();
    if ('' == detail) {
        alert('请输入申诉内容!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_SERACH_ADD_MESSAGE',
            detail:getFormatCode(detail),
            user:getUrlParam("id"),
            time:getNowFormatDate()
        };
        $.ajax({
            type: 'post',
            url: '/search',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('申诉成功!');
                    $('#search_main_message_dialog').modal('hide');
                } else {
                    alert('申诉失败!');
                }
            },
            error: function () {
                alert('服务器异常，申诉失败!');
            }
        });
    }
});

/**
 * 添加评论
 * @param id
 */
function addCom(id) {
    $('#search_main_com_dialog_id').val(id);
    $('#search_main_com_dialog_detail').val('');
}

/**
 * 绑定添加评论按钮
 */
$('#search_main_com_dialog_btn_ok').click(function () {
    //获取数据
    var id = $('#search_main_com_dialog_id').val();
    var detail = $('#search_main_com_dialog_detail').val();
    if ('' == detail) {
        alert('请输入评价内容!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_SERACH_ADD_COM',
            detail:getFormatCode(detail),
            user:getUrlParam("id"),
            sopt:id,
            time:getNowFormatDate()
        };
        $.ajax({
            type: 'post',
            url: '/search',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('评价成功!');
                    $('#search_main_com_dialog').modal('hide');
                } else {
                    alert('评价失败!');
                }
            },
            error: function () {
                alert('服务器异常，评价失败!');
            }
        });
    }
});

/**
 * 查看详情安排
 * @param id
 */
function openMyRoute(id) {
    $('#search_main_route_dialog_list').empty();
    $('#search_main_route_dialog_btn_add').hide();
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

/**
 * 打開評價&行程
 * @param id
 */
function openBottom(id) {
    //動態控制元素樣式
    if($('#search_card_bottom_' + id).is(':hidden')){　　//如果node是隐藏的则显示node元素，否则隐藏
        $('#search_card_img_' + id).css('border-bottom-left-radius','0px');
        $('#search_card_btn_' + id).css('border-bottom-right-radius','0px');
    }else{
        $('#search_card_img_' + id).css('border-bottom-left-radius','10px');
        $('#search_card_btn_' + id).css('border-bottom-right-radius','10px');
    }
    $('#search_card_bottom_' + id).slideToggle(500);
}

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