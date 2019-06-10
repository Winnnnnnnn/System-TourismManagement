<%--
  Created by IntelliJ IDEA.
  User: 邓建豪
  Date: 2019/3/31
  Time: 12:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>旅游管理系统</title>
    <link rel="stylesheet" href="../css/libs/bootstrap.css">
    <link rel="stylesheet" href="../css/libs/bootstrap-table.css">
    <link rel="stylesheet" href="../css/base.css">
</head>
<body>
<%--全屏视频播放背景--%>
<video id="bg_video" class="LoginVideo" autoplay loop muted></video>
<%--封面--%>
<div id="bg_cover" class="LoginCover"></div>
<%--蒙板--%>
<div class="LoginOverlay"></div>
<%--顶部导航栏--%>
<div class="BaseNav">
    <ul>
        <li class="fl">
            <%--logo--%>
            <img src="../image/icon/logo.png">
        </li>
        <li class="fl">
            <a class="BaseNavLogoTitle">旅游管理系统</a>
        </li>
        <li class="fr">
            <a href="/admin">退出登录</a>
        </li>
        <li class="fr">
            <a id="back_top_name"></a>
        </li>
    </ul>
</div>
<%--中心管理区域--%>
<div class="BaseMain">
    <%--左侧菜单--%>
    <div class="BackLeft">
        <ul>
            <li id="back_nav_sopt">
                <a href="#">
                    景点管理
                </a>
            </li>
            <li id="back_nav_route">
                <a href="#">
                    行程管理
                </a>
            </li>
            <li id="back_nav_order">
                <a href="#">
                    订单管理
                </a>
            </li>
            <li id="back_nav_message">
                <a href="#">
                    申诉管理
                </a>
            </li>
            <li id="back_nav_user">
                <a href="#">
                    用户管理
                </a>
            </li>
            <li id="back_nav_admin">
                <a href="#">
                    超级管理
                </a>
            </li>
        </ul>
    </div>
    <%--右侧管理区域--%>
    <div class="BackRight">
        <%--景点管理--%>
        <div id="back_main_sopt" class="BackMain">
            <div id="back_main_sopt_toolbar">
                <button onclick="addSopt()" class="btn btn-info" data-toggle="modal" data-target="#back_sopt_dialog"><span class="glyphicon glyphicon-plus"></span>&nbsp;添加景点</button>
            </div>
            <%--景点信息表--%>
            <table id="back_main_sopt_table" class="table"></table>
        </div>
        <%--普通管理員或旅社人員--%>
        <div id="back_main_sopt_no" class="BackMain">
            <%--景点信息表--%>
            <table id="back_main_sopt_no_table" class="table"></table>
        </div>
        <%--行程管理--%>
        <div id="back_main_route" class="BackMain">
            <div id="back_main_route_toolbar">
                <button onclick="addRoute()" class="btn btn-info" data-toggle="modal" data-target="#back_route_dialog"><span class="glyphicon glyphicon-plus"></span>&nbsp;添加行程</button>
            </div>
            <%--行程信息表--%>
            <table id="back_main_route_table" class="table"></table>
        </div>
        <%--订单管理--%>
        <div id="back_main_order" class="BackMain">
            <%--订单信息表--%>
            <table id="back_main_order_table" class="table"></table>
        </div>
        <%--申诉管理--%>
        <div id="back_main_message" class="BackMain">
            <%--订单信息表--%>
            <table id="back_main_message_table" class="table"></table>
        </div>
        <%--用户管理--%>
        <div id="back_main_user" class="BackMain">
            <table id="back_main_user_table" class="table"></table>
        </div>
        <%--管理员管理--%>
        <div id="back_main_no_power" class="BackMain" style="text-align: center;">
            <h1>抱歉！您没有权限访问！</h1>
        </div>
        <div id="back_main_has_power" class="BackMain">
            <div id="back_main_has_power_toolbar">
                <button onclick="addAdmin()" class="btn btn-info" data-toggle="modal" data-target="#admin_admin_dialog"><span class="glyphicon glyphicon-plus"></span>&nbsp;添加管理员</button>
            </div>
            <%--管理员信息表--%>
            <table id="back_main_has_power_table" class="table"></table>
        </div>
    </div>
