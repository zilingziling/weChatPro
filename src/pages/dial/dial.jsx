import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Contact from '../../components/contact/dialComponent'

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
      <Contact />
    );
  }
}

export default Dial;
