import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import api from "@/api/api";

export const useLeavesStore= defineStore("leavesStore",{
    

    state(){
        return{
            allLeaves:[],
            loading:false,
            leaveTypes:[],
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
     async fetchLeavTypes(){
         const {data} = await api.get('leaves/allLeavesType')
         this.leaveTypes = data.map(type=>type.type)
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
                approver: leave.approver?leave.approver:approverId, // aprover's slack id
                substitute:leave.substitute?leave.substitute:'', // substitute user id
                dateFrom:leave.dateFrom,
                dateTo:leave.dateTo,
                type:leave.type,
                desc:leave.desc,
                name:userDetails.name,
                team:userTeam,
                substituteName:leave.substituteData.name,
                substituteAvatar:leave.substituteData.avatar,
                userAvatar:leave.userData.avatar,
                approverName:leave.approverData.name,
                approverAvatar:leave.approverData.avatar
            })
            console.log(data)
            this.allLeaves=[...this.allLeaves,data]
            this.leavesLoading=false
        },
       async cancelLeave(leave){
         this.loading=true
        const {data} = await  api.get(`leaves/cancelLeave/${leave._id}`)
        this.allLeaves=[...this.addLeaves,data]
        this.loading=false
       }
    }
})