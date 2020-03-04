import Taro, { Component } from "@tarojs/taro";
import api from '../../service/api'
class Video extends Component {
  config = {
    navigationBarTitleText: "嘉寓天幕线上展厅"
  };
state={
  string:''
}
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentDidMount() {
    api.post('/customers/videos').then(r=>{
      if(r.data.result){
        this.setState({
          string:r.data.data.videoCallId
        })
      }
    })
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <live-player
        src={this.state.string}
        mode="RTC"
        autoplay
        bindstatechange="statechange"
        binderror="error"
        style="width: 100vw; height: 100vh;"
      />
    );
  }
}

export default Video;