</div>
<%--景点管理对话框--%>
<div id='back_sopt_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='back_sopt_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='back_sopt_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='back_sopt_dialog_id'/>
                <div class='form-horizontal' id='back_sopt_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">景点名称</label>
                        <div class="col-sm-10">
                            <input id="back_sopt_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">景点介绍</label>
                        <div class="col-sm-10">
                            <textarea id="back_sopt_dialog_detail" class="form-control" rows="11"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">景点图片</label>
                        <div class="col-sm-10">
                            <img id="back_sopt_dialog_img" src="../image/景点选择.jpg" style="width: 100%;height: 200px;border-radius: 6px;">
                            <form id="back_sopt_dialog_form" enctype="multipart/form-data" style="display: none;">
                                <input id="back_sopt_dialog_file" name="file" type="file" accept="image/gif, image/png, image/jpg, image/jpeg">
                            </form>
                        </div>
                    </div>
                    <h4>说明：建议图片尺寸：500*200像素</h4>
                </div>
                <div id='back_sopt_dialog_warn'>
                    <h4>确认要删除吗？不可恢复哦？</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="back_sopt_dialog_add" type="button" class="btn btn-info">添加</button>
                <button id="back_sopt_dialog_edit" type="button" class="btn btn-info">编辑</button>
                <button id="back_sopt_dialog_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--行程管理对话框--%>
<div id='back_route_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='back_route_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='back_route_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='back_route_dialog_id'/>
                <div class='form-horizontal' id='back_route_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">行程列表</label>
                        <div class="col-sm-10">
                            <button onclick="addSoptToRoute()" class="btn btn-sm btn-default" data-toggle="modal" data-target="#back_route_sopt_dialog"><span class="glyphicon glyphicon-plus"></span>&nbsp;添加景点</button>
                            <%--行程列表--%>
                            <div id="back_route_dialog_list"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">开始时间</label>
                        <div class="col-sm-10">
                            <input id="back_route_dialog_start" type="text" class="form-control" disabled/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">结束时间</label>
                        <div class="col-sm-10">
                            <input id="back_route_dialog_end" type="text" class="form-control" disabled/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">旅行社</label>
                        <div class="col-sm-10">
                            <input id="back_route_dialog_sponsor" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">电话</label>
                        <div class="col-sm-10">
                            <input id="back_route_dialog_phone" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">价格</label>
                        <div class="col-sm-10">
                            <input id="back_route_dialog_price" type="number" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">说明</label>
                        <div class="col-sm-10">
                            <textarea id="back_route_dialog_note" class="form-control" rows="11"></textarea>
                        </div>
                    </div>
                </div>
                <div id='back_route_dialog_warn'>
                    <h4>确认要删除吗？不可恢复哦？</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="back_route_dialog_add" type="button" class="btn btn-info">添加</button>
                <button id="back_route_dialog_edit" type="button" class="btn btn-info">编辑</button>
                <button id="back_route_dialog_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--景点选择--%>
<div id='back_route_sopt_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='back_route_sopt_dialog_label' aria-hidden='true' style="z-index: 99999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='back_route_sopt_dialog_label' class='modal-title'>添加景点到行程</h4>
            </div>
            <div class='modal-body'>
                <div class='form-horizontal'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">景点选择</label>
                        <div class="col-sm-10">
                            <%--景点名称选择--%>
                            <select id="back_route_sopt_dialog_name" class="form-control"></select>
                        </div>
                    </div>
                    <div class="form-group" id="back_route_sopt_dialog_detail_lay">
                        <label class="col-sm-2 control-label">景点介绍</label>
                        <div class="col-sm-10">
                            <textarea id="back_route_sopt_dialog_detail" disabled class="form-control" rows="9"></textarea>
                        </div>
                    </div>
                    <div class="form-group" id="back_route_sopt_dialog_img_lay">
                        <label class="col-sm-2 control-label">景点图片</label>
                        <div class="col-sm-10">
                            <img id="back_route_sopt_dialog_img" src="../image/景点选择.jpg" style="width: 100%;height: 200px;border-radius: 6px;">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">开始时间</label>
                        <div class="col-sm-10">
                            <input id="back_route_sopt_dialog_time" type="datetime-local" value="2019-01-01T00:00" class="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="back_route_sopt_dialog_ok" type="button" class="btn btn-info">确认</button>
            </div>
        </div>
    </div>
