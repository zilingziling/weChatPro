import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import './more.styl'
import Contact from '../../components/contact/dialComponent'

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
        <Image className='long' src='http://39.98.67.142/assets/bg3.jpg'/>
        <Contact/>
      </View>
    );
  }
}

export default More;
