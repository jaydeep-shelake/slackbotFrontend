import {defineStore} from "pinia"
import api from "@/api/api"
import { useUserStore } from "./userStore";
export const useRequestStore = defineStore('requestStore',{
    state(){
       return{
        allRequest:[],
        notiCount:0,
        laoding:false,
       }
    },
    actions:{
       async approveRequest(data){
         this.laoding=true
         await api.put('/leaves',{userId:data.userId,approver:data.approver,approved:data.approved,teamId:data.teamId,messageTs:data.messageTs})
         this.laoding=false
        },
       async getRequest(){
        const userId = useUserStore().userDetails.slackId
        const {data} = await api.get(`/leaves?approverId=${userId}`)
        this.allRequest=data
      
       },
       updateNotiCount(){
         this.notiCount=0
       }
    }
})