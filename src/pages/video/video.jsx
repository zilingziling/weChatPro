import Taro, { Component } from "@tarojs/taro";
import api from "../../service/api";
import './video.styl'
import ServerVideo from '../../components/serverVideo/serverVideo'
import ClientVideo from '../../components/clientVideo/clientVideo'
class VideoPage extends Component {
  config = {
    navigationBarTitleText: "嘉寓天幕线上展厅"
  };
  state = {
    videoCallId: "",
    pullRtmpUrl:'rtmp://39.98.67.142/rtmpt',
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
                pushRtmpUrl:`${r.data.data.pushRtmpUrl}?access_token=${wx.getStorageSync('token')}`,
                videoCallId:r.data.data.videoCallId
              })
          }
        })
      }
    })
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
// {/*{*/}
// {/*  wx.getStorageSync('server')==='TRUE'?<ServerVideo {...props}/>:<ClientVideo {...props}/>*/}
// {/*}*/}
  onClose=()=>{
    let url=wx.getStorageSync('server')==='TRUE'?`/servers/videos/${this.state.videoCallId}`:`/customers/videos/${this.state.videoCallId}`
    api.del(url).then(r=>{
      if(r.data.result){
        Taro.navigateTo({
          url: '/pages/dial/dial'
        })
      }
    })
  }
  render() {
    const props={
      pullRtmpUrl:this.state.pullRtmpUrl,
      pushRtmpUrl:this.state.pushRtmpUrl
    }
    return (

        <View className="videoWrapper">
          <live-pusher  url={pushRtmpUrl} mode="RTC" autopush bindstatechange="statechange" style="width: 30vw; height: 40vw;position:absolute;right:0;top:0;z-index:1000" />
          <live-player
            src={pullRtmpUrl}
            mode="RTC"
            autoplay
            bindstatechange="statechange"
            binderror="error"
            style="width: 100vw; height: 100vh;over-flow:hidden"
          />
          <Image onClick={this.onClose} className='answer' src='http://39.98.67.142/assets/answer.png'/>
        </View>
    );
  }
}

export default VideoPage;
