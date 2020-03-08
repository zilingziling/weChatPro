import Taro, { Component } from "@tarojs/taro";
import '../video.styl'
import {baseUrl} from '../../service/config'
class ClientVideo extends Component{
  render(){
  const {pullRtmpUrl,pushRtmpUrl}=this.props

  return (
    <View className="videoWrapper">
      <live-pusher  url={pushRtmpUrl} mode="RTC" autopush bindstatechange="statechange" style="width: 300px; height: 225px;" />
      <live-player
        src={pullRtmpUrl}
        mode="RTC"
        autoplay
        bindstatechange="statechange"
        binderror="error"
        style="width: 100vw; height: 40vh;over-flow:hidden"
      />
      <Image className='answer' src= {`${baseUrl}answer.png`}/>
    </View>
  )
}
}
export default ClientVideo
