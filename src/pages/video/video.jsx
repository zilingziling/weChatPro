import Taro, { Component } from "@tarojs/taro";
import api from "../../service/api";
import './video.styl'
import ServerVideo from '../../components/serverIndex/serverIndex'
import ClientVideo from '../../components/clicentIndex/clientIndex'
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
    const props={
      pullRtmpUrl:this.state.pullRtmpUrl,
      pushRtmpUrl:this.state.pushRtmpUrl
    }
    return (
      <View>
        {
          wx.getStorageSync('server')==='TRUE'?<ServerVideo {...props}/>:<ClientVideo {...props}/>
        }
      </View>

    );
  }
}

export default VideoPage;
