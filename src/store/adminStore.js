import api from "@/api/api"

import {defineStore} from "pinia"

export const useAdminStore = defineStore('adminStore',{
    state(){
        return{
            allLeavesRequest:[]
        }
    },

    actions:{
        async getAllLeaveRequets(){
         const {data}= await api.get('/leaves/allLeavesReq')
         this.allLeavesRequest=data
        }
    }
})