import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { connect } from "@tarojs/redux";
import './form.styl'



class Form extends Component {
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
      <View className='formWraper'>
          <Text className='info'>欢迎您的光临！</Text>
        <Text className='info'>通过嘉寓天幕线上展厅留言</Text>
        <Text className='info'>到店即可独享5000元购房抵用券</Text>
        <AtForm
        >
          <AtInput
            name='value'
            title='文本'
            type='text'
            placeholder='单行文本'
          />
        </AtForm>
      </View>
    );
  }
}

export default Form;
