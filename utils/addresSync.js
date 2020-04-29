/**
 * 获取设置信息
 * @returns {Promise<unknown>}
 */
export const getSetting = ()=>{
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success(res){
                resolve(res)
            },
            fail(err){
                reject(err)
            }
        })
    })
}
/**
 * 获取地址信息
 * @returns {Promise<unknown>}
 */
export const chooseAddress = ()=>{
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success(res){
                resolve(res)
            },
            fail(err){
                reject(err)
            }
        })
    })
}
/**
 * 诱导用户打开权限
 * @returns {Promise<unknown>}
 */
export const openSetting = ()=>{
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success(res){
                resolve(res)
            },
            fail(err){
                reject(err)
            }
        })
    })
}