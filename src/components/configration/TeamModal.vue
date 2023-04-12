<template>
    <div @click="configStore.toggleModal" class="w-screen h-screen bg-modal-transparent fixed top-0 right-0 flex items-center justify-end z-10">
  <div @click.stop class="w-[600px] py-5 pl-0 pr-5 h-screen  bg-ss-gray flex  items-center justify-between ">
    <div class="w-[10%] flex flex-col items-center justify-start h-full mr-2">
     <div class="w-full cursor-pointer p-1 flex items-center justify-center my-2 mt-3 rounded-r-xl" @click="handleShowMember"
     :class="{'bg-ss-purple':showMembers}"
     >
      <img src="https://res.cloudinary.com/qtalk/image/upload/v1674216178/SuperLeaves/team_b9q2am.png" alt="team" class="w-[30px] h-[30px]">
     </div>
     <div class="w-full cursor-pointer p-1 flex items-center justify-center my-2 rounded-r-xl" @click="handleShowLeads"
     :class="{'bg-ss-purple':showLeads}"
     >
      <img src="https://res.cloudinary.com/qtalk/image/upload/v1674216470/SuperLeaves/badge_uamaoe.png" alt="badge" class="w-[30px] h-[30px]">
     </div>
    </div>
    <div class="w-[90%] h-full flex flex-col items-center justify-between">
    <div class="w-full">
   <div class="w-full">
    <input class="outline-none  p-2 bg-black  w-full my-3 text-ss-purple border-b border-ss-purple" type="text" v-model="teamName"  >
   </div>

   <div v-if="showMembers">
    <div  class="add-frame w-full  flex flex-col " @click="configStore.toggleUserModal(true)" :class="{'mt-10':configStore.listOfTeam.length<=0}"> 
    <img v-if="configStore.listOfTeam.length<=0" class="w-[40px] h-[40px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674037089/SuperLeaves/Plus_ttu9ws.svg"/>
     <p class="4xl text-white">Add Members</p>
    </div>
    <div  class="w-full flex flex-col items-start justify-start">
      <p class="text-xl my-2 text-white">Team Members</p>

      <div v-for="team in configStore.listOfTeam" :key="team._id" class="w-full my-2 p-2 rounded-sm bg-black flex items-center justify-between">
        <div class="flex items-center justify-center">
         <img :src="team.avatar" :alt="team.name" class="w-[30px] h-[30px] rounded-full ">
         <p class="text-white ml-2 text-sm">{{ team.name }}</p>
        </div>
        <div class="cursor-pointer" @click="handleRemoveMember(team)">
          <img class="w-[20px] h-[20px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674196054/SuperLeaves/X_bzheyy.svg" alt="cross">
        </div>
      </div>
    </div>
  </div>

   <div class="w-full" v-if="showLeads">
    <div  class="add-frame w-full flex flex-col " :class="{'mt-10':configStore.listOfLead.length<=0}" @click="configStore.toggleLeadModal">
    <img v-if="configStore.listOfLead.length<=0" class="w-[40px] h-[40px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674037089/SuperLeaves/Plus_ttu9ws.svg"/>
     <p class="4xl text-white">ADD Lead</p>
    </div>
    <div class="w-full flex flex-col items-start justify-start">
      <p class="text-xl my-2 text-white">Team Leads</p>
      <div v-for="team in configStore.listOfLead" :key="team._id" class="w-full my-2 p-2 rounded-sm bg-black flex items-center justify-between">
        <div class="flex items-center justify-center">
         <img :src="team.avatar" :alt="team.name" class="w-[30px] h-[30px] rounded-full ">
         <p class="text-white ml-2 text-sm">{{ team.name }}</p>
        </div>
        <div class="cursor-pointer" @click="handleRemoveLead(team)">
          <img class="w-[20px] h-[20px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674196054/SuperLeaves/X_bzheyy.svg" alt="cross">
        </div>
      </div>
    </div>

  </div>

  </div>
    <div  class="w-full flex item-center justify-start">
    <button class="btn bg-red-500 py-2 px-3 text-white mr-4 rounded-sm" @click="configStore.toggleModal">Cancel</button>
    <button v-if="!configStore.loadingSaveTeam&&!configStore.isEditing" class="btn bg-ss-purple py-2 px-3  text-white rounded-sm" @click="handleSaveTeam">Save</button>
    <button v-else-if="!configStore.loadingSaveTeam&&configStore.isEditing" class="btn bg-ss-purple py-2 px-3  text-white rounded-sm" @click="handleEditTeam">Update</button>
    <button v-else class="btn bg-ss-purple py-2 px-3  text-white rounded-sm flex item-center justiy-center"><LoaderSpiner/></button>
    </div>
  </div>

  </div>
</div>
</template>

<script setup>
import {ref} from "vue"
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/store/configStore";
import LoaderSpiner from "../LoaderSpiner.vue";

const showMembers=ref(true)
const showLeads=ref(false)
const configStore = useConfigStore()
const {teamName} = storeToRefs(configStore)

function handleSaveTeam(){
  configStore.saveTeam(teamName.value)
}

function handleEditTeam(){
 configStore.saveEditedTeam()
}

function handleRemoveMember(user){
   configStore.removeMember(user)
}
function handleRemoveLead(lead){
  configStore.removeLead(lead)
}

function handleShowMember(){
  showMembers.value=true
  showLeads.value=false
}

function handleShowLeads(){
  showMembers.value=false
  showLeads.value=true
}
</script>

