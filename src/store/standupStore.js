import api from "@/api/api"
import {defineStore} from "pinia"
import { useUserStore } from "./userStore"
export const useStandupStore = defineStore('standupStore',{
    state(){
        return{
            allStandUp:[],
            loading:false
        }
    },
    actions:{
        async fetchStandups(){
            this.loading=true
            const userId = useUserStore().userDetails.slackId
           const {data} = await api.get(`/standup?userId=${userId}`)
           this.allStandUp=data
           this.loading=false
        }
    }
})