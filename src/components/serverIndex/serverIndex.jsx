import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import './serverIndex.styl'
import api from '../../service/api'
class  ServerIndex extends Component{
  state={
    callList:[]
  }
  componentDidMount(){
    this.timer = setInterval(() => {
      api.get('/servers/videos').then(r=>{
          if(r.data.result){
            this.setState({
              callList: this.state.callList.concat(r.data.data)
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
  onResponse=item=>{
    api.get(`/servers/videos/${item.videoCallId}`).then(r=>{
      if(r.data.result){
        console.log(r)
      }
    })
  }
  render(){
    console.log(this.state.callList)
    return (
      <View className='waiting'>
        <View className='list'>
        {
          this.state.callList&&this.state.callList.map(item=><View className='user' key={item.userId}>
              <Text>张三</Text>
              <Text>18679899876</Text>
              <Image className='hangup' src='http://39.98.67.142/assets/hangup.png' onClick={()=>this.onResponse(item)}/>
          </View>)
        }
        </View>
      </View>
    )
  }
}

export default ServerIndex

