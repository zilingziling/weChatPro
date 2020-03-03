import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import "./dial.styl";

class Contact extends Component {
  toForm(){
    Taro.navigateTo({
      url: '/pages/form/form'
    })
  }
  render() {
    return (
      <View className="dialWrapper">
        <Text className="ask">嘉寓天幕欢迎您的光临</Text>
        <Text className="ask">您想咨询哪方面问题？</Text>

        <View className="ope">
          <Image className="img" src='http://39.98.67.142/assets/video.jpg' onClick={this.toForm}/>
          <Image className="img" src='http://39.98.67.142/assets/phone.jpg' />
        </View>
        <Text className="time">服务时间：am9:00-pm18:00</Text>
      </View>
    );
  }
}

export default Contact;
