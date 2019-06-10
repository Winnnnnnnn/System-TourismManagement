/**
 * 页面启动入口
 */
$(function () {
    //绑定登录按钮
    $('#login').click(function () {
        //获取数据
        var acount = $('#acount').val();
        var pwd = $('#pwd').val();
        //数据校验
        if ('' == acount) {
            alert('请输入账号!');
            return;
        }
        if ('' == pwd) {
            alert('请输入密码!');
            return;
        }
        //封装数据
        var data = {
            action:'ACTION_ADMIN_LOGIN',
            acount:acount,
            pwd:pwd
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (res) {
                //登录成功
                window.location = '/back?id=' + res.id + '&name=' + res.name + "&power=" + res.power;
            },
            error: function () {
                alert('账号/密码错误!');
            }
        });
    });
    //键盘事件响应
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            //回车键
            $('#login').click();
        }
        if (event.keyCode == 40) {
            //向下按键处理
            $('#pwd').focus();
        }
        if (event.keyCode == 38) {
            //向上按键处理
            $('#acount').focus();
        }
    });
});
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