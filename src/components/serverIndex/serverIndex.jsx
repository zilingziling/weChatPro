import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem,Audio } from "@tarojs/components";
import './serverIndex.styl'
import api from '../../service/api'
import {throttle} from '../../utils/func'
import {baseUrl}  from '../../service/config'
let myAudio=wx.createInnerAudioContext()

class  ServerIndex extends Component {
  state = {
    callList: [],
  }
  componentDidMount() {
    // 音频
    myAudio.src = `${baseUrl}incoming.wav`
    myAudio.loop = true
    this.timer = setInterval(() => {
      api.get('/servers/videos').then(r => {
        if (r.data.result) {
          this.setState({
            callList: r.data.data
          })
          if (r.data.data.length > 0) {
            myAudio.play()
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
    myAudio.stop()
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

