<%--
  Created by IntelliJ IDEA.
  User: 邓建豪
  Date: 2019/4/6
  Time: 13:26
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
<%--顶部导航栏--%>
<div class="SearchNav">
    <ul>
        <li class="fl">
            <%--logo--%>
            <img src="../image/icon/旅游选中.png">
        </li>
        <li class="fl">
            <a class="SearchNavLogoTitle">旅游管理系统</a>
        </li>
        <li class="fl">
            <%--搜索框--%>
            <a class="SearchBg">
                <img src="../image/icon/定位.png">
                <input id="search_nav_key" placeholder="输入景点名称">
            </a>
        </li>
        <li class="fr">
            <a href="/home"><span class="glyphicon glyphicon-log-out"></span>&nbsp;退出登录</a>
        </li>
        <li id="search_nav_home" class="fr">
            <a href="#"><span class="glyphicon glyphicon-home"></span>&nbsp;回到首页</a>
        </li>
        <li id="search_nav_user" class="fr">
            <a href="#"><span class="glyphicon glyphicon-user"></span>&nbsp;个人中心</a>
        </li>
        <li class="fr">
            <a id="search_nav_name"></a>
        </li>
    </ul>
</div>
<%--主体区域--%>
<div class="SearchMain">
    <%--搜索结果--%>
    <div id="search_main_list" style="display: none;"></div>
    <%--个人中心--%>
    <div id="search_main_user" style="display: none;">
        <%--我的订单--%>
        <div class="SearchMainOrder">
            <div id="search_main_user_toolbar" style="font-weight: bold;font-size: 20px;color: #000;"><span class="glyphicon glyphicon-align-center"></span>&nbsp;我的行程</div>
            <table id="search_main_user_table" class="table"></table>
        </div>
    </div>
</div>
<%--底部--%>
<div class="SearchBottom">
    © 2019 旅游管理系统. All rights reserved.
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
                <button id="search_main_route_dialog_btn_add" type="button" class="btn btn-info">加入该行程</button>
            </div>
        </div>
    </div>
</div>
<%--评价对话框--%>
<div id='search_main_com_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='search_main_com_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='search_main_com_dialog_label' class='modal-title'>行程评价</h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='search_main_com_dialog_id'/>
                <div class='form-horizontal'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">评价内容</label>
                        <div class="col-sm-10">
                            <textarea id="search_main_com_dialog_detail" class="form-control" rows="13"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="search_main_com_dialog_btn_ok" type="button" class="btn btn-info">提交评价</button>
            </div>
        </div>
    </div>
</div>
<%--申訴对话框--%>
<div id='search_main_message_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='search_main_message_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='search_main_message_dialog_label' class='modal-title'>留言申诉</h4>
            </div>
            <div class='modal-body'>
                <div class='form-horizontal'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">申诉内容</label>
                        <div class="col-sm-10">
                            <textarea id="search_main_message_dialog_detail" class="form-control" rows="13"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button id="search_main_message_dialog_ok" type="button" class="btn btn-info">提交申诉</button>
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
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bootstrap.js"></script>
<script src="../js/libs/bootstrap-table.js"></script>
<script src="../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../js/utils/table.js"></script>
<script src="../js/search.js"></script>
</body>
</html>
