package com.main.bean;

import java.util.List;

/**
 * @author 邓建豪
 * @date 2019/04/06
 * @describe 搜索Bean
 */
public class SearchBean {
    SoptBean soptBean;
    List<CommBean> commBeans;
    List<RouteBean> routeBeans;

    public SearchBean() {
    }

    public SoptBean getSoptBean() {
        return soptBean;
    }

    public void setSoptBean(SoptBean soptBean) {
        this.soptBean = soptBean;
    }

    public List<CommBean> getCommBeans() {
        return commBeans;
    }

    public void setCommBeans(List<CommBean> commBeans) {
        this.commBeans = commBeans;
    }

    public List<RouteBean> getRouteBeans() {
        return routeBeans;
    }

    public void setRouteBeans(List<RouteBean> routeBeans) {
        this.routeBeans = routeBeans;
    }
}
