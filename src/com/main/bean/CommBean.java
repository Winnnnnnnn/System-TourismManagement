package com.main.bean;

/**
 * @author 邓建豪
 * @date 2019/04/06
 * @describe 评价Bean
 */
public class CommBean {
    private int id;
    private String detail;
    private int user;
    private int sopt;
    private String time;
    private String name;

    public CommBean() {
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

    public int getSopt() {
        return sopt;
    }

    public void setSopt(int sopt) {
        this.sopt = sopt;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
