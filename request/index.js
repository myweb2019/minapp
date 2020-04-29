//同时发送代码的次数
let ajaxnum = 0;
export const request = (params)=>{
    ajaxnum++;
    wx.showLoading({
        title:'加载中',
        mask:true
    })
    return new Promise((resolve, reject) => {
        const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err)
            },
            complete:()=>{
                ajaxnum--;
                if (ajaxnum===0){
                    //关闭加载对话框
                    wx.hideLoading()
                }
            }
        })
    })
}