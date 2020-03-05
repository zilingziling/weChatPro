import Taro, { Component } from "@tarojs/taro";
import api from "../../service/api";
import './video.styl'
class Video extends Component {
  config = {
    navigationBarTitleText: "嘉寓天幕线上展厅"
  };
  state = {
    videoCallId: "",
    pullRtmpUrl:'',
    pushRtmpUrl:''
  };
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentDidMount() {
    api.post('/customers/videos').then(r=>{
      if(r.data.result){
        this.setState({
          videoCallId:r.data.data.videoCallId
        })
        api.get(`/customers/videos/${r.data.data.videoCallId}`).then(r=>{
          if(r.data.result){
              this.setState({
                pullRtmpUrl: `${r.data.data.pullRtmpUrl}?access_token=${wx.getStorageSync('token')}`,
                pushRtmpUrl:`${r.data.data.pushRtmpUrl}?access_token=${wx.getStorageSync('token')}`
              })
          }
        })
      }
    })
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="videoWrapper">
        <live-player
          // src={this.state.string}
          src="rtmp://39.98.67.142/rtmpt"
          mode="RTC"
          autoplay
          bindstatechange="statechange"
          binderror="error"
          style="width: 100vw; height: 40vh;over-flow:hidden"
        />
            <Image className='answer' src='http://39.98.67.142/assets/answer.png'/>
      </View>
    );
  }
}

export default Video;
