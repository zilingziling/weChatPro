import Taro, { Component } from "@tarojs/taro";
import api from "../../service/api";
import {AtMessage  } from "taro-ui";
import './video.scss'
import './video.styl'
import {throttle} from '../../utils/func'
import ServerVideo from '../../components/serverVideo/serverVideo'
import ClientVideo from '../../components/clientVideo/clientVideo'
import {baseUrl} from '../../service/config'

class VideoPage extends Component {
  config = {
    navigationBarTitleText: "嘉寓天幕线上展厅"
  };

  state = {
    videoCallId: "",
    pullRtmpUrl:'',
    pushRtmpUrl:'',
    fullScreenStyle:"width: 100vw; height: 100vh;over-flow:hidden",
    littleScreen:"width: 30vw; height: 40vw;position:absolute;right:0;top:0;z-index:1000",
    fullClicked:false
  };
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
    // access_token=${wx.getStorageSync('token')
  componentDidMount() {
    let isServer=wx.getStorageSync('server')
    let setTimer=(videoCallId)=>{
      this.Timer = setInterval(() => {
        api.put(isServer==='TRUE'?`/servers/videos/${videoCallId}/heartbeat`:`/customers/videos/${videoCallId}/heartbeat`).then(resp=>{
          if(resp.data.result){
            if(resp.data.data.status==='DROPPED_CALL'){
              Taro.atMessage({
                'message': '对方已挂断！',
                'type': 'error',
                'duration':4000
              })
              clearInterval(this.Timer)
              this.setState({
                videoCallId: "",
                pullRtmpUrl:'',
                pushRtmpUrl:'',
                fullClicked:false
              })
              setTimeout(()=>{
                wx.navigateBack({
                  delta: 1
                })
              },4000)
              wx.setStorageSync('calling', '1');
            }
          }
        })
      }, 5000);
    }
    wx.showLoading({
      title: '连接中',
    })
    // 客服
    if(isServer==='TRUE'){
      console.log(this.$router.params.videoCallId)
      api.get(`/servers/videos/${this.$router.params.videoCallId}`).then(r => {
        if (r.data.result) {
          // 有遗留电话
          if (r.data.data.leftOverCall === 'TRUE') {
            // 挂断
            api.del(`servers/videos/${r.data.data.videoCallId}`).then(res => {
              if (res.data.result) {
                console.log(this.$router.params.videoCallId)
                api.get(`/servers/videos/${this.$router.params.videoCallId}`).then(response => {
                  // 再次接通成功
                  if (response.data.result) {
                    console.log(response.data.data)
                    wx.hideLoading({
                      success: () => {
                        Taro.atMessage({
                          'message': '已接通',
                          'type': 'success',
                        })
                        this.setState({
                          videoCallId: response.data.data.videoCallId,
                          pushRtmpUrl: response.data.data.pushRtmpUrl,
                          pullRtmpUrl: response.data.data.pullRtmpUrl
                        })
                        setTimer(response.data.data.videoCallId)
                      }
                    })
                  }
                })
              }
            })
          }
          // 没有遗留电话直接接通
          else {
            wx.hideLoading({
              success: () => {
                Taro.atMessage({
                  'message': '已接通',
                  'type': 'success',
                })
                console.log(r.data.data)
                this.setState({
                  videoCallId: r.data.data.videoCallId,
                  pushRtmpUrl: r.data.data.pushRtmpUrl,
                  pullRtmpUrl: r.data.data.pullRtmpUrl
                })
                setTimer(r.data.data.videoCallId)
              }
            })

          }
        }
        else {
          wx.hideLoading({
            success:()=>{
              Taro.atMessage({
                'message': r.data.message+'，请稍后再试！',
                'type': 'error',
                'duration':4000
              })
              setTimeout(()=>{
                wx.navigateBack({
                  delta: 1
                })
              },4000)
              wx.setStorageSync('calling', '1');
            }
          })
        }
      })
    }
    // 客户
    else {
     this.sendCall(setTimer)
    }
  }
  componentWillUnmount() {
    if (this.Timer != null) {
      clearInterval(this.Timer);
    }
  }
//   发起通话
  sendCall=(setTimer)=>{
    api.post('/customers/videos').then(r=>{
      if(r.data.result){
        // 有遗留
        if(r.data.data.leftOverCall==="TRUE"){
          api.del(`customers/videos/${r.data.data.videoCallId}`).then(res=>{
            // 挂断成功后再发起
            if(res.data.result){
              this.sendCall()
            }
          })
        }
        // 没有遗留电话
        else {
          // 存videoId
          this.setState({
            videoCallId:r.data.data.videoCallId
          })
          // 监听通话
          api.get(`/customers/videos/${r.data.data.videoCallId}`).then(response=>{
            if(response.data.result){
              wx.hideLoading({
                success: () => {
                  Taro.atMessage({
                    'message': '已接通',
                    'type': 'success',
                  })
                  this.setState({
                    videoCallId: response.data.data.videoCallId,
                    pullRtmpUrl: response.data.data.pullRtmpUrl,
                    pushRtmpUrl: response.data.data.pushRtmpUrl
                  })
                  // 通话中的心跳检测
                  setTimer(response.data.data.videoCallId)
                }
              })
            }
            // 没接通
            else {
              wx.hideLoading({
                success:()=>{
                  Taro.atMessage({
                    'message': response.data.message+'，请稍后再试！',
                    'type': 'error',
                    'duration':4000
                  })
                  setTimeout(()=>{
                    wx.navigateBack({
                      delta: 1
                    })
                  },4000)
                  wx.setStorageSync('calling', '1');
                  this.setState({
                    videoCallId: "",
                    pullRtmpUrl:'',
                    pushRtmpUrl:'',
                    fullClicked:false
                  })
                }
              })
            }
          })
        }
      }
      // 通话发起接口报错
      else {
        wx.hideLoading({
          success:()=>{
            Taro.atMessage({
              'message': r.data.message+'，请稍后再试！',
              'type': 'error',
              'duration':4000
            })
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            },4000)
            wx.setStorageSync('calling', '1');
            this.setState({
              videoCallId: "",
              pullRtmpUrl:'',
              pushRtmpUrl:'',
              fullClicked:false
            })
          }
        })
      }
    })
  }
