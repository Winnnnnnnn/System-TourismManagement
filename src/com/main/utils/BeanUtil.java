package com.main.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.List;

/**
 * @author 邓建豪
 * @date 2019/01/04
 * @describe 将数据库查询结果的ResultSet填充到Bean中
 */
public class BeanUtil {
    /**
     * 将“多条”数据库查询结果填充到指定Bean集合中
     * @param bean
     * @param rs
     * @return
     */
    public static <T> List<T> getList(Class<T> bean, ResultSet rs) {
        //参数类型（Int String 等）
        Field field = null;
        //转换后的结果集
        List<T> list = new ArrayList<T>();
        try {
            //获取ResultSet的列名
            ResultSetMetaData rsmd = rs.getMetaData();
            //获取列数
            int counts = rsmd.getColumnCount();
            // 定义counts个String 变量(存储列名)
            String[] columnNames = new String[counts];
            // 给每个变量赋值(字段名称全部转换成小写)
            for (int i = 0; i < counts; i++) {
                columnNames[i] = rsmd.getColumnLabel(i + 1).toLowerCase();
            }
            //开始遍历ResultSet
            while (rs.next()) {
                T t = bean.newInstance();
                //反射，从ResultSet绑定到Bean
                for (int i = 0; i < counts; i ++) {
                    //设置参数类型，应与Bean中的一致
                    field = bean.getDeclaredField(columnNames[i]);
                    //获取Bean属性类型
                    Class<?> beanType = field.getType();
                    //根据rs列名，组装jBean里边的其中一个set方法，object 就是数据库第一行第一列的数据了
                    Object value = rs.getObject(columnNames[i]);
                    //判断值是否有效
                    if (value != null) {
                        //获取数据库字段的类型
                        Class<?> dbType = value.getClass();
                        //处理日期类型不匹配问题
                        if (dbType == java.sql.Timestamp.class
                                && beanType == java.util.Date.class) {
                            value = new java.util.Date(
                                    ((java.sql.Timestamp) value).getTime());
                        }
                        // 处理double类型不匹配问题
                        if (dbType == java.math.BigDecimal.class
                                && beanType == double.class) {
                            value = new Double(value.toString());
                        }
                        // 处理int类型不匹配问题
                        if (dbType == java.math.BigDecimal.class
                                && beanType == int.class) {
                            value = new Integer(value.toString());
                        }
                    }
                    //Bean中的Set方法
                    String setMethodName = "set"
                            + firstUpperCase(columnNames[i]);
                    //第一个参数是传进去的方法名称，第二个参数是 传进去的类型；
                    Method m = t.getClass().getMethod(setMethodName, beanType);
                    //第二个参数是传给set方法数据；如果是get方法可以不写
                    m.invoke(t, value);
                }
                list.add(t);
            }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return null;
        }
        return list;
    }

    /**
     * 将“单条”数据库查询结果填充到指定Bean中
     * @param bean
     * @param rs
     * @return
     */
    public static <T> T getObj(Class<T> bean, ResultSet rs) {
        Field field = null;
        //转换后的Bean
        T obj = null;
        try {
            //获取ResultSet的列名
            ResultSetMetaData rsmd = rs.getMetaData();
            //获取列数
            int counts = rsmd.getColumnCount();
            // 定义counts个String 变量(存储列名)
            String[] columnNames = new String[counts];
            // 给每个变量赋值(字段名称全部转换成小写)
            for (int i = 0; i < counts; i++) {
                columnNames[i] = rsmd.getColumnLabel(i + 1).toLowerCase();
            }
            //开始遍历ResultSet
            if (rs.next()) {
                T t = bean.newInstance();
                //反射，从ResultSet绑定到Bean
                for (int i = 0; i < counts; i ++) {
                    //设置参数类型，应与Bean中的一致
                    field = bean.getDeclaredField(columnNames[i]);
                    //获取Bean属性类型
                    Class<?> beanType = field.getType();
                    //根据rs列名，组装jBean里边的其中一个set方法，object 就是数据库第一行第一列的数据了
                    Object value = rs.getObject(columnNames[i]);
                    //判断值是否有效
                    if (value != null) {
                        //获取数据库字段的类型
                        Class<?> dbType = value.getClass();
                        //处理日期类型不匹配问题
                        if (dbType == java.sql.Timestamp.class
                                && beanType == java.util.Date.class) {
                            value = new java.util.Date(
                                    ((java.sql.Timestamp) value).getTime());
                        }
                        // 处理double类型不匹配问题
                        if (dbType == java.math.BigDecimal.class
                                && beanType == double.class) {
                            value = new Double(value.toString());
                        }
                        // 处理int类型不匹配问题
                        if (dbType == java.math.BigDecimal.class
                                && beanType == int.class) {
                            value = new Integer(value.toString());
                        }
                    }
                    //Bean中的Set方法
                    String setMethodName = "set"
                            + firstUpperCase(columnNames[i]);
                    //第一个参数是传进去的方法名称，第二个参数是 传进去的类型；
                    Method m = t.getClass().getMethod(setMethodName, beanType);
                    //第二个参数是传给set方法数据；如果是get方法可以不写
                    m.invoke(t, value);
                }
                obj = t;
            }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return null;
        }
        return obj;
    }

    /**
     * 字符串首个字母变大写
     * @param old
     * @return
     */
    public static String firstUpperCase(String old) {
        return old.substring(0, 1).toUpperCase() + old.substring(1);
    }
}
