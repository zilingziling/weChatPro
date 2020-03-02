import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import './dial.styl'

import phone from '../../assets/phone.png'
import video from '../../assets/video.png'
class Dial extends Component {
  config = {
    navigationBarTitleText: "嘉寓天幕线上展厅"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='dialWrapper'>
       
          <Text className='ask'>嘉寓天幕欢迎您的光临</Text>
          <Text className='ask'>您想咨询哪方面问题？</Text>
      
        <View className='ope'>
          <Image className='img' src={video} />
          <Image className='img' src={phone}/>
        </View>
        <Text className='time'>服务时间：am9:00-pm18:00</Text>
      </View>
    );
  }
}

export default Dial;
