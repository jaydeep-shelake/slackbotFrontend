
<template>
    <div class="w-[60%] h-full flex items-center justify-start flex-col mt-[40px]">
    <div class="w-[90%] h-[85%] mt-10 bg-[#1c1b1f] rounded-lg flex flex-col items-start justify-start px-8 py-6">
      <div class="flex items-center justify-evenly w-full mb-10">
      <div v-for="leaveType in leaveCount " :key="leaveType._id" class="p-2 w-[140px] h-[140px] max-w-auto  bg-ss-gray flex flex-col items-center justify-evenly rounded-md mx-2 ">
        <h1 class="text-[#35ffff] text-5xl">{{ leaveType.count }}</h1>
         <p class="text-gray-300 text-center w-full capitalize">{{ leaveType.type }}</p>
      </div>
      
      </div>
        <div class="w-full flex items-center justify-between">
          <h2 class="text-2xl text-white">All Leaves</h2>
          <div class="flex items-center justify-center">
          <button v-if="userStore && userStore.user.admin" class="ss-btn bg-ss-purple flex items-center justify-center  mr-2 text-sm" @click="openUserModaL">
            Apply on behalf of
           
          </button>
          <button class="ss-btn bg-ss-gray text-sm">View All</button>

          </div>
    
        </div>
       <div class="w-full h-full mt-8">
        <div v-if="!leavesStore.loading&&leavesStore.allLeaves.length>0">
         <div v-for="(leave, i ) in leavesStore.allLeaves" :key="leave._id" class="w-full p-5 bg-ss-gray flex items-center justify-evenly text-white my-4 rounded-md relative">
          
          <div class="w-[22%] flex items-center justify-center">
            <p class="text-sm text-[#c9c5ca]">{{ new Date(leave.dateFrom).toDateString()}}</p>
          </div>
          <div  class="w-[22%] flex items-center justify-center">
            <p  class="text-sm text-[#c9c5ca]">{{ new Date(leave.dateTo).toDateString() }}</p>
          </div>
          <div  class="w-[22%] flex items-center justify-center">
            <p class="capitalize text-sm text-[#c9c5ca]">{{ leave?.type }}</p>
          </div>
          <div v-if="leave.approved===true && !leave.canceled"  class="w-[22%] flex items-center justify-center">
           <p class="bg-approve py-1 px-3 rounded-md text-sm">Approved</p>
          </div>
          <div v-if="leave.rejected===true"  class="w-[22%]flex items-center justify-center">
           <p class="bg-reject-gradient py-1 px-3 rounded-md text-sm">Rejected</p>
          </div>
          <div v-if="leave.canceled ===true"  class="w-[22%] flex items-center justify-center">
           <p class="bg-reject-gradient py-1 px-3 rounded-md text-sm">Canceled</p>
          </div>
          <div v-if="leave.approved===false&&leave.rejected===false"  class="w-[22%] flex items-center justify-center">
           <p class="bg-yello-gardient  py-1 px-3 rounded-md text-sm">Pending</p>
          </div>
          <div  class="w-[8%] flex items-center justify-center cursor-pointer" @click="handleEdit(i)">
            <img src="https://res.cloudinary.com/qtalk/image/upload/v1675321253/SSUP%20Wrapper/3dots_rgmmrf.svg" alt="">
          </div>
          <!-- <div v-if="!leave.canceled&&isDateGreater(leave.dateTo)" @click="leavesStore.cancelLeave(leave)">
          <button  class="bg-[#634EFB] py-2 px-4 rounded-md border-none outline-none text-white text-sm">Cancel</button>
          </div> -->
          <div v-show="currentIndex===i&& showEdit" class="w-[120px] absolute p-3 bg-black top-[60px] right-[-20px] z-50 rounded-md ">
            <p v-if="!leave.canceled && isDateGreater(leave.dateTo)"  @click="handleCancel(leave)" class="text-white text-sm text-start" >Cancel</p>
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
import { onMounted, ref } from 'vue';
import LoaderSpiner from './LoaderSpiner.vue';
import UsersModal from './modals/UsersModal.vue'
import BehalfModal from './modals/BehalfModal.vue';
import { storeToRefs } from 'pinia';
const leavesStore=useLeavesStore()
const userStore = useUserStore()
const {leaveCount} = storeToRefs(useUserStore())
const showUserMoal = ref(false)
const showFormModal = ref(false)
const userData  = ref({})
const selectedUser = ref({})
const showEdit = ref(false)
const currentIndex = ref()
function openUserModaL(){
showUserMoal.value=true
}

function isDateGreater(date){
  const todaysDate = new Date()
  const dateTo = new Date(date)
 
  return todaysDate.getDate() <= dateTo.getDate()
}
async function getSelectedUser(user){
  selectedUser.value=user
  const {data}= await  api.get(`/team?slackId=${user.userId}`)
  console.log(data)
  userData.value=data
  showUserMoal.value=false
  showFormModal.value=true
}
const handleEdit =(index)=>{
  showEdit.value = !showEdit.value
  currentIndex.value=index
}
const handleCancel=(leave)=>{
  leavesStore.cancelLeave(leave)
  showEdit.value=false
  
}
onMounted(()=>{
  userStore.getUsersLeaveCount()
  leavesStore.fetchLeaves()
})
</script>

