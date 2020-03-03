import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { connect } from "@tarojs/redux";
import classNames from "classnames";
import "./form.styl";

class MyForm extends Component {
  config = {
    navigationBarTitleText: "嘉寓天幕线上展厅"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  state = {
    moneyShow: false,
    wantShow: false,
    money: [
      {
        id: 1,
        value: "50万以内"
      },
      {
        id: 2,
        value: "50~100万"
      },
      {
        id: 3,
        value: "100~150万"
      },
      {
        id: 4,
        value: "150~200万"
      }
    ],
    want: [
      {
        id: 1,
        value: "自住"
      },
      {
        id: 2,
        value: "投资"
      }
    ],
    moneySelect: "",
    wantSelect: "",
    wantId: "",
    moneyId: ""
  };
  handleWant() {
    this.setState({
      wantShow: !this.state.wantShow,
      moneyShow: false
    });
  }
  handleMoney() {
    this.setState({
      moneyShow: !this.state.moneyShow,
      wantShow: false
    });
  }
  onSelectWant(item) {
    this.setState({
      wantSelect: item.value,
      wantShow: false
    });
  }
  onSelectMoney(item) {
    this.setState({
      moneySelect: item.value,
      moneyShow: false
    });
  }
  render() {
    return (
      <View className="formWraper">
        <Text className="info">欢迎您的光临！</Text>
        <Text className="info">通过嘉寓天幕线上展厅留言</Text>
        <Text className="info">到店即可独享5000元购房抵用券</Text>
        <View className="formContent">
          <View className="inputWrapper">
            <View className="title">姓名</View>
            <View className="input">
              <input maxLength="10" type="text" cursor="0" />
            </View>
          </View>
          <View className="inputWrapper">
            <View className="title">电话</View>
            <View className="input">
              <input maxLength="11" type="number" cursor="0" />
            </View>
          </View>
          <View className="inputWrapper" onClick={this.handleWant}>
            <View className="title">购买意向</View>
            <View className="input">
              <input disabled value={this.state.wantSelect} />
            </View>
            {this.state.wantShow && (
              <View className={classNames('want',this.state.wantShow?'show':'hidden',
                )}>
                {this.state.want.map(item => (
                  <View
                    onClick={() => this.onSelectWant(item)}
                    className="selectOption"
                    key={item.id}
                    id={item.id}
                  >
                    {item.value}
                  </View>
                ))}
              </View>
            )}
            <View className="icon"></View>
          </View>
          <View className="inputWrapper" onClick={this.handleMoney}>
            <View className="title">购买预算</View>
            <View className="input">
              <input disabled value={this.state.moneySelect} />
            </View>
            {this.state.moneyShow && (
              <View className={classNames('money',this.state.moneyShow?'show':'hidden',
                )}>
                {this.state.money.map(item => (
                  <View
                    onClick={() => this.onSelectMoney(item)}
                    className="selectOption"
                    key={item.id}
                    id={item.id}
                  >
                    {item.value}
                  </View>
                ))}
              </View>
            )}
            <View className="icon"></View>
          </View>
        </View>
        <View className="label">
          <label>
            <checkbox  >
              我已阅读并同意个人信息隐私政策
            </checkbox>
          </label>
        </View>
        <View className="toSec">
          <Text className="click">点击进入接待</Text>
        </View>
        <Text className="time">服务时间：am9:00-pm18:00</Text>
      </View>
    );
  }
}

export default MyForm;
