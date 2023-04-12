import api from "@/api/api"
import {defineStore} from "pinia"

export const useConfigStore = defineStore('configStore',{
    state(){
        return{
            modalOpen:false,
            userModalOpen:false,
            leadModalOpen:false,
            peopleModal:false,
            listOfTeam:[],
            listOfLead:[],
            allTeams:[],
            totalPageCount:0,
            pageNumber:0,
            loadingSaveTeam:false,
            loadingFetchTeams:false,
            currentTeam:{},
            teamName:"Team Name",
            isEditing:false,
            teamId:'',
            holidayModalOpen:false,
            holidayName:'',
            holidayDate:'',
            openMsgModal:false,
            msgModalMsg:''
        }
    },
    getters:{
    getTeamMembers(){
       return this.currentTeam?.members?.filter((item)=>{
            return !this.currentTeam.approvers.some(obj1 => obj1.name === item.name)
        })
    }
    },
    actions:{
        toggleModal(){
            this.modalOpen= !this.modalOpen
            this.listOfLead=[],
            this.listOfTeam=[]
        },
        toggleUserModal(value){
            this.userModalOpen=value
        },
        toggleLeadModal(){
          this.leadModalOpen = !this.leadModalOpen
        },
        toggleHolidayModal(){
        this.holidayModalOpen=!this.holidayModalOpen
        },
        toggleMsgModal(msg){
        this.openMsgModal=!this.openMsgModal
        this.msgModalMsg=msg
        },
        togglePeopleModal(){
         this.peopleModal=!this.peopleModal
        },
        saveUsersToTeam(team){
       this.listOfTeam=[...this.listOfTeam,...team]
       this.userModalOpen=false
        },
        saveLeadToTeam(lead){
        this.listOfLead=lead
        this.leadModalOpen=false

        },
        async saveTeam(teamName){
            this.loadingSaveTeam=true
         const {data}= await api.post('/team',{name:teamName,members:this.listOfTeam,leads:this.listOfLead})
         this.listOfLead=[]
         this.listOfTeam=[]
         console.log("saved to db data",data)
         this.allTeams=[...this.allTeams,data]
         this.loadingSaveTeam=false
         this.modalOpen=false
         this.toggleMsgModal("Team added successfully !")
         
        },
        async fetchTeams(){
            this.loadingFetchTeams=true
            const {data} = await api.get('/team')
            this.allTeams=data
            console.log(data)
            this.loadingFetchTeams=false
        },
       async getSingleTeam(teamId){
         this.loadingFetchTeams=true
         const {data} = await api.get(`/team/${teamId}`)
         this.currentTeam=data
         console.log(data)
         this.loadingFetchTeams=false
        },
        async saveEditedTeam(){
            this.loadingSaveTeam=true
        const {data} = await api.put('/team',{
            name:this.teamName,members:this.listOfTeam,leads:this.listOfLead,teamId:this.teamId
        })
        const findItemToUpDate = this.allTeams.find((item)=>item._id===data._id)
       
        if(findItemToUpDate){
            this.allTeams=this.allTeams.map((item)=>item._id===findItemToUpDate._id?data:item)
        }
        this.isEditing=false
        this.modalOpen=false
        this.loadingSaveTeam=false
        this.listOfTeam=[]
        this.listOfLead=[]
        this.toggleMsgModal("Team updated successfully !")

         // also emty the array of leads and members
        },
        async deleteTeam(id){
          await api.delete(`/team/${id}`)
          this.allTeams= this.allTeams.filter((team)=>team._id!==id)
        this.toggleMsgModal("Team deleted successfully !")

        },
        removeMember(user){
            
           this.listOfTeam= this.listOfTeam.filter(item=>item._id!==user._id)
        },
        removeLead(lead){
         this.listOfLead = this.listOfLead.filter(item=>item._id!==lead._id)
        },
        editTeam(team){
            this.modalOpen=true
            this.isEditing=true
            this.listOfTeam=team.members
            this.listOfLead=team.approvers
            this.teamName=team.name
            this.teamId=team._id
        }
        
    }
})