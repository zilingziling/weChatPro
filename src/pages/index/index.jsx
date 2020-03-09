import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import ClientIndex from '../../components/clicentIndex/clientIndex'
import  ServerIndex from '../../components/serverIndex/serverIndex'
import {AtMessage  } from "taro-ui";
import './index.scss'
import api from '../../service/api'

class Index extends Component {
  config = {
    navigationBarTitleText: "嘉寓天幕线上展厅"
  };
  state={
    isServer:''
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentDidMount(){
    const that=this

    wx.login({
      success (res) {
        if (res.code) {
          // 发起网络请求
          api.get('/auth/token', {js_code:res.code}).then(res=>{
           if(res.data.result){
             wx.setStorageSync('token', res.data.data.accessToken)
             wx.setStorageSync('openid', res.data.data.openid)
             wx.setStorageSync('sessionKey', res.data.data.sessionKey)
             api.get('/auth/current').then(r=>{
               if(r.data.result){
                 wx.setStorageSync('customer', r.data.data.customer)
                 wx.setStorageSync('server', r.data.data.server)
                 that.setState({
                   isServer:r.data.data.server
                 })
               }else {
                 Taro.atMessage({
                   'message': '网络错误，请退出后重试！',
                   'type': 'error',
                   'duration':3000
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
    console.log(this.state.isServer)
    return (
    <View>
      {/*<ClientIndex />*/}
      <AtMessage />
      {this.state.isServer==='TRUE' ? <ServerIndex /> :this.state.isServer==='FALSE' ? <ClientIndex />:null}
    </View>
    )
  }
}

export default Index;
