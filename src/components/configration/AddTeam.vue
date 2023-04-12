<template>
  <div class="w-[70%] h-full flex items-center justify-start flex-col">
    <div class="w-[100%] h-[85%] mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
        <div class="w-full flex items-center justify-between">
         <h2 class="text-2xl text-white">Teams</h2>
          <button class="ss-btn bg-ss-purple" @click="configStore.toggleModal">Add Team</button>
        </div>
        <div v-if="configStore.loadingFetchTeams" class="w-full h-full mt-8 flex items-center justify-center ">
         <LoaderSpiner/>
        </div>
        <div v-else class=" flex items-start justify-evenly w-full h-full mt-8 flex-wrap">
            <div v-for="team in configStore.allTeams" :key="team._id" class=" bg-[#1c1b1f] flex flex-col  items-center justify-between pt-4 text-white cursor-pointer my-4 w-[250px] h-[325px] "  @click="router.push(`/configration/teams/${team.name}`)">
             <div class=" w-full flex items-center justify-center mb-[20px]">
               <img v-if="team.approvers.length>0" :src="team.approvers[0].avatar" :alt="team.approvers[0].name" class="w-[60px] rounded-full z-[2]">
               <img v-if="team.approvers.length===2" :src="team.approvers[1].avatar" alt=""
               class="w-[60px] rounded-full ml-[-20px] z-0"
               >
             </div>
             <div class="w-full flex items-center justify-center my-2" >
                <p> <span class="text-ss-light-purple bg-ss-alpha-purple py-1 px-2 text-sm rounded-sm ">{{ team.name }}</span></p>
             </div>
             <div class="w-full flex flex-col items-center justify-center'" >
                <p> <span class="text-white my-2">{{ team.approvers.length>0 ?  team.approvers[0].name: 'No Lead' }}</span> </p>
                <p v-if="team.approvers.length === 2"> <span class="text-white my-2">/{{  team.approvers[1].name }}</span> </p>
             </div>
             <div  class="w-full flex items-center justify-center mt-[20px]">
               
                <button class="btn w-[40px] h-[40px] mr-4 text-sm py-1  rounded-sm bg-ss-alpha-purple flex items-center justify-center" @click.stop="editHandleTeam(team)" >
                 <img src="https://res.cloudinary.com/qtalk/image/upload/v1679401634/edit_kklea2.svg" class="w-[20px]" alt="edit">
               </button>
                <button class="btn w-[40px] h-[40px] mr-4 text-sm py-1  rounded-sm  bg-ss-gray flex items-center justify-center"
                   @click.stop="handleDeleteTeam(team._id)"
                   >
                   <img src="https://res.cloudinary.com/qtalk/image/upload/v1679401614/trash_rozexk.svg" alt="trash" class="w-[20px]">
                  </button>
             </div>
              <div class=" w-full border-t border-solid border-[#5c5c5c] mt-[15px] flex items-center justify-between">
              <div class="flex flex-col w-1/2 p-2 items-center justify-center">
                <p class="text-[20px]">{{ team.members.length }}</p>
                <span class="text-xs">members</span>
              </div>
              <div class="flex flex-col w-1/2 p-2 items-center justify-center border-l border-solid border-[#5c5c5c]">
                <p class="text-[20px]">{{ team.approvers.length }}</p>
                <span class="text-xs">leads</span>
              </div>
              <div>

              </div>
              </div>
             
            </div>
        </div>
    </div>
    
</div>
<TeamModal v-show="configStore.modalOpen"/>
<UserModal v-show="configStore.userModalOpen"/>
<LeadModal v-show="configStore.leadModalOpen"/>
<WarningModal v-if="showWarning" @send-data="deleteTeam" @close-modal="closeModal" actionText="Delete Team" textMsg="Are you sure you want to delete team ?"/>
</template>

<script setup>
import { useConfigStore } from '@/store/configStore';
import {ref} from "vue"
import TeamModal from './TeamModal.vue';
import UserModal from '../modals/UsersModal.vue'
import LeadModal from '../modals/LeadModal.vue';
import LoaderSpiner from '../LoaderSpiner.vue';
import { onMounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import WarningModal from '../modals/WarningModal.vue';
const configStore = useConfigStore()
const router = useRouter()
const showWarning = ref(false)
const idToDelete = ref('')
onMounted(()=>{
   configStore.fetchTeams()
})
function editHandleTeam(team){
 configStore.editTeam(team)
}
function handleDeleteTeam(id){
  showWarning.value=true
  idToDelete.value=id
}
const deleteTeam=()=>{
   configStore.deleteTeam(idToDelete.value)
   idToDelete.value=''
}
const closeModal=()=>{
  showWarning.value = false
    idToDelete.value = ''
}
</script>
