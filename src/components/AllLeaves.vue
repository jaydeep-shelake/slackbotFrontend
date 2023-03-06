
<template>
    <div class="w-[60%] h-full flex items-center justify-start flex-col">
    <div class="w-[90%] h-[85%] mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
      <div class="flex items-center justify-evenly w-full mb-10">
      <div v-for="user in userStore.leaveCount" :key="user._id" class="p-2 w-[140px] h-[140px] max-w-auto  bg-ss-gray flex flex-col items-center justify-evenly rounded-md mx-2 ">
        <h1 class="text-ss-purple text-5xl">{{ user.count }}</h1>
         <p class="text-gray-300 text-center w-full capitalize">{{ user.type }}</p>
      </div>
      
      </div>
        <div class="w-full flex items-center justify-between">
          <h2 class="text-2xl text-white">All Leaves</h2>
          <div class="flex items-center justify-center">
          <button v-if="userStore && userStore.admin" class="ss-btn bg-ss-purple  mr-2" @click="openUserModaL">Apply on behalf of</button>
          <button class="ss-btn bg-ss-purple">View All</button>

          </div>
    
        </div>
       <div class="w-full h-full mt-8">
        <div v-if="!leavesStore.loading&&leavesStore.allLeaves.length>0">
         <div v-for="leave in leavesStore.allLeaves" :key="leave._id" class="w-full p-5 bg-primary-gradient flex items-center justify-evenly text-white my-4">
          
          <div>
            <p>{{ new Date(leave.dateFrom).toDateString()}}</p>
          </div>
          <div>
            <p>{{ new Date(leave.dateTo).toDateString() }}</p>
          </div>
          <div>
            <p class="capitalize">{{ leave?.type }}</p>
          </div>
          <div v-if="leave.approved===true">
           <p class="bg-approve py-1 px-3">Approved</p>
          </div>
          <div v-if="leave.rejected===true">
           <p class="bg-reject-gradient py-1 px-3">Rejected</p>
          </div>
          <div v-if="leave.approved===false&&leave.rejected===false">
           <p class="bg-yello-gardient  py-1 px-3">Pending</p>
          </div>
          <div v-if="!leave.canceled&&isDateGreater(leave.dateTo)">
          <button @click="leave" class="p-1 bg-rejected rounded-md b">Cancel</button>
          </div>
         </div>
        </div>
        <div v-else-if="!leavesStore.loading&&leavesStore.allLeaves.length===0" class="w-full h-full flex items-center justify-center">
          <h1 class="text-xl text-white">You dont have any Leaves</h1>
         
        </div>
        <div v-else class="w-full h-full flex items-center justify-center">
         <LoaderSpiner/>
        </div>


       </div>
    </div>
   </div>
  <UsersModal v-if="showUserMoal" @close-modal="showUserMoal=false" @send-selected-users="getSelectedUser"  :apply-on-behalf="true"/>
  <BehalfModal v-if="showFormModal" :user-data="userData" :selected-user="selectedUser" @close-from-modal="showFormModal=false"/>
</template>

<script setup>
import api from '@/api/api';
import { useLeavesStore } from '@/store/leavesStore';
import { useUserStore } from '@/store/userStore';
import { ref } from 'vue';
import LoaderSpiner from './LoaderSpiner.vue';
import UsersModal from './modals/UsersModal.vue'
import BehalfModal from './modals/BehalfModal.vue';
const leavesStore=useLeavesStore()
const userStore = useUserStore().user
const showUserMoal = ref(false)
const showFormModal = ref(false)
const userData  = ref({})
const selectedUser = ref({})
function openUserModaL(){
showUserMoal.value=true
}

function isDateGreater(date){
  const todaysDate = new Date()
  const dateTo = new Date(date)
  return todaysDate <= dateTo
}
async function getSelectedUser(user){
  selectedUser.value=user
  const {data}= await  api.get(`/team?slackId=${user.userId}`)
  console.log(data)
  userData.value=data
  showUserMoal.value=false
  showFormModal.value=true
}
</script>

