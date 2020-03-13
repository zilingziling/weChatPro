import Taro from "@tarojs/taro";
import { HTTP_STATUS } from "../utils/status";
import { base } from "./config";
import { logError } from "../utils/error";

let token = "";
export default {
  baseOptions(params, method = "GET") {
    let { url, data } = params;
     token = wx.getStorageSync('token')
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      isShowLoading: false,
      loadingText: "正在加载",
      url: base + url,
      data: data,
      method: method,
      header: token
        ? { "content-type": contentType, Authorization: `Bearer ${token}` }
        : { "content-type": contentType },
      success(res) {
        console.log(res.statusCode)
        if(res.statusCode ===401) {
          wx.login({
            success(resp) {
              if (resp.code) {
                // 发起网络请求
                Taro.request({
                  url: base + '/auth/token',
                  data: {js_code: resp.code},
                  method: 'GET',
                  success(response) {
                    if (response.data.result) {
                      wx.setStorageSync('token', response.data.data.accessToken)
                      wx.setStorageSync('openid', response.data.data.openid)
                      wx.setStorageSync('sessionKey', response.data.data.sessionKey)
                    }
                  }
                })
              }
            }
          })
        }
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError("api", "请求资源不存在");
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError("api", "服务端出现了问题");
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError("api", "没有权限访问");
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data;
        }
      },
        error(e) {
          logError("api", "请求接口出现问题", e);
        }
    };
    return Taro.request(option);
  },
  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  },
  post: function(url, data) {
    let params = { url, data };
    return this.baseOptions(params, "POST");
  },
  put: function(url, data) {
    let params = { url, data };
    return this.baseOptions(params, "PUT");
  },
  del: function(url, data) {
    let params = { url, data };
    return this.baseOptions(params, "DELETE");
  }
};
