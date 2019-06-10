package com.main.back;

import com.main.bean.*;
import com.main.utils.SqlHelper;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import static com.main.utils.ConstUtil.*;

/**
 * @author 邓建豪
 * @date 2019/04/06
 * @describe 搜索页后台
 */
@WebServlet(name="search",urlPatterns="/search")
public class Search extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/view/search.jsp").forward(req,resp);
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
                case ACTION_SERACH:
                    printWriter.print(doSearch(req));
                    break;
                case ACTION_SERACH_GET_ROUTE:
                    printWriter.print(doGetRoute(req));
                    break;
                case ACTION_SEARCH_CHECK_ROUTE:
                    printWriter.print(doCheckRoute(req));
                    break;
                case ACTION_SEARCH_ADD_ORDER:
                    printWriter.print(doAddOrder(req));
                    break;
                case ACTION_SEARCH_GET_ORDER:
                    printWriter.print(doGetOrder(req));
                    break;
                case ACTION_SERACH_ADD_COM:
                    printWriter.print(doAddCom(req));
                    break;
                case ACTION_SERACH_ADD_MESSAGE:
                    printWriter.print(doAddMessage(req));
                    break;
                case ACTION_SEARCH_DEL_ORDER:
                    printWriter.print(doDelOrder(req));
                    break;
            }
        }
    }

    /**
     * 搜索景点
     * @param req
     * @return
     */
    private String doSearch(HttpServletRequest req) {
        List<SearchBean> searchBeans = new ArrayList<SearchBean>();
        //获取查询的景点信息
        String sopts_sql = "select * from sopts where name like ? or ? like CONCAT('%',name,'%') order by id desc";
        String[] sopts_p = {
                "%" + req.getParameter("key") + "%",
                req.getParameter("key")
        };
        List<SoptBean> soptBeans = SqlHelper.doListQuery(sopts_sql,sopts_p,SoptBean.class);
        //数据校验
        if (soptBeans != null && soptBeans.size()>0) {
            //循环遍历景点，获取数据
            for (SoptBean soptBean:soptBeans) {
                //获取景点评价
                String comm_sql = "select comments.*,users.name from comments,users where sopt=? and comments.user=users.id order by id desc";
                String[] comm_p = {
                        String.valueOf(soptBean.getId())
                };
                List<CommBean> commBeans = SqlHelper.doListQuery(comm_sql,comm_p,CommBean.class);
                //获取景点行程
                String route_sql = "select routes.* from sopts,routes where find_in_set(sopts.id,routes.sites) and sopts.id=? group by routes.id order by routes.id desc";
                String[] route_p = {
                        String.valueOf(soptBean.getId())
                };
                List<RouteBean> routeBeans = SqlHelper.doListQuery(route_sql,route_p,RouteBean.class);
                //数据填充
                SearchBean searchBean = new SearchBean();
                searchBean.setSoptBean(soptBean);
                searchBean.setCommBeans(commBeans);
                searchBean.setRouteBeans(routeBeans);
                searchBeans.add(searchBean);
            }
            JSONArray jsonArray = JSONArray.fromObject(searchBeans);
            return jsonArray.toString();
        } else {
            //没有查找到任何结果
            return "";
        }
    }

    /**
     * 获取行程详情
     * @param req
     * @return
     */
    private String doGetRoute(HttpServletRequest req) {
        String sql = "select routes.*,admin.name,group_concat(sopts.id order by find_in_set(sopts.id,routes.sites) separator ',') soptid,group_concat(sopts.name order by find_in_set(sopts.id,routes.sites) separator ',') soptname,group_concat(sopts.detail order by find_in_set(sopts.id,routes.sites) separator '----') soptdetail,group_concat(sopts.img order by find_in_set(sopts.id,routes.sites) separator ',') soptimg from routes,sopts,admin where routes.admin=admin.id and find_in_set(sopts.id,routes.sites) and routes.id=? group by routes.id";
        String[] p = {
                req.getParameter("id")
        };
        RouteBean routeBean = SqlHelper.doObjQuery(sql,p,RouteBean.class);
        if (routeBean != null) {
            JSONObject jsonObject = JSONObject.fromObject(routeBean);
            return jsonObject.toString();
        } else {
            return "";
        }
    }

    /**
     * 校验是否已经加入该行程
     * @param req
     * @return
     */
    private Boolean doCheckRoute(HttpServletRequest req) {
        String sql = "select * " +
                "from orders " +
                "where route=? " +
                "and user=?";
        String[] p = {
                req.getParameter("route"),
                req.getParameter("user")
        };
        OrderBean orderBean = SqlHelper.doObjQuery(sql,p,OrderBean.class);
        if (orderBean != null) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 加入行程
     * @param req
     * @return
     */
    private Boolean doAddOrder(HttpServletRequest req) {
        String sql = "insert into orders(route,user,time) values(?,?,?)";
        String[] p = {
                req.getParameter("route"),
                req.getParameter("user"),
                req.getParameter("time")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 獲取我的行程
     * @param req
     * @return
     */
    private String doGetOrder(HttpServletRequest req) {
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
                "group_concat(sopts.img order by find_in_set(sopts.id,routes.sites) separator ',') soptimg " +
                "from orders,routes,sopts " +
                "where orders.user=? " +
                "and orders.route=routes.id " +
                "and find_in_set(sopts.id,routes.sites) " +
                "group by routes.id "+
                "order by orders.id desc";
        String[] p = {
                req.getParameter("user")
        };
        List<OrderDetailBean> orderDetailBeans = SqlHelper.doListQuery(sql,p,OrderDetailBean.class);
        if (orderDetailBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(orderDetailBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 評價行程
     * @param req
     * @return
     */
    private Boolean doAddCom(HttpServletRequest req) {
        String sopts[] = req.getParameter("sopt").split(",");
        for (String sopt:sopts) {
            String sql = "insert into comments(detail,user,sopt,time) values(?,?,?,?)";
            String p[] = {
                    req.getParameter("detail"),
                    req.getParameter("user"),
                    sopt,
                    req.getParameter("time"),
            };
            SqlHelper.doUpdate(sql,p);
        }
        return true;
    }

    /**
     * 申诉
     * @param req
     * @return
     */
    private Boolean doAddMessage(HttpServletRequest req) {
        String sql = "insert into message(detail,user,time) values(?,?,?)";
        String p[] = {
                req.getParameter("detail"),
                req.getParameter("user"),
                req.getParameter("time"),
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 取消行程
     * @param req
     * @return
     */
    private Boolean doDelOrder(HttpServletRequest req) {
        String sql = "update orders set state=1 where id=?";
        String p[] = {
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
