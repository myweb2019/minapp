// pages/goods_list/goods_list.js
import {request} from "../../request/index";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabsList: [
            {
                id: "0",
                name: '综合',
                isActive: true
            },
            {
                id: "1",
                name: '销量',
                isActive: false
            },
            {
                id: "2",
                name: '价格',
                isActive: false
            },
        ],
        //商品列表数据
        goodsList:[]
    },
    //接口需要的参数
    QueryParams: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },
    //总页数
    totalNum:1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryParams.cid = options.cid
        this.getGoodsList()
    },
    changeItem(ev) {
        const index = ev.detail.index
        const tabsList = JSON.parse(JSON.stringify(this.data.tabsList))
        tabsList.forEach((item, i) => {
            if (i === index) {
                return item.isActive = true
            } else {
                return item.isActive = false
            }
        })
        this.setData({
            tabsList
        })
    },
    //获取商品的列表数据
    async getGoodsList() {
        const {data: GoodsList} = await request({
            url:'/goods/search',
            data:this.QueryParams
        })
        if (GoodsList.meta.status == 200){
            //获取总页数
            const total = GoodsList.message.total
            //计算总页数
            this.totalNum = Math.ceil(total/this.QueryParams.pagesize)
            this.setData({
                //拼接数组
                goodsList:[...this.data.goodsList,...GoodsList.message.goods]
            })
            //关闭下拉刷新
            wx.stopPullDownRefresh()
        }
    },
    //监听上拉加载数据
    onReachBottom(){
        //判断是否有下一页数据
        if (this.QueryParams.pagenum>=this.totalNum){
            wx.showToast({
                title: '没有更多数据了！',
                icon:"none"
            })
        }else {
            this.QueryParams.pagenum++
            this.getGoodsList()
        }
    },
    //下拉刷新
    onPullDownRefresh(){
        //重置数据列表
        this.setData({
            goodsList:[]
        })
        //设置重置pagenum，防止用户先上拉，再刷新
        this.QueryParams.pagenum = 1
        //发起请求
        this.getGoodsList()
    }

})