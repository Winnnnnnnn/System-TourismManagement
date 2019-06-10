<%--
  Created by IntelliJ IDEA.
  User: 邓建豪
  Date: 2019/3/31
  Time: 2:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>旅游管理系统</title>
    <link rel="stylesheet" href="../css/base.css">
</head>
<body>
<%--全屏视频播放背景--%>
<video id="bg_video" class="LoginVideo" autoplay loop muted></video>
<%--封面--%>
<div id="bg_cover" class="LoginCover"></div>
<%--蒙板--%>
<%--<div class="LoginOverlay"></div>--%>
<%--管理员登录框--%>
<div class="LoginBg">
    <h1>管理员登录</h1>
    <div class="LoginEditBg">
        <img src="../image/icon/用户.png">
        <input id='acount' type='text' placeholder='请输入账号' autocomplete='off'>
    </div>
    <div class="cf" style="margin-bottom: 20px;"></div>
    <div class="LoginEditBg">
        <img src="../image/icon/密码.png">
        <input id='pwd' type='password' placeholder='请输入密码' autocomplete='off'>
    </div>
    <div class="cf" style="margin-bottom: 20px;"></div>
    <div id="login" class="LoginButton"></div>
</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bideo.js"></script>
<script src="../js/admin.js"></script>
</body>
</html>
