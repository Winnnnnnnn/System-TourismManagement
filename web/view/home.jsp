<%--
  Created by IntelliJ IDEA.
  User: 邓建豪
  Date: 2019/3/31
  Time: 0:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>旅游管理系统</title>
    <link rel="stylesheet" href="../css/libs/bootstrap.css">
    <link rel="stylesheet" href="../css/base.css">
</head>
<body>
<%--蒙板--%>
<div class="HomeOverlay" style="display: none;" id="home_over"></div>
<%--顶部布局--%>
<div class="HomeTop" id="home_top">
    <div id="topBanner" class="carousel slide" data-ride="carousel">
        <!-- 轮播（Carousel）项目 -->
        <div class="carousel-inner">
            <div class="item active">
                <img src="../image/封面一.jpg" class="HomeTopImg">
            </div>
            <div class="item">
                <img src="../image/封面二.jpg" class="HomeTopImg">
            </div>
            <div class="item">
                <img src="../image/封面三.jpg" class="HomeTopImg">
            </div>
        </div>
        <!-- 轮播（Carousel）导航 -->
        <a class="left carousel-control" href="#topBanner" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#topBanner" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    <%--顶部导航--%>
    <div class="HomeTopNav">
        <ul>
            <li class="fl"><img src="../image/icon/logo.png"></li>
            <li class="fr"><a href="/admin"><span class="glyphicon glyphicon-equalizer"></span>&nbsp;管理员</a></li>
            <li class="fr" id="home_top_nav_login"><a href="#home_top">登录</a></li>
            <li class="fr" id="home_top_nav_sign_up"><a href="#home_top">注册</a></li>
            <li class="fr" id="home_top_nav_info"><a href="/home">欢迎您：<span id="home_top_nav_info_name"></span>&nbsp;&nbsp;<span class="glyphicon glyphicon-log-out"></span>&nbsp;退出登录</a></li>
            <li class="fr" id="home_top_nav_user"><a href="#"><span class="glyphicon glyphicon-user"></span>&nbsp;个人中心</a></li>
        </ul>
    </div>
    <%--大屏标语--%>
    <div class="HomeTopNote">
        <%--默认显示最后一条公告--%>
        <h1>惬意的旅游时光</h1>
        <br/>
        <h2>带给你最舒服的旅游体验</h2>
    </div>
    <%--搜索框--%>
    <div class="HomeTopSearch">
        <img src="../image/icon/定位.png">
        <input id="home_top_key" placeholder="输入景点名称">
        <%--搜索--%>
        <button id="home_top_btn_search">搜索</button>
    </div>
</div>
<%--热门景点--%>
<div class="HomeMain">
    <h3>热门景点&nbsp;&nbsp;<a id="home_main_sopts_more" href="#">查看更多>>></a></h3>
    <div class="row" id="home_main_sopts"></div>
    <h3 style="text-align: center" id="home_main_sopts_no">暂无景点</h3>
    <%--底部--%>
    <div style="text-align: center">
        © 2019 旅游管理系统. All rights reserved.
    </div>
</div>
<%--登录框--%>
<div class="HomeLoginBg" id="home_login">
    <div>
        <div style="float: left">
            <h3 style="margin-bottom: 10px;font-weight: bold;">
                登录旅游管理系统
            </h3>
            <h4>还没有账号？&nbsp;<a id="home_login_to_sign_up">注册</a></h4>
        </div>
        <span id="home_login_close" class="close glyphicon glyphicon-remove"></span>
    </div>
    <div class="cf" style="margin-bottom: 50px;"></div>
    <input type="text" id="home_login_phone" placeholder="手机" class="form-control">
    <input type="password" id="home_login_pwd" placeholder="密码" class="form-control">
    <button id="home_login_btn_login">立即登录</button>
    <div class="sigma-content">
        <div class="sigma-middle-line">
            <span class="sigma-line-text">密码忘记请联系管理员重置</span>
        </div>
    </div>
</div>
<%--注册框--%>
<div class="HomeLoginBg" id="home_sign_up">
    <div>
        <div style="float: left">
            <h3 style="margin-bottom: 10px;font-weight: bold;">
                注册旅游管理系统
            </h3>
            <h4>已有账号？&nbsp;<a id="home_sign_up_to_login">立即登录</a></h4>
        </div>
        <span id="home_sign_up_close" class="close glyphicon glyphicon-remove"></span>
    </div>
    <div class="cf" style="margin-bottom: 50px;"></div>
    <input type="text" id="home_sign_up_name" placeholder="姓名" class="form-control">
    <input type="text" id="home_sign_up_phone" placeholder="手机" class="form-control">
    <input type="password" id="home_sign_up_pwd" placeholder="密码" class="form-control">
    <button id="home_sign_up_btn_do">立即注册</button>
    <div class="sigma-content">
        <div class="sigma-middle-line">
            <span class="sigma-line-text">温馨提示：请不要将密码泄露给他人</span>
        </div>
    </div>
</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bootstrap.js"></script>
<script src="../js/home.js"></script>
</body>
</html>
