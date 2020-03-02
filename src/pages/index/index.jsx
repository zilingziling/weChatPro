import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";

import "./index.styl";

import a from "../../assets/A88.jpg";
import a1 from "../../assets/A1.jpg";
import b from "../../assets/B.jpg";
import b1 from "../../assets/B1.jpg";
import c from "../../assets/C.jpg";
import c1 from "../../assets/C1.jpg";
import e from "../../assets/E.jpg";
import e1 from "../../assets/E1.jpg";
import f from "../../assets/F.jpg";
import f1 from "../../assets/F1.jpg";


class Index extends Component {
  config = {
    navigationBarTitleText: "嘉寓天幕线上展厅"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

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
        <View className="toSec">
          <Text className="click" onClick={this.toDial}>点击进入接待</Text>
        </View>
        <View className="toMore">
          <Text className="more" onClick={this.toMore}>项目精述 · 查看更多</Text>
        </View>
        <Swiper
          className="swiper"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
        >
          <SwiperItem className="swiperItem">
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src={a} />
              </View>
              <Text className="type">二室二厅一卫</Text>
              <Text className="p">建筑面积：约88㎡</Text>
            </View>
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src={a1} />
              </View>
              <Text className="type">一室二厅一卫</Text>
              <Text className="p">建筑面积：约69.5㎡</Text>
            </View>
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src={b} />
              </View>
              <Text className="type">一室二厅一卫</Text>
              <Text className="p">建筑面积：约68㎡</Text>
            </View>
          </SwiperItem>
          <SwiperItem className="swiperItem">
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src={b1} />
              </View>
              <Text className="type">一室二厅一卫</Text>
              <Text className="p">建筑面积：约53.49㎡</Text>
            </View>
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src={c} />
              </View>
              <Text className="type">一室一厅一卫</Text>
              <Text className="p">建筑面积：约43㎡</Text>
            </View>
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src={c1} />
              </View>
              <Text className="type">一室一厅一卫</Text>
              <Text className="p">建筑面积：约47㎡</Text>
            </View>
          </SwiperItem>
          <SwiperItem className="swiperItem">
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src={e} />
              </View>
              <Text className="type">一室一厅一卫</Text>
              <Text className="p">建筑面积：约36㎡</Text>
            </View>
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src={e1} />
              </View>
              <Text className="type">一室一厅一卫</Text>
              <Text className="p">建筑面积：约28㎡</Text>
            </View>
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src={f} />
              </View>
              <Text className="type">一室一厅一卫</Text>
              <Text className="p">建筑面积：约40㎡</Text>
            </View>
          </SwiperItem>
          <SwiperItem className="swiperItem">
            <View className="item">
              <View className="imgWraper">
                <Image className="img" src={f1} />
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
