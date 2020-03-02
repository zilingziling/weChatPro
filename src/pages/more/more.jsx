import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Dial from '../dial/dial'
import './more.styl'

import long from '../../assets/bg3.png'

import phone from '../../assets/phone.png'
import video from '../../assets/video.png'

class More extends Component {
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
      <View className='moreWrapper'>
        <Image className='long' src={long}/>
        <Dial/>
      </View>
    );
  }
}

export default More;
