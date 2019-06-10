package com.main.utils;

import sun.misc.BASE64Decoder;

import java.io.UnsupportedEncodingException;

/**
 * @author 邓建豪
 * @date 2019/01/03
 * @describe Base64加密解密工具
 */
public class Base64Util {
    /**
     * Base64加密
     * @param s
     * @return
     */
    public static String encode(String s) {
        if (s == null)
            return null;
        String res = "";
        try {
            res = new sun.misc.BASE64Encoder().encode(s.getBytes("GBK"));
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return res;
    }

    /**
     * Base64解密
     * @param s
     * @return
     */
    public static String decode(String s) {
        if (s == null)
            return null;
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            byte[] b = decoder.decodeBuffer(s);
            return new String(b,"GBK");
        } catch (Exception e) {
            return null;
        }
    }
}
