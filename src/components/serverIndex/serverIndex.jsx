import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import './serverIndex.styl'
import api from '../../service/api'
import {throttle} from '../../utils/func'
import {baseUrl}  from '../../service/config'
class  ServerIndex extends Component{
  state={
    callList:[]
  }
  componentDidMount(){
    this.timer = setInterval(() => {
      api.get('/servers/videos').then(r=>{
          if(r.data.result){
            this.setState({
              callList: r.data.data
            })
          }
      })
    }, 5000);
  }

  componentWillUnmount() {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  }
  onResponse=throttle(item=>{
    console.log(item)
        Taro.navigateTo({
          url: `/pages/video/video?videoCallId=${item.videoCallId}`
        })
  },2000)
  render(){
    return (
      <View className='waiting'>
        <View className='list'>
        {
          this.state.callList&&this.state.callList.map(item=><View className='user' key={item.userId}>
              <Text>张三</Text>
              <Text>18679899876</Text>
              <Image className='hangup' src={`${baseUrl}hangup.png`} onClick={()=>this.onResponse(item)}/>
          </View>)
        }
        </View>
      </View>
    )
  }
}

export default ServerIndex

