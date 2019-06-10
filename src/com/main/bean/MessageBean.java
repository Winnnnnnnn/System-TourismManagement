package com.main.bean;

/**
 * @Author: 邓建豪
 * @Date: Create in 2:13 2019/4/20
 * @Description: 申诉留言Bean
 */
public class MessageBean {
    private int id;
    private String detail;
    private int user;
    private String time;
    private String phone;
    private String name;

    public MessageBean() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
