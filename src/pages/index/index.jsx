import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";

import "./index.styl";

import api from '../../service/api'

class Index extends Component {
  config = {
    navigationBarTitleText: "嘉寓天幕线上展厅"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentDidMount(){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
         api.get('/auth/token', {js_code:res.code}).then(r=>{
           if(r.data.result){
             wx.setStorage({
               key:"token",
               data:r.data.data.accessToken
             });
           }
         })
        } else {
          console.log(res.errMsg)
        }
      }
    })
  }
  // wx.showToast({
  //                title: '成功',
  //                icon: 'success',
  //                duration: 2000
  //              })
  componentDidHide() {}
  toDial(){
      Taro.navigateTo({
        url: '/pages/dial/dial'
      })
  }
  toMore(){
    Taro.navigateTo({
      url: '/pages/more/more'
    })
  }
  render() {
    return (
      <View className="index">
        <View className="toSec" onClick={this.toDial}>
          <Text className="click" >点击进入接待</Text>
        </View>
        <View className="toMore" onClick={this.toMore}>
          <Text className="more" >项目精述 · 查看更多</Text>
        </View>
        <Swiper
          className="swiper"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem className="swiperItem">
            <View className="item">
              <View className="imgWraper" >
                <Image className="img" src='http://39.98.67.142/assets/A88.jpg' />
              </View>
              <Text className="type">二室二厅一卫</Text>
              <Text className="p">建筑面积：约88㎡</Text>
            </View>
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src='http://39.98.67.142/assets/A1.jpg' />
              </View>
              <Text className="type">一室二厅一卫</Text>
              <Text className="p">建筑面积：约69.5㎡</Text>
            </View>
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src='http://39.98.67.142/assets/B.jpg' />
              </View>
              <Text className="type">一室二厅一卫</Text>
              <Text className="p">建筑面积：约68㎡</Text>
            </View>
          </SwiperItem>
          <SwiperItem className="swiperItem">
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src='http://39.98.67.142/assets/B1.jpg' />
              </View>
              <Text className="type">一室二厅一卫</Text>
              <Text className="p">建筑面积：约53.49㎡</Text>
            </View>
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src='http://39.98.67.142/assets/C.jpg' />
              </View>
              <Text className="type">一室一厅一卫</Text>
              <Text className="p">建筑面积：约43㎡</Text>
            </View>
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src='http://39.98.67.142/assets/C1.jpg' />
              </View>
              <Text className="type">一室一厅一卫</Text>
              <Text className="p">建筑面积：约47㎡</Text>
            </View>
          </SwiperItem>
          <SwiperItem className="swiperItem">
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src='http://39.98.67.142/assets/E.jpg' />
              </View>
              <Text className="type">一室一厅一卫</Text>
              <Text className="p">建筑面积：约36㎡</Text>
            </View>
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src='http://39.98.67.142/assets/E1.jpg' />
              </View>
              <Text className="type">一室一厅一卫</Text>
              <Text className="p">建筑面积：约28㎡</Text>
            </View>
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src='http://39.98.67.142/assets/F.jpg' />
              </View>
              <Text className="type">一室一厅一卫</Text>
              <Text className="p">建筑面积：约40㎡</Text>
            </View>
          </SwiperItem>
          <SwiperItem className="swiperItem">
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src='http://39.98.67.142/assets/F1.jpg' />
              </View>
              <Text className="type">一室一厅一卫</Text>
              <Text className="p">建筑面积：约31㎡</Text>
            </View>
          </SwiperItem>
        </Swiper>
      </View>
    );
  }
}

export default Index;
