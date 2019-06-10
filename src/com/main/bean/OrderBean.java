package com.main.bean;

/**
 * @Author: 邓建豪
 * @Date: Create in 20:52 2019/4/19
 * @Description: 订单Bean
 */
public class OrderBean {
    private int id;
    private int route;
    private int user;
    private String time;
    private int state;

    public OrderBean() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRoute() {
        return route;
    }

    public void setRoute(int route) {
        this.route = route;
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }
}
