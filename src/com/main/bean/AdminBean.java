package com.main.bean;

/**
 * @author 邓建豪
 * @date 2019/03/31
 * @describe 管理员信息Bean
 */
public class AdminBean {
    private int id;
    private String name;
    private String acount;
    private String pwd;
    private int power;

    public AdminBean() {
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

    public String getAcount() {
        return acount;
    }

    public void setAcount(String acount) {
        this.acount = acount;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public int getPower() {
        return power;
    }

    public void setPower(int power) {
        this.power = power;
    }
}
