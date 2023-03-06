<template>
 <div class="w-[80%] h-full flex items-center justify-start flex-col">
     <div class="w-[90%] h-auto mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6 overflow-y-auto ">
       <div class="w-full flex items-start justify-between flex-col">
         <p class="text-2xl text-white">All requests</p>
         <div class="w-full h-full flex items-center justify-center" v-if="loading
         ">
          <LoaderSpiner/>
         </div>
          <div v-else class="w-full flex items-center justify-evenly mt-10">
           <table class="w-full " >
            <thead class="w-full text-white">
            <tr class="w-full">
                <th class="py-2">NAME</th>
                <th class="py-2">ABSENCE TYPE</th>
                <th class="py-2">STATUS</th>
                <th class="py-2">ABSENCE PERIOD</th>
                <th class="py-2">REQUESTED</th>
            
            </tr>
            </thead>
            <tbody class="w-full text-white text-center mt-4">
              <tr  v-for="leave in leaves"  :key="leave._id" @click="handleOpen(leave._id
              )" class="w-full px-4 h-[50px] rounded-sm bg-neutral-5 my-2 cursor-pointer ">
               <td>
              {{ leave.name }}
               </td>
               <td>
               {{ leave.type }}
               </td>
        
               <td>
                <span v-if="leave.approved" class="text-xs p-1 rounded-md bg-approved" >APPROVED</span>
                <span v-if="leave.rejected " class="text-xs p-1 rounded-md bg-rejected" >REJECTED</span>
                <span v-if="leave.canceled" class="text-xs p-1 rounded-md bg-rejected" >CANCELED</span>
                <span v-if="!leave.approved && !leave.rejected && !leave.canceled" class="text-xs p-1 rounded-md bg-pending" >PENDING</span>

               </td>
               <td>
                {{ leave.dateTo?.slice(0, 10)?.replaceAll('-','/') }} -   {{ leave.dateFrom?.slice(0, 10)?.replaceAll('-', '/') }}
               </td>
               <td>
                 {{ getDaysDiff(leave.dateTo, leave.dateFrom) }} day
               </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  <PaginationComp url="/leaves/allLeavesReq" @send-page-data="getPageData"/>
 </div>
  <LeaveModal v-if="showModal" @close-modal="handleClose" :leaveId="currentLeaveId"/>
</template>

<script setup>

import { ref } from 'vue';
import LeaveModal from './modals/LeaveModal.vue';
import PaginationComp from './PaginationComp.vue';
import LoaderSpiner from './LoaderSpiner.vue';
import {getDaysDiff} from "@/helpers/helpers"

const showModal = ref(false)
const leaves = ref({})
const currentLeaveId = ref()
const loading = ref(true)
function handleOpen(leaveId){
    showModal.value=true
    currentLeaveId.value =leaveId  
}
function handleClose(){
  showModal.value=false
  currentLeaveId.value=""
}
function getPageData(data){
     leaves.value=data.data.data
     loading.value= data.loading
}
</script>

<style scoped>
table{
    border-collapse:separate !important; 
  border-spacing: 0 8px;
}
</style>