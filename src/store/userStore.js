import {defineStore} from "pinia"

import axios from "axios"
import api from "@/api/api"

export const useUserStore = defineStore("userStore",{
 state(){
   return{
    user: localStorage.getItem("slackUser")?JSON.parse(localStorage.getItem('slackUser')):null,
    team:null,
    teamLeaves:[],
    approver:'',
    approverId:'',
    members:[],
   } 
 },
 getters:{
  userName(){
    return this?.user?.user?.name
  },
  userDetails(){
   return {avatar:this.user?.user?.image_192,email:this.user?.user?.email,slackId:this.user?.user?.id,
    name:this.user?.user?.name}
  },
  
  teamDetails(){
    return{teamId:this.user?.team?.id}
  },
  getTeamLeaves(){
    return  this.teamLeaves
  }
 },
 
 actions:{
  async fetchUser(code){  // login /signin of user
    if(this.user===null){
    const {data} = await axios.post("http://localhost:5000/auth/callback",{code:code})
    const identity = data?.identity
     this.user={team:identity.team,user:identity.user,tokem:data.token}
     localStorage.setItem("slackUser",JSON.stringify({team:identity.team,user:identity.user,token:data.token}))
     console.log("localstorage is set")
     this.fetchUser()
     this.router.push('/')
    }
  },
  async fetchUserTeam(){
  const {data} = await api.get(`/team?slackId=${this.userDetails.slackId}`)
   this.team=data[0].name
   this.approver=data[0].approvers[0].name
   this.fetchTeamLeaves()
   this.members=data[0].members
   this.approverId=data[0].approvers[0].userId
   
  
  },
  
  async fetchTeamLeaves(){
    
  console.log("entered in team leaves")
   const {data}=await api.get(`/leaves?team=${this.team}`) // dynamic value for team
   this.teamLeaves=data
    
  },
  logout(){
    localStorage.removeItem("slackUser")
    this.user=null
    this.router.push('/login')
    
  }
 }
})
