//index.js
//获取应用实例
const app = getApp()

import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    cateList:[],
    floorList:[],//楼层数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getSwiperList();
    this.getGateList();
    this.getFloorList();
  },
  //获取轮播图数据
  async getSwiperList(){
    const {data:swiper} = await request({
      url: '/home/swiperdata',
    })
    this.setData({
      swiperList:swiper.message
    })
  },
  //获取导航数据
  async getGateList(){
    const {data:cate} = await request({
      url: '/home/catitems',
    })
    this.setData({
      cateList:cate.message
    })
  },
  //获取楼层数据
  async getFloorList(){
    const {data:floor} = await request({
      url:'/home/floordata'
    })
    if (floor.meta.status == 200){
      this.setData({
        floorList:floor.message
      })
    }
  },

})