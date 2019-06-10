package com.main.back;

import com.main.bean.UserBean;
import com.main.utils.Base64Util;
import com.main.utils.SqlHelper;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static com.main.utils.ConstUtil.ACTION_HOME_LOGIN;
import static com.main.utils.ConstUtil.ACTION_HOME_SIGN_UP;

/**
 * @author 邓建豪
 * @date 2019/03/31
 * @describe 首页
 */
@WebServlet(name="home",urlPatterns="/home")
public class Home extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/view/home.jsp").forward(req,resp);
    }

    /**
     * 处理浏览器POST请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //调整编码，防止中文乱码
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        //获取请求来自于哪里，做什么动作
        String action = req.getParameter("action");
        //回调结果
        PrintWriter printWriter = resp.getWriter();
        //判断动作
        if (action != null) {
            switch (action) {
                case ACTION_HOME_LOGIN:
                    printWriter.print(doLogin(req));
                    break;
                case ACTION_HOME_SIGN_UP:
                    printWriter.print(doSignUp(req));
                    break;
            }
        }
    }

    /**
     * 用户登录
     * @param req
     * @return
     */
    private String doLogin(HttpServletRequest req) {
        String sql = "select * from users where phone=? and pwd=?";
        String[] p = {
                req.getParameter("phone"),
                Base64Util.encode(req.getParameter("pwd"))
        };
        UserBean userBean = SqlHelper.doObjQuery(sql,p,UserBean.class);
        if (userBean != null) {
            //登录成功
            JSONObject jsonObject = JSONObject.fromObject(userBean);
            return jsonObject.toString();
        } else {
            //登录失败
            return "";
        }
    }

    /**
     * 用户注册
     * @param req
     * @return
     */
    private Boolean doSignUp(HttpServletRequest req) {
        String sql = "insert into users(name,phone,pwd) select ?,?,? from dual where not exists(select name from users where phone=?)";
        String[] p = {
                req.getParameter("name"),
                req.getParameter("phone"),
                Base64Util.encode(req.getParameter("pwd")),
                req.getParameter("phone")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }
}
