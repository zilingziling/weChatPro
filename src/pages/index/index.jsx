import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import ClientIndex from '../../components/clicentIndex/clientIndex'
import  ServerIndex from '../../components/serverIndex/serverIndex'
import "./index.styl";

import api from '../../service/api'

class Index extends Component {
  config = {
    navigationBarTitleText: "嘉寓天幕线上展厅"
  };
  state={
    server:null
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentDidMount(){
    wx.login({
      success (res) {
        if (res.code) {
          // 发起网络请求
         api.get('/auth/token', {js_code:res.code}).then(res=>{
           if(res.data.result){
             wx.setStorageSync('token', res.data.data.accessToken)
             api.get('/auth/current').then(r=>{
               if(r.data.result){
                 wx.setStorageSync('customer', Boolean.parseBoolean(r.data.data.customer))
                 wx.setStorageSync('server', Boolean.parseBoolean(r.data.data.server))
                 this.setState({
                   server:Boolean.parseBoolean(r.data.data.server)
                 })
               }
             })
           }
         })
        } else {
          console.log(res.errMsg)
        }
      }
    })

  }

  componentDidHide() {}


  render() {
    console.log(this.state.server)
    return (
      <View>
        {
          this.state.server?<ServerIndex/>:<ClientIndex/>
        }
      </View>
    );
  }
}

export default Index;