// {/*{*/}
// {/*  wx.getStorageSync('server')==='TRUE'?<ServerVideo {...props}/>:<ClientVideo {...props}/>*/}
// {/*}*/}
  onClose=throttle(()=>{
    if(!this.state.videoCallId){
      return
    }
    let url=wx.getStorageSync('server')==='TRUE'?`/servers/videos/${this.state.videoCallId}`:`/customers/videos/${this.state.videoCallId}`
    api.del(url).then(r=>{
      if(r.data.result){
        Taro.atMessage({
          'message': '通话结束！',
          'type': 'error',
          'duration':3000
        })
        clearInterval(this.Timer)
        wx.setStorageSync('calling', '1');
       setTimeout(()=>{
         wx.navigateBack({
           delta: 1
         })
       },3000)
        wx.setStorageSync('calling', '1');
        this.setState({
          videoCallId: "",
          pullRtmpUrl:'',
          pushRtmpUrl:'',
          fullClicked:false
        })
      }
    })
  },3000)
  switchFull=throttle(()=>{
    this.setState({
      fullClicked: !this.state.fullClicked
    })
  },2000)
  render() {
    const {pushRtmpUrl,pullRtmpUrl,fullScreenStyle,littleScreen,fullClicked}=this.state
    return (
        <View className="videoWrapper">
          <AtMessage />
          <View style={fullClicked?fullScreenStyle:littleScreen} onClick={this.switchFull}>
            <live-pusher
              beauty={9}
              // url='rtmp://39.98.67.142:1935/live/VIDEO_CALL_COSTOMER_98c0e5b8e80b470398a7102e19cabaa4/'
              url={pushRtmpUrl}
              mode="RTC"
              autopush={true}
              style={fullClicked?fullScreenStyle:littleScreen}/>
          </View>
          <View onClick={this.switchFull} style={fullClicked?littleScreen:fullScreenStyle}>
            <live-player
              src={pullRtmpUrl}
              // src='rtmp://39.98.67.142:1935/live/VIDEO_CALL_COSTOMER_98c0e5b8e80b470398a7102e19cabaa4/'
              mode="RTC"
              autoplay
              binderror="error"
              style={fullClicked?littleScreen:fullScreenStyle}
            />
          </View>
            <Image onClick={this.onClose} className='answer' src={`${baseUrl}answer.png`}/>
        </View>
    );
  }
}

export default VideoPage;

