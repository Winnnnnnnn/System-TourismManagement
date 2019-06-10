package com.main.back;

import com.main.bean.*;
import com.main.utils.Base64Util;
import com.main.utils.SqlHelper;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.main.utils.ConstUtil.*;

/**
 * @author 邓建豪
 * @date 2019/03/31
 * @describe 后台管理
 */
@WebServlet(name="back",urlPatterns="/back")
public class Back extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/view/back.jsp").forward(req,resp);
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
                case ACTION_ADMIN_GET_SOPT:
                    printWriter.print(getSopt(req));
                    break;
                case ACTION_ADMIN_ADD_SOPT:
                    printWriter.print(addSopt(req));
                    break;
                case ACTION_ADMIN_EDIT_SOPT:
                    printWriter.print(editSopt(req));
                    break;
                case ACTION_ADMIN_DEL_SOPT:
                    printWriter.print(delSopt(req));
                    break;
                case ACTION_ADMIN_ADD_ROUTE:
                    printWriter.print(addRoute(req));
                    break;
                case ACTION_ADMIN_GET_ROUTE:
                    printWriter.print(getRoute(req));
                    break;
                case ACTION_ADMIN_EDIT_ROUTE:
                    printWriter.print(editRoute(req));
                    break;
                case ACTION_ADMIN_DEL_ROUTE:
                    printWriter.print(delRoute(req));
                    break;
                case ACTION_ADMIN_GET_ORDER:
                    printWriter.print(getOrder(req));
                    break;
                case ACTION_ADMIN_GET_MESSAGE:
                    printWriter.print(getMessage(req));
                    break;
                case ACTION_ADMIN_GET_USER:
                    printWriter.print(doGetUser(req));
                    break;
                case ACTION_ADMIN_EDIT_USER:
                    printWriter.print(doEditUser(req));
                    break;
                case ACTION_ADMIN_GET_ADMIN:
                    //获取管理员列表
                    printWriter.print(doAdminGetAdmin());
                    break;
                case ACTION_ADMIN_ADD_ADMIN:
                    //添加管理员
                    printWriter.print(doAdminAddAdmin(req));
                    break;
                case ACTION_ADMIN_EDIT_ADMIN:
                    //编辑管理员
                    printWriter.print(doAdminEditAdmin(req));
                    break;
                case ACTION_ADMIN_DEL_ADMIN:
                    //刪除管理员
                    printWriter.print(doAdminDelAdmin(req));
                    break;
            }
        }
    }

    /**
     * 获取全部景点信息
     * @param req
     * @return
     */
    private String getSopt(HttpServletRequest req) {
        String sql = "select * from sopts order by id desc";
        List<SoptBean> soptBeans = SqlHelper.doListQuery(sql,null,SoptBean.class);
        if (soptBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(soptBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加景点
     * @param req
     * @return
     */
    private Boolean addSopt(HttpServletRequest req) {
        String sql = "insert into sopts(name,detail,img) values(?,?,?)";
        String[] p = {
                req.getParameter("name"),
                req.getParameter("detail"),
                req.getParameter("img")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 编辑景点
     * @param req
     * @return
     */
    private Boolean editSopt(HttpServletRequest req) {
        String img = req.getParameter("img");
        if (null == img || img.equals("")) {
            //无图片更新
            String sql = "update sopts set name=?,detail=? where id=?";
            String[] p = {
                    req.getParameter("name"),
                    req.getParameter("detail"),
                    req.getParameter("id")
            };
            int result = SqlHelper.doUpdate(sql,p);
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            //更新图片
            String sql = "update sopts set name=?,detail=?,img=? where id=?";
            String[] p = {
                    req.getParameter("name"),
                    req.getParameter("detail"),
                    req.getParameter("img"),
                    req.getParameter("id")
            };
            int result = SqlHelper.doUpdate(sql,p);
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 刪除景点
     * @param req
     * @return
     */
    private Boolean delSopt(HttpServletRequest req) {
        String sql = "delete from sopts where id=?";
        String[] p = {
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 添加行程
     * @param req
     * @return
     */
    private Boolean addRoute(HttpServletRequest req) {
        String sql = "insert into routes(sites,times,start,end,sponsor,phone,price,note,admin) values(?,?,?,?,?,?,?,?,?)";
        String[] p = {
                req.getParameter("sites"),
                req.getParameter("times"),
                req.getParameter("start"),
                req.getParameter("end"),
                req.getParameter("sponsor"),
                req.getParameter("phone"),
                req.getParameter("price"),
                req.getParameter("note"),
                req.getParameter("admin")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取全部行程
     * @param req
     * @return
     */
    private String getRoute(HttpServletRequest req) {
        String power = req.getParameter("power");
        String sql = "";
//        if (power.equals("0")) {
//            sql = "select routes.*,admin.name,group_concat(sopts.id order by find_in_set(sopts.id,routes.sites) separator ',') soptid,group_concat(sopts.name order by find_in_set(sopts.id,routes.sites) separator ',') soptname,group_concat(sopts.detail order by find_in_set(sopts.id,routes.sites) separator '----') soptdetail,group_concat(sopts.img order by find_in_set(sopts.id,routes.sites) separator ',') soptimg from routes,sopts,admin where routes.admin=admin.id and find_in_set(sopts.id,routes.sites) group by routes.id order by routes.id desc";
//            List<RouteBean> routeBeans = SqlHelper.doListQuery(sql,null,RouteBean.class);
//            if (routeBeans != null) {
//                JSONArray jsonArray = JSONArray.fromObject(routeBeans);
//                return jsonArray.toString();
//            } else {
//                return "";
//            }
//        } else {
//            sql = "select routes.*,admin.name,group_concat(sopts.id order by find_in_set(sopts.id,routes.sites) separator ',') soptid,group_concat(sopts.name order by find_in_set(sopts.id,routes.sites) separator ',') soptname,group_concat(sopts.detail order by find_in_set(sopts.id,routes.sites) separator '----') soptdetail,group_concat(sopts.img order by find_in_set(sopts.id,routes.sites) separator ',') soptimg from routes,sopts,admin where routes.admin=admin.id and routes.admin=? and find_in_set(sopts.id,routes.sites) group by routes.id order by routes.id desc";
//            String[] p = {
//                    req.getParameter("id")
//            };
//            List<RouteBean> routeBeans = SqlHelper.doListQuery(sql,p,RouteBean.class);
//            if (routeBeans != null) {
//                JSONArray jsonArray = JSONArray.fromObject(routeBeans);
//                return jsonArray.toString();
//            } else {
//                return "";
//            }
//        }
        sql = "select routes.*,admin.name,group_concat(sopts.id order by find_in_set(sopts.id,routes.sites) separator ',') soptid,group_concat(sopts.name order by find_in_set(sopts.id,routes.sites) separator ',') soptname,group_concat(sopts.detail order by find_in_set(sopts.id,routes.sites) separator '----') soptdetail,group_concat(sopts.img order by find_in_set(sopts.id,routes.sites) separator ',') soptimg from routes,sopts,admin where routes.admin=admin.id and find_in_set(sopts.id,routes.sites) group by routes.id order by routes.id desc";
        List<RouteBean> routeBeans = SqlHelper.doListQuery(sql,null,RouteBean.class);
        if (routeBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(routeBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 编辑行程
     * @param req
     * @return
     */
    private Boolean editRoute(HttpServletRequest req) {
        String sql = "update routes set sites=?,times=?,start=?,end=?,sponsor=?,phone=?,price=?,note=? where id=?";
        String[] p = {
                req.getParameter("sites"),
                req.getParameter("times"),
                req.getParameter("start"),
                req.getParameter("end"),
                req.getParameter("sponsor"),
                req.getParameter("phone"),
                req.getParameter("price"),
                req.getParameter("note"),
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除行程
     * @param req
     * @return
     */
    private Boolean delRoute(HttpServletRequest req) {
        String sql = "delete from routes where id=?";
        String[] p = {
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取全部订单
     * @param req
     * @return
     */
    private String getOrder(HttpServletRequest req) {
        String sql = "select orders.*, " +
                "routes.id routeid, " +
                "routes.start, " +
                "routes.end, " +
                "routes.sponsor, " +
                "routes.phone, " +
                "routes.price, " +
                "routes.note, " +
                "group_concat(sopts.id order by find_in_set(sopts.id,routes.sites) separator ',') soptid, " +
                "group_concat(sopts.name order by find_in_set(sopts.id,routes.sites) separator ',') soptname, " +
                "group_concat(sopts.detail order by find_in_set(sopts.id,routes.sites) separator '----') soptdetail, " +
                "group_concat(sopts.img order by find_in_set(sopts.id,routes.sites) separator ',') soptimg, " +
                "users.phone userphone, " +
                "users.name username " +
                "from orders,routes,sopts,users " +
                "where orders.user = users.id " +
                "and orders.route=routes.id " +
                "and find_in_set(sopts.id,routes.sites) " +
                "group by routes.id " +
                "order by orders.id desc";
        List<OrderDetailBean> orderDetailBeans = SqlHelper.doListQuery(sql,null,OrderDetailBean.class);
        if (orderDetailBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(orderDetailBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 获取申诉内容
     * @param req
     * @return
     */
    private String getMessage(HttpServletRequest req) {
        String sql = "select message.*,users.phone,users.name from message,users where message.user=users.id order by message.id desc";
        List<MessageBean> messageBeans = SqlHelper.doListQuery(sql,null,MessageBean.class);
        if (messageBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(messageBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 获取全部用户
     * @param req
     * @return
     */
    private String doGetUser(HttpServletRequest req) {
        String sql = "select * from users order by id desc";
        List<UserBean> userBeans = SqlHelper.doListQuery(sql,null,UserBean.class);
        if (null != userBeans) {
            JSONArray jsonArray = JSONArray.fromObject(userBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 修改用户资料
     * @param req
     * @return
     */
    private Boolean doEditUser(HttpServletRequest req) {
        String sql = "update users set name=?,pwd=? where id=?";
        String[] p = {
                req.getParameter("name"),
                Base64Util.encode(req.getParameter("pwd")),
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取管理员列表
     * @return
     */
    private String doAdminGetAdmin() {
        String sql = "select * from admin where power=1 order by id desc";
        List<AdminBean> adminBeanList = SqlHelper.doListQuery(sql,null,AdminBean.class);
        if (adminBeanList != null) {
            JSONArray jsonArray = JSONArray.fromObject(adminBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加管理员
     * @param req
     * @return
     */
    private Boolean doAdminAddAdmin(HttpServletRequest req){
        //判断是否已经注册
        String sql_c = "select * from admin where acount=?";
        String[] p_c = {req.getParameter("acount")};
        AdminBean adminBean = SqlHelper.doObjQuery(sql_c,p_c,AdminBean.class);
        if (adminBean != null) {
            return false;
        } else {
            String sql = "insert into admin(acount,name,pwd) values(?,?,?)";
            String[] p = {req.getParameter("acount"),req.getParameter("name"),Base64Util.encode(req.getParameter("pwd"))};
            int result = SqlHelper.doUpdate(sql,p);
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 编辑管理
     * @param req
     * @return
     */
    private Boolean doAdminEditAdmin(HttpServletRequest req) {
        String sql = "update admin set name=?,pwd=? where id=?";
        String[] p = {req.getParameter("name"),Base64Util.encode(req.getParameter("pwd")),req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除管理员
     * @param req
     * @return
     */
    private Boolean doAdminDelAdmin(HttpServletRequest req) {
        String sql = "delete from admin where id=?";
        String[] p = {req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }
}
