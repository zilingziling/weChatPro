import Taro, { Component } from "@tarojs/taro";

class ServerVideo extends Component{
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
        <Image className='answer' src='http://39.98.67.142/assets/answer.png'/>
      </View>
    )
  }
}
export default ServerVideo