</div>
<%--行程详情对话框--%>
<div id='search_main_route_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='search_main_route_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='search_main_route_dialog_label' class='modal-title'>行程详情</h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='search_main_route_dialog_id'/>
                <%--行程时间--%>
                <div style="margin-top: 20px;margin-bottom: 20px;font-size: 18px;">行程时间：<span id="search_main_route_dialog_start"></span>-<span id="search_main_route_dialog_end"></span></div>
                <%--行程列表--%>
                <div id="search_main_route_dialog_list"></div>
                <%--旅行社--%>
                <div style="margin-top: 20px;margin-bottom: 20px;font-size: 18px;">旅行社：<span id="search_main_route_dialog_sponsor"></span></div>
                <%--联系电话--%>
                <div style="margin-top: 20px;margin-bottom: 20px;font-size: 18px;">联系电话：<span id="search_main_route_dialog_phone"></span></div>
                <%--价格--%>
                <div style="margin-top: 20px;margin-bottom: 20px;font-size: 18px;color: red;">售价：<span id="search_main_route_dialog_price"></span></div>
                <%--说明--%>
                <div id="search_main_route_dialog_note" style="margin-top: 20px;margin-bottom: 20px;font-size: 18px;"></div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<%--取消行程对话框--%>
<div id='search_main_del_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='search_main_del_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='search_main_del_dialog_label' class='modal-title'>取消行程</h4>
            </div>
            <div class='modal-body'>
                <div class='form-horizontal'>
                    <input type='hidden' id='search_main_del_dialog_id'/>
                    <h4>确认要取消行程吗？不可恢复哦？</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="search_main_del_dialog_ok" type="button" class="btn btn-info">确认</button>
            </div>
        </div>
    </div>
</div>
<%--用户管理对话框--%>
<div id='admin_user_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='admin_user_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='admin_user_dialog_label' class='modal-title'>修改用户信息</h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='admin_user_dialog_id'/>
                <div class='form-horizontal'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机</label>
                        <div class="col-sm-10">
                            <input id="admin_user_dialog_phone" type="text" class="form-control" disabled/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input id="admin_user_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input id="admin_user_dialog_pwd" type="text" class="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="admin_user_dialog_ok" type="button" class="btn btn-info">确认</button>
            </div>
        </div>
    </div>
</div>
<%--管理员管理对话框--%>
<div class="modal fade" id="admin_admin_dialog" tabindex="-1" role="dialog" aria-labelledby="admin_admin_dialog_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="admin_admin_dialog_label"></h4>
            </div>
            <div class="modal-body">
                <input type="hidden" id="admin_admin_dialog_id">
                <div class="form-horizontal AdminPostsRightJobDialogBtn" id="admin_admin_dialog_body">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">账号</label>
                        <div class="col-sm-10">
                            <input id="admin_admin_dialog_account" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">名称</label>
                        <div class="col-sm-10">
                            <input id="admin_admin_dialog_name" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input id="admin_admin_dialog_pwd" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="AdminPostsRightJobDialogBtn" id="admin_admin_dialog_warn">确认要删除吗？</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-info AdminPostsRightJobDialogBtn" id="admin_admin_dialog_btn_add">确认</button>
                <button type="button" class="btn btn-info AdminPostsRightJobDialogBtn" id="admin_admin_dialog_btn_edit">修改</button>
                <button type="button" class="btn btn-info AdminPostsRightJobDialogBtn" id="admin_admin_dialog_btn_del">删除</button>
            </div>
        </div>
    </div>
</div>
<%--底部--%>
<div class="BaseBottom">
    © 2019 旅游管理系统. All rights reserved.
</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bootstrap.js"></script>
<script src="../js/libs/bootstrap-table.js"></script>
<script src="../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../js/libs/bideo.js"></script>
<script src="../js/utils/table.js"></script>
<script src="../js/utils/base64.js"></script>
<script src="../js/back.js"></script>
</body>
</html>
