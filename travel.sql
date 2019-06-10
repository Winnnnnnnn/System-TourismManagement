/*
Navicat MySQL Data Transfer

Source Server         : 本地连接
Source Server Version : 50620
Source Host           : localhost:3306
Source Database       : travel

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2019-06-11 00:03:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员编号',
  `name` varchar(255) NOT NULL COMMENT '管理员姓名',
  `acount` varchar(255) NOT NULL COMMENT '管理员账号',
  `pwd` varchar(255) NOT NULL COMMENT '管理员密码',
  `power` int(11) NOT NULL DEFAULT '1' COMMENT '管理员权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'admin', 'YWRtaW4=', '0');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论编号',
  `detail` text NOT NULL COMMENT '评论详情',
  `user` int(11) DEFAULT NULL COMMENT '用户id',
  `sopt` int(11) DEFAULT NULL COMMENT '景点id',
  `time` varchar(255) NOT NULL COMMENT '评论时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '留言编号',
  `detail` text NOT NULL COMMENT '留言详情',
  `user` int(11) NOT NULL COMMENT '用户编号',
  `time` varchar(255) NOT NULL COMMENT '留言时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '公告编号',
  `detail` text NOT NULL COMMENT '公告详情',
  `time` varchar(255) NOT NULL COMMENT '公告时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单编号',
  `route` int(11) NOT NULL COMMENT '行程编号',
  `user` int(11) NOT NULL COMMENT '用户编号',
  `time` varchar(255) NOT NULL COMMENT '订单时间',
  `state` int(11) NOT NULL DEFAULT '0' COMMENT '订单状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for routes
-- ----------------------------
DROP TABLE IF EXISTS `routes`;
CREATE TABLE `routes` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '行程编号',
  `sites` text NOT NULL COMMENT '行程景点列表',
  `times` text NOT NULL COMMENT '行程时间集合',
  `start` varchar(255) NOT NULL COMMENT '行程启动时间',
  `end` varchar(255) NOT NULL COMMENT '行程结束时间',
  `sponsor` varchar(255) NOT NULL COMMENT '旅行社名称',
  `price` varchar(255) NOT NULL COMMENT '行程价格',
  `note` text NOT NULL COMMENT '行程说明',
  `phone` varchar(255) NOT NULL COMMENT '联系电话',
  `admin` int(11) NOT NULL COMMENT '管理员编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of routes
-- ----------------------------

-- ----------------------------
-- Table structure for sopts
-- ----------------------------
DROP TABLE IF EXISTS `sopts`;
CREATE TABLE `sopts` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '景点编号',
  `name` varchar(255) NOT NULL COMMENT '景点名称',
  `detail` text NOT NULL COMMENT '景点介绍',
  `img` text NOT NULL COMMENT '景点图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sopts
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `name` varchar(255) NOT NULL COMMENT '用户姓名',
  `phone` varchar(255) NOT NULL COMMENT '用户手机号',
  `pwd` varchar(255) NOT NULL COMMENT '用户密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
