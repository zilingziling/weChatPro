import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import './serverIndex.styl'
import api from '../../service/api'
import {throttle} from '../../utils/func'
import {baseUrl}  from '../../service/config'
const innerAudioContext = Taro.createInnerAudioContext()
class  ServerIndex extends Component {
  state = {
    callList: []
  }

  componentDidMount() {
    // 音频
    console.log(innerAudioContext)
    innerAudioContext.src = `${baseUrl}incoming.wav`
    innerAudioContext.loop = true
    InnerAudioContext.play()
    this.timer = setInterval(() => {
      api.get('/servers/videos').then(r => {
        if (r.data.result) {
          this.setState({
            callList: r.data.data
          })
          if (r.data.data.length > 0) {
            InnerAudioContext.play()
          }
        }
      })
    }, 5000);
  }

  componentWillUnmount() {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  }

  onResponse = item => {
    InnerAudioContext.stop()
    Taro.navigateTo({
      url: `/pages/video/video?videoCallId=${item.videoCallId}`
    })
  }

  render(){
    return (
      <View className='waiting'>
        <View className='list'>
        {
          this.state.callList&&this.state.callList.map(item=><View className='user' key={item.userId}>
              <Text>{item.name}</Text>
              <Text>{item.phone}</Text>
              <Text>{item.purchaseBudget}</Text>
              <Text>{item.purchaseIntention}</Text>
              <Image className='hangup' src={`${baseUrl}hangup.png`} onClick={()=>this.onResponse(item)}/>
          </View>)
        }
        </View>
      </View>
    )
  }
}

export default ServerIndex

