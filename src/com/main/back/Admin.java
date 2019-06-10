package com.main.back;

import com.main.bean.AdminBean;
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

import static com.main.utils.ConstUtil.ACTION_ADMIN_LOGIN;

/**
 * @author 邓建豪
 * @date 2019/03/31
 * @describe 管理员登录页
 */
@WebServlet(name="admin",urlPatterns="/admin")
public class Admin extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/view/admin.jsp").forward(req,resp);
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
                case ACTION_ADMIN_LOGIN:
                    printWriter.print(doLogin(req));
                    break;
            }
        }
    }

    /**
     * 管理员登录
     * @param req
     * @return
     */
    private String doLogin(HttpServletRequest req) {
        //判断登录类型
        String sql = "select * from admin where acount=? and pwd=?";
        String[] p = {
                req.getParameter("acount"),
                Base64Util.encode(req.getParameter("pwd"))
        };
        AdminBean adminBean = SqlHelper.doObjQuery(sql,p,AdminBean.class);
        if (adminBean != null) {
            //登录成功
            JSONObject jsonObject = JSONObject.fromObject(adminBean);
            return jsonObject.toString();
        } else {
            //登录失败
            return "";
        }
    }
}
