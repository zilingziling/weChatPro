import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import { throttle } from "../../utils/func";
import "./index.styl";
import api from "../../service/api";
import {baseUrl} from '../../service/config'
class ClientIndex extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentDidMount() {}

  componentDidHide() {}
  toDial = throttle(() => {
    Taro.navigateTo({
      url: "/pages/dial/dial"
    });
  }, 3000);
  toMore = throttle(() => {
    Taro.navigateTo({
      url: "/pages/more/more"
    });
  }, 3000);
  previewImage = e => {
    wx.previewImage({
      current:baseUrl+"qrcode.png",
      urls: [baseUrl+"qrcode.png"]
    });
  };
  imgView = item => {
    wx.previewImage({
      current: item.src,
      urls: imgList
    });
  };

  render() {
    return (
      <View className="index">
        <View className="toSec" onClick={this.toDial}>
          <Text className="click">点击进入接待</Text>
        </View>
        <View className="toMore" onClick={this.toMore}>
          <Text className="more">项目精述 · 查看更多</Text>
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
            {types1.map((item, index) => (
              <View className="item" key={index}>
                <View onClick={() => this.imgView(item)} className="imgWraper">
                  <Image className="img" src={item.src} />
                </View>
                <Text className="type">{item.name}</Text>
                <Text className="p">{item.area}</Text>
              </View>
            ))}
          </SwiperItem>
          <SwiperItem className="swiperItem">
            {types2.map((item, index) => (
              <View className="item" key={index}>
                <View onClick={() => this.imgView(item)} className="imgWraper">
                  <Image className="img" src={item.src} />
                </View>
                <Text className="type">{item.name}</Text>
                <Text className="p">{item.area}</Text>
              </View>
            ))}
          </SwiperItem>
          <SwiperItem className="swiperItem">
            {types3.map((item, index) => (
              <View className="item" key={index}>
                <View onClick={() => this.imgView(item)} className="imgWraper">
                  <Image className="img" src={item.src} />
                </View>
                <Text className="type">{item.name}</Text>
                <Text className="p">{item.area}</Text>
              </View>
            ))}
          </SwiperItem>
          <SwiperItem className="swiperItem">
            {types4.map((item, index) => (
              <View className="item" key={index}>
                <View onClick={() => this.imgView(item)} className="imgWraper">
                  <Image className="img" src={item.src} />
                </View>
                <Text className="type">{item.name}</Text>
                <Text className="p">{item.area}</Text>
              </View>
            ))}
          </SwiperItem>
        </Swiper>
        <Image
          onClick={this.previewImage}
          src={`${baseUrl}qrcode.png`}
          className="qrcode"
        ></Image>
      </View>
    );
  }
}

export default ClientIndex;
const types1 = [
  {
    name: "二室二厅一卫",
    area: "建筑面积：约88㎡",
    src: `${baseUrl}A88.jpg`
  },
  {
    name: "一室二厅一卫",
    area: "建筑面积：约69.5㎡",
    src: `${baseUrl}A1.jpg`
  },
  {
    name: "一室二厅一卫",
    area: "建筑面积：约68㎡",
    src: `${baseUrl}B.jpg`
  }
];
const types2 = [
  {
    name: "一室二厅一卫",
    area: "建筑面积：约53.49㎡",
    src: `${baseUrl}B1.jpg`
  },
  {
    name: "一室一厅一卫",
    area: "建筑面积：约43㎡",
    src: `${baseUrl}C.jpg`
  },
  {
    name: "一室一厅一卫",
    area: "建筑面积：约47㎡",
    src: `${baseUrl}C1.jpg`
  }
];
const types3 = [
  {
    name: "一室一厅一卫",
    area: "建筑面积：约36㎡",
    src: `${baseUrl}E.jpg`
  },
  {
    name: "一室一厅一卫",
    area: "建筑面积：约28㎡",
    src: `${baseUrl}E1.jpg`
  },
  {
    name: "一室一厅一卫",
    area: "建筑面积：约40㎡",
    src: `${baseUrl}F.jpg`
  }
];
const types4 = [
  {
    name: "一室一厅一卫",
    area: "建筑面积：约31㎡",
    src: `${baseUrl}F1.jpg`
  }
];
const imgList = [
  `${baseUrl}A88.jpg`,
  `${baseUrl}A1.jpg`,
  `${baseUrl}B.jpg`,
  `${baseUrl}B1.jpg`,
  `${baseUrl}C.jpg`,
  `${baseUrl}C1.jpg`,
  `${baseUrl}E.jpg`,
  `${baseUrl}E1.jpg`,
  `${baseUrl}F.jpg`,
  `${baseUrl}F1.jpg`
];
