import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtButton ,AtMessage  } from "taro-ui";
import { connect } from "@tarojs/redux";
import classNames from "classnames";
import {throttle} from '../../utils/func'
import api from '../../service/api'
import "./form.styl";
import './form.scss'
class MyForm extends Component {
  config = {
    navigationBarTitleText: "嘉寓天幕线上展厅"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}
  componentDidMount(){
    api.get('/customers/status').then(r=>{
      if(r.data.result){
        if(r.data.data.saved){
          console.log(1)
          Taro.atMessage({
            'message': '你的信息已保存过！',
            'type': 'error',
            'duration':4000
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },4000)
        }
      }
    })
  }
  componentDidHide() {}
  state = {
    moneyShow: false,
    wantShow: false,
    money: [
      {
        id: 0,
        value: "50万以内"
      },
      {
        id: 1,
        value: "50~100万"
      },
      {
        id: 2,
        value: "100~150万"
      },
      {
        id: 3,
        value: "150~200万"
      }
    ],
    want: [
      {
        id: 0,
        value: "自住"
      },
      {
        id: 1,
        value: "投资"
      }
    ],
    moneySelect: "",
    wantSelect: "",
    purchaseIntention: "",
    purchaseBudget: "",
    name:'',
    phone:'',
    agree:false,
  };
  handleWant=()=>{
    this.setState({
      wantShow: !this.state.wantShow,
      moneyShow: false
    });
  }
  handleMoney=()=>{
    this.setState({
      moneyShow: !this.state.moneyShow,
      wantShow: false
    });
  }
  onSelectWant=(item)=> {
    this.setState({
      wantSelect: item.value,
      wantShow: false,
      purchaseIntention:Number(item.id)
    });
  }
  onSelectMoney=(item)=>{
    this.setState({
      moneySelect: item.value,
      moneyShow: false,
      purchaseBudget:Number(item.id)
    });
  }
   inputName=e=>{
     this.setState({
       name:e.target.value,
       moneyShow:false,
       wantShow:false
     })
  }
  inputPhone=e=>{
    this.setState({
      phone:e.target.value,
      moneyShow:false,
      wantShow:false
    })
  }
  onCheck=()=>{
    this.setState({
      agree:!this.state.agree
    })
  }
  clear=()=>{
    this.setState({
      moneySelect: "",
      wantSelect: "",
      purchaseIntention: "",
      purchaseBudget: "",
      name:'',
      phone:'',
      agree:false,
      moneyShow: false,
      wantShow: false,
    })
  }
  toVideo=throttle(()=>{
    const {agree,name,phone,purchaseBudget,purchaseIntention}=this.state
    if(!name||!phone||typeof purchaseBudget!=="number"||typeof purchaseIntention!=="number"){
      Taro.atMessage({
        'message': '请先填写参数！',
        'type': 'error',
      })
    }else if(agree.toString().toUpperCase()==="FALSE"){
      Taro.atMessage({
        'message': '请同意个人信息隐私政策！',
        'type': 'error',
      })
    } else {
      api.put('/customers', {name,phone,purchaseBudget,purchaseIntention,agree:agree.toString().toUpperCase()}).then(r=>{
        if(r.statusCode===200&&r.data.result){
          console.log(r)
          Taro.navigateTo({
            url: '/pages/video/video'
          })
          this.clear()
        }else {
          console.log(r)
          Taro.atMessage({
            'message': r.data.message,
            'type': 'error',
          })
        }
      })
    }
  },3000)
  render() {
    return (
      <View className="formWraper">
        <AtMessage />
        <Text className="info">欢迎您的光临！</Text>
        <Text className="info">通过嘉寓天幕线上展厅留言</Text>
        <Text className="info">到店即可独享5000元购房抵用券</Text>
        <View className="formContent">
          <View className="inputWrapper">
            <View className="title">姓名</View>
            <View className="input">
              <Input onInput={this.inputName} maxLength="10" type="text" cursor="0" value={this.state.name}/>
            </View>
          </View>
          <View className="inputWrapper">
            <View className="title">电话</View>
            <View className="input">
              <Input onInput={this.inputPhone} maxLength="11" type="number" cursor="0" value={this.state.phone}/>
            </View>
          </View>
          <View className="inputWrapper" onClick={this.handleWant}>
            <View className="title">购买意向</View>
            <View className="input">
              <Input disabled value={this.state.wantSelect} />
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
              <Input disabled value={this.state.moneySelect} />
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
        <View className='label' onClick={this.onCheck}>
          <checkbox-group >
          <label>
            <checkbox  >
              我已阅读并同意个人信息隐私政策
            </checkbox>
          </label>
          </checkbox-group>
      </View>
        <View className="toSec" onClick={this.toVideo}>
          <Text className="click" >点击进入接待</Text>
        </View>
        <Text className="time">服务时间：am9:00-pm18:00</Text>
      </View>
    );
  }
}

export default MyForm;
