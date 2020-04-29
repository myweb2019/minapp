// pages/cart/cart.js
import {getSetting, chooseAddress, openSetting} from "../../utils/addresSync";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //点击 获取收货地址流程
  async handlechooseAddress(){
    //查看设置里面打开的权限
    // wx.getSetting({
    //   success (res) {
    //     const scopeAddress = res.authSetting["scope.address"]
    //     //判读权限是否打开
    //     if (scopeAddress===true||scopeAddress===undefined){
    //       wx.chooseAddress({
    //         success (res) {
    //         }
    //       })
    //     }else {
    //       //没有就醒用户打开权限
    //       //用户拒绝权限后提醒用户打开权限
    //       wx.openSetting({
    //         success(res){
    //           wx.chooseAddress({
    //             success (res) {
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    //es6改造

    try {//抛出异常，promise返回错误的消息
      //查看设置里面打开的权限
      let res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      //判读权限是否打开
      if (scopeAddress === false) await openSetting();
      //没有就醒用户打开权限
      //用户拒绝权限后提醒用户打开权限
      const res2 = await chooseAddress()
      //将相关信息存入本地
      wx.setStorageSync('address',res2)
    }catch (e) {
      console.log(e)
    }
  }
})