package com.main.bean;

/**
 * @author 邓建豪
 * @date 2019/04/06
 * @describe 用户Bean
 */
public class UserBean {
    private int id;
    private String name;
    private String phone;
    private String pwd;

    public UserBean() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
