// pages/category/category.js
import {request} from "../../request/index.js";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        //左侧的菜单数据
        leftMenuList: [],
        //右侧的商品数据
        rightContent: [],
        //接口的返回值数据
        Cates: [],
        //被点击左侧的菜单
        currentIndex: 0,
        //设置顶部的距离
        scrollTop:0,
    },
    //获取分类数据
    async getCates() {
        const {data: categories} = await request({
            url: '/categories'
        })
        if (categories.meta.status == 200) {
            //把数据存入本地
            wx.setStorageSync('cates',{time:Date.now(),data:categories.message})
            //接口的返回值数据
            this.setData({
                Cates: categories.message
            })
            //左侧的菜单数据
            let leftMenuList = categories.message.map(v => {
                return v.cat_name
            })
            //右侧商品数据
            let rightContent = categories.message[0].children
            this.setData({
                leftMenuList,
                rightContent

            })
        }
    },
    //点击左侧菜单获取相应数据
    handleItemTap(ev) {
        //点击的第几个
        const index = ev.currentTarget.dataset.index
        //右侧商品数据
        let rightContent = this.data.Cates[index].children
        this.setData({
            currentIndex: index,
            rightContent,
            //重新设置右边距离顶部距离
            scrollTop:0
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取本地存储的数据
        const cate = wx.getStorageSync('cates')
        if (!cate) {
            this.getCates()
        }else {
           //判断时间是否过期
           if(Date.now()-cate.time>1000*300){
               this.getCates()
           } else {
               this.setData({
                   Cates:cate.data
               })
               //左侧的菜单数据
               let leftMenuList = this.data.Cates.map(v => {
                   return v.cat_name
               })
               //右侧商品数据
               let rightContent = this.data.Cates[0].children
               this.setData({
                   leftMenuList,
                   rightContent
               })
           }
        }
    },

})