import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import api from "@/api/api";

export const useLeavesStore= defineStore("leavesStore",{
    

    state(){
        return{
            allLeaves:[],
            loading:false,
            leaveTypes:[],
            leaveTypeCount:[],
            userLeaves:[], // each of clicked user leaves for admin
            leavesLoading:false,
            err:null,
            socket:'',
          
        }
    },
    actions:{
        async fetchLeaves(id){
            this.loading=true
            if(id){
                const {data} = await api.get(`/leaves?userId=${id}`)
            this.userLeaves=data
             
            }
            else
            {
            const userId = useUserStore().userDetails.slackId
            const {data} = await api.get(`/leaves?userId=${userId}`)
            this.allLeaves=data
            }
           
            this.loading=false
            
            
        },
        async fetchLeavesInRange(dateFrom,dateTo,id){
          if(id){
            this.loading=true
            const {data} = await api.get(`/leaves/filter-leaves?userId=${id}&dateTo=${dateTo}&dateFrom=${dateFrom}`)
            this.userLeaves=data
            this.loading=false
          }

        },
     async fetchLeavTypes(){
         const {data} = await api.get('leaves/allLeavesType')
         this.leaveTypeCount = data
         this.leaveTypes = data.map(type=>type.type)
     },
        async addLeave(leave){
            this.leavesLoading=true
            const userDetails = useUserStore().userDetails
            const teamDetails=useUserStore().teamDetails
            const userTeam  = useUserStore().team
            const approverId =useUserStore().approverId
            const {data} = await api.post('/leaves',{
                slackId: leave ? leave.userData.userId:userDetails.slackId,
                teamId:teamDetails.teamId,
                approver: leave.approver?leave.approver:approverId, // aprover's slack id
                substitute:leave.substitute?leave.substitute:'', // substitute user id
                dateFrom:leave.dateFrom,
                dateTo:leave.dateTo,
                type:leave.type,
                desc:leave.desc,
                name:leave?leave.userData.name:userDetails.name,
                team:userTeam,
                substituteName:leave.substituteData.name,
                substituteAvatar:leave.substituteData.avatar,
                userAvatar:leave.userData.avatar,
                approverName:leave.approverData.name,
                approverAvatar:leave.approverData.avatar
            })
            console.log(data)
            if(!leave){
                this.allLeaves=[...this.allLeaves,data]
            }
            this.leavesLoading=false
        },
       async cancelLeave(leave){
         this.loading=true
        const {data} = await  api.put(`leaves/cancelLeave/${leave._id}`)
        this.allLeaves=[...this.allLeaves,data]
        this.loading=false
       }
    }
})