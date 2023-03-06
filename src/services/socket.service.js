import { io } from 'socket.io-client';

class SocketioService {
    socket;
    constructor() {}
  
    setupSocketConnection() {
      this.socket = io('https://superleaves.onrender.com',{
        auth:{
            token:JSON.parse(localStorage.getItem('slackUser')).token,
            slackId:JSON.parse(localStorage.getItem('slackUser')).user.id
        }
      });
      
    }
    getData(){
        if(this.socket){
       return this.socket.on("changeData",(data)=>{
        console.log(data)
          return  data
            
          })
        }
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
  }
  
  export default new SocketioService();