<template>
  <div class="w-[70%] h-full flex items-center justify-start flex-col">
    <div class="w-[90%] h-[85%] mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
        <div class="w-full flex items-center justify-between">
         <h2 class="text-2xl text-white">Teams</h2>
          <button class="ss-btn bg-ss-purple" @click="configStore.toggleModal">Add Team</button>
        </div>
        <div v-if="configStore.loadingFetchTeams" class="w-full h-full mt-8 flex items-center justify-center ">
         <LoaderSpiner/>
        </div>
        <div v-else class="w-full h-full mt-8">
            <div v-for="team in configStore.allTeams" :key="team._id" class="w-full bg-black flex items-center justify-evenly p-4 text-white cursor-pointer my-4"  @click="router.push(`/configration/teams/${team.name}`)">
             <div>
                <p >{{ team.name }} Team</p>
             </div>
             <div>
                <p> <span class="text-ss-light-purple">{{ team.members.length }}</span> Members</p>
             </div>
             <div>
                <p> <span class="text-ss-purple">{{ team.approvers.length}}</span> Lead</p>
             </div>
             <div>
                <button class="btn bg-red-500 text-sm py-1 px-3 rounded-sm"
                @click.stop="handleDeleteTeam(team._id)"
                >Delete</button>
             </div>
             <div>
                <button class="btn bg-green-500 text-sm py-1 px-3 rounded-sm" @click.stop="editHandleTeam(team)" >Edit</button>
             </div>
             
            </div>
        </div>
    </div>
    
</div>
<TeamModal v-show="configStore.modalOpen"/>
<UserModal v-show="configStore.userModalOpen"/>
<LeadModal v-show="configStore.leadModalOpen"/>
</template>

<script setup>
import { useConfigStore } from '@/store/configStore';
import TeamModal from './TeamModal.vue';
import UserModal from '../modals/UsersModal.vue'
import LeadModal from '../modals/LeadModal.vue';
import LoaderSpiner from '../LoaderSpiner.vue';
import { onMounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
const configStore = useConfigStore()
const router = useRouter()
onMounted(()=>{
   configStore.fetchTeams()
})
function editHandleTeam(team){
 configStore.editTeam(team)
}
function handleDeleteTeam(id){
  configStore.deleteTeam(id)
}
</script>
