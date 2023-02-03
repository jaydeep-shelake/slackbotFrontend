import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import api from "@/api/api";

export const useLeavesStore= defineStore("leavesStore",{
    

    state(){
        return{
            allLeaves:[],
            loading:false,
            leavesLoading:false,
            err:null,
            socket:'',
        }
    },
    getters:{
    getEarnedLeaves(){
        return 15 - this.allLeaves.filter(item=>item.type==="earned leaves"&&item.approved).length
    },
    getSickLeaves(){
        return 12 - this.allLeaves.filter(leave=>leave.type==='sick'&&leave.approved).length
    },
    getFestiveLeaves(){
        return 5- this.allLeaves.filter(leave=>leave.type==="festive"&&leave.approved).length
    }
    },
    actions:{
        async fetchLeaves(){
           

            this.loading=true
            const userId = useUserStore().userDetails.slackId
            const {data} = await api.get(`/leaves?userId=${userId}`)
            // console.log(data)
            this.allLeaves=data
            this.loading=false
            
            
        },
    
        async addLeave(leave){
            this.leavesLoading=true
            const userDetails = useUserStore().userDetails
            const teamDetails=useUserStore().teamDetails
            const userTeam  = useUserStore().team
            const approverId =useUserStore().approverId
            const {data} = await api.post('/leaves',{
                slackId: userDetails.slackId,
                teamId:teamDetails.teamId,
                approver:approverId, // aprover's slack id
                substitute:leave.substitute, // substitute user id
                dateFrom:leave.dateFrom,
                dateTo:leave.dateTo,
                type:leave.type,
                desc:leave.desc,
                name:userDetails.name,
                team:userTeam
            })
            console.log(data)
            this.allLeaves=[...this.allLeaves,data]
            this.leavesLoading=false
        }
    }
})