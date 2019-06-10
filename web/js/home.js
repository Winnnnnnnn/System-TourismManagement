//页面启动入口
$(function () {
    initNav();
    initHomeData();
});

/**
 * 初始化导航栏
 */
function initNav() {
    $('#home_top_nav_login').hide();
    $('#home_top_nav_sign_up').hide();
    $('#home_top_nav_info').hide();
    $('#home_top_nav_user').hide();
    //判断用户是否登录
    var id = getUrlParam("id");
    if (id == null) {
        $('#home_top_nav_login').show();
        $('#home_top_nav_sign_up').show();
    } else {
        $('#home_top_nav_info').show();
        $('#home_top_nav_user').show();
        $('#home_top_nav_info_name').html(getUrlParam('name'));
    }
    $('#home_top_nav_user').click(function () {
        window.location = "/search?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&menu=user";
    });
}

/**
 * 绑定登录按钮
 */
$('#home_top_nav_login').click(function () {
    $('#home_over').show();
    $('#home_login').show();
    $(document.body).css('overflow','hidden');
});

/**
 * 绑定关闭登录框按钮
 */
$('#home_login_close').click(function () {
    $('#home_login').hide();
    $('#home_over').hide();
    $(document.body).css('overflow','auto');
});

/**
 * 绑定注册按钮
 */
$('#home_top_nav_sign_up').click(function () {
    $('#home_over').show();
    $('#home_sign_up').show();
    $(document.body).css('overflow','hidden');
});

/**
 * 绑定关闭注册框按钮
 */
$('#home_sign_up_close').click(function () {
    $('#home_sign_up').hide();
    $('#home_over').hide();
    $(document.body).css('overflow','auto');
});

/**
 * 进入注册
 */
$('#home_login_to_sign_up').click(function () {
    $('#home_login_close').click();
    $('#home_top_nav_sign_up').click();
});

/**
 * 进入登录
 */
$('#home_sign_up_to_login').click(function () {
    $('#home_sign_up_close').click();
    $('#home_top_nav_login').click();
});

/**
 * 绑定立即登录按钮
 */
$('#home_login_btn_login').click(function () {
    //获取数据
    var phone = $('#home_login_phone').val();
    var pwd = $('#home_login_pwd').val();
    if ('' == phone) {
        alert('请输入手机号!');
        return;
    }
    if ('' == pwd) {
        alert('请输入密码!');
        return;
    }
    if (!isPoneAvailable(phone)) {
        alert('手机号格式错误!');
        return;
    }
    //封装数据
    var data = {
        action:'ACTION_HOME_LOGIN',
        phone: phone,
        pwd: pwd
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: data,
        success: function (res) {
            window.location = '/home?id=' + res.id + '&name=' + res.name;
        },
        error: function () {
            alert('手机号/密码错误!');
        }
    });
});

/**
 * 绑定立即注册按钮
 */
$('#home_sign_up_btn_do').click(function () {
    //获取数据
    var phone = $('#home_sign_up_phone').val();
    var pwd = $('#home_sign_up_pwd').val();
    var name = $('#home_sign_up_name').val();
    if ('' == name) {
        alert('请输入姓名!');
        return;
    }
    if ('' == phone) {
        alert('请输入手机号!');
        return;
    }
    if ('' == pwd) {
        alert('请输入密码!');
        return;
    }
    if (!isPoneAvailable(phone)) {
        alert('手机号格式错误!');
        return;
    }
    //封装数据
    var data = {
        action:'ACTION_HOME_SIGN_UP',
        phone: phone,
        pwd: pwd,
        name:name
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                $('#home_login_phone').val(phone);
                $('#home_login_pwd').val(pwd);
                $('#home_login_btn_login').click();
            } else {
                alert('该手机号已被注册!');
            }
        },
        error: function () {
            alert('服务器异常，注册失败!');
        }
    });
});

/**
 * 初始化主页数据
 */
function initHomeData() {
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
                $('#home_main_sopts_no').hide();
                $('#home_main_sopts').empty();
                //取九个
                if (res.length>9) {
                    for (var i=0;i<9;i++) {
                        var sopt = "<div onclick='openSearch(\"" + res[i].name + "\")' class=\"HomeMainCard col-sm-4\">"+
                            "<img src=\"/files/" + res[i].img + "\">" +
                            "<div class=\"HomeMainCardCov\">" +
                            "<h5>" + res[i].name + "</h5>" +
                            "<p>" + res[i].detail + "</p>" +
                            "</div>" +
                            "</div>";
                        $('#home_main_sopts').append(sopt);
                    }
                } else {
                    $.each(res,function (i,obj) {
                        var sopt = "<div onclick='openSearch(\"" + obj.name + "\")' class=\"HomeMainCard col-sm-4\">"+
                            "<img src=\"/files/" + obj.img + "\">" +
                            "<div class=\"HomeMainCardCov\">" +
                            "<h5>" + obj.name + "</h5>" +
                            "<p>" + obj.detail + "</p>" +
                            "</div>" +
                            "</div>";
                        $('#home_main_sopts').append(sopt);
                    });
                }
            } else {
                $('#home_main_sopts_no').show();
                $('#home_main_sopts').hide();
            }
        },
        error: function () {
            $('#home_main_sopts_no').show();
            $('#home_main_sopts').hide();
        }
    });
}

/**
 * 进入搜索页
 * @param key
 */
function openSearch(key) {
    var id = getUrlParam("id");
    if (id == null) {
        window.location = "/home#home_top";
        $('#home_top_nav_login').click();
    } else {
        window.location = "/search?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&key=" + key;
    }
}

/**
 * 绑定查看更多按钮
 */
$('#home_main_sopts_more').click(function () {
    var id = getUrlParam("id");
    if (id == null) {
        window.location = "/home#home_top";
        $('#home_top_nav_login').click();
    } else {
        window.location = "/search?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&key=";
    }
});

/**
 * 绑定搜索按钮
 */
$('#home_top_btn_search').click(function () {
    var key = $('#home_top_key').val();
    var id = getUrlParam("id");
    if (id == null) {
        window.location = "/home#home_top";
        $('#home_top_nav_login').click();
    } else {
        window.location = "/search?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&key=" + key;
    }
});

/**
 * 手机号校验
 * @param pone
 * @returns {boolean}
 */
function isPoneAvailable(pone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(pone)) {
        return false;
    } else {
        return true;
    }
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