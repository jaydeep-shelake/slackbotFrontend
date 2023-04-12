import api from "@/api/api"
import {defineStore} from "pinia"
import { useUserStore } from "./userStore"
import {substractStandupTime} from "@/helpers/helpers"
export const useStandupStore = defineStore('standupStore',{
    state(){
        return{
            allStandUp:[],
            loading:false,
            newStandup:{
             name:'',
             channel:'',
             channelName:'',
             questions:[{ quetion: "What did you complete yesterday?" },
{ quetion: "What do you commit to today?" },
{ quetion: " When do you think you'll be done with that?" },
{ quetion: "Any impediments in your way?" },],
             format:'question',
             time:'',
             firstAlert:'',
             secondAlert:'',
             users:[]
            }
        }
    },
    actions:{
        async fetchStandups(){
            this.loading=true
            const userId = useUserStore().userDetails.slackId
           const {data} = await api.get(`/standup?userId=${userId}`)
           this.allStandUp=data
           this.loading=false
        },
        async saveStanup(){
         const userId = useUserStore().userDetails.slackId
          this.newStandup.firstAlert = substractStandupTime(parseInt(this.newStandup.firstAlert),this.newStandup.time)
          this.newStandup.secondAlert = substractStandupTime(parseInt(this.newStandup.secondAlert),this.newStandup.time)
           this.loading=true
         const {data}=await api.post('/standup/createStandup',{...this.newStandup,userId})
         this.loading=false
         this.allStandUp=[...this.allStandUp,data]
          this.router.push("/standups");
       
        }
    }
})