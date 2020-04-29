// pages/goods_detail/goods_detail.js
import {request} from "../../request/index.js";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        //商品详情数据
        goodsObj: {}
    },
    GoodInfo: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const goods_id = options.goods_id
        this.getGoodsDetail(goods_id)
    },
    //商品详情数据
    async getGoodsDetail(goods_id) {
        const {data: DetailData} = await request({
            url: '/goods/detail',
            data: {goods_id}
        })
        this.GoodInfo = DetailData.message
        if (DetailData.meta.status == 200) {
            this.setData({
                goodsObj: {
                    pics: DetailData.message.pics,
                    goods_price: DetailData.message.goods_price,
                    goods_name: DetailData.message.goods_name,
                    goods_introduce: DetailData.message.goods_introduce.replace(/\.webp/g, '.jpg')
                }
            })
        }
    },
    handlePrevewImage(ev) {
        const {url} = ev.currentTarget.dataset
        const urls = this.GoodInfo.pics.map(v => v.pics_mid)
        wx.previewImage({
            current: url,// 当前显示图片的http链接
            urls: urls// 需要预览的图片http链接列表
        })
    },
    //加入购物车
    handlCartadd(){
       //1获取本地存储是否有数据
        let storage = wx.getStorageSync('cart')||[]
        //判断商品是否存在
        let index = storage.findIndex(v=>v.goods_id === this.GoodInfo.goods_id)
        if (index===-1){
            //不存在
            this.GoodInfo.num = 1;
            storage.push(this.GoodInfo)
        }else {
            //存在执行num++
            storage[index].num++;
        }
        //把购物车添加到缓存中
        wx.setStorageSync('cart',storage)
        //弹窗
        wx.showToast({
            title:'加入成功',
            icon:'success',
            mask:true
        })
    }
})