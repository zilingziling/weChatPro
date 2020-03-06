import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import "./dial.styl";
import api from '../../service/api'
import {throttle} from '../../utils/func'
 class Contact extends Component {
  toForm=throttle(()=>{
    api.get('/customers/status').then(r=>{
      if(r.data.result){
        if(r.data.data.saved){
          Taro.navigateTo({
            url: '/pages/video/video'
          })
        }else {
          Taro.navigateTo({
            url: '/pages/form/form'
          })
        }
      }
    })
  },3000)
   getPhoneNumber=(e)=>{
    console.log(e.detail)
     if (e.detail.errMsg == "getPhoneNumber:ok") {
       api.put('/customers/phones',{
         encryptedData:e.detail.encryptedData,
         iv: e.detail.iv,
       }).then(r=>{
         if(r.data.result){
           wx.makePhoneCall({
             phoneNumber: '028-83355997'
           })
         }else {
           Taro.atMessage({
             'message': r.data.message+',请稍后再试！',
             'type': 'error',
           })
         }
       })

     }

  }
  render() {
    return (
      <View className="dialWrapper">
        <Text className="ask">嘉寓天幕欢迎您的光临</Text>
        <Text className="ask">您想咨询哪方面问题？</Text>

        <View className="ope">
          <Image className="img" src='http://39.98.67.142/assets/video.jpg' onClick={this.toForm}/>
          {/*<Image className="img" src='http://39.98.67.142/assets/phone.jpg'  />*/}

          <Button   openType="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>
          </Button>
        </View>
        <Text className="time">服务时间：am9:00-pm18:00</Text>
      </View>
    );
  }
}

export default Contact;
