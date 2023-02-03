
<template>
    <div class="w-[60%] h-full flex items-center justify-start flex-col">
    <div class="w-[90%] h-[85%] mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
      <div class="flex items-center justify-evenly w-full mb-10">
      <div class="p-2 w-[140px] h-[140px]  bg-black flex flex-col items-center justify-evenly rounded-md">
        <h1 class="text-ss-purple text-5xl">{{ leavesStore.getEarnedLeaves }}</h1>
         <p class="text-gray-300 text-center w-full">Earned Leaves</p>
      </div>
      <div class="p-2 w-[140px] h-[140px]  bg-black flex flex-col items-center justify-evenly rounded-md">
        <h1 class="text-ss-purple text-5xl">{{ leavesStore.getSickLeaves }}</h1>
         <p class="text-gray-300 text-center">Sick Leaves</p>
      </div>
      <div class="p-2 w-[140px] h-[140px] bg-black flex flex-col items-center justify-evenly rounded-md">
        <h1 class="text-ss-purple text-5xl">{{ leavesStore.getFestiveLeaves }}</h1>
         <p class="text-gray-300 text-center">Festive Leaves</p>
      </div>
      <div class="p-2 w-[140px] h-[140px] bg-black flex flex-col items-center justify-evenly rounded-md">
        <h1 class="text-ss-purple text-5xl">8</h1>
         <p class="text-gray-300 text-center">Remote Work</p>
      </div>
      </div>
        <div class="w-full flex items-center justify-between">
         <h2 class="text-2xl text-white">All Leaves</h2>
          <button class="ss-btn bg-ss-purple">View All</button>
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
  
</template>

<script setup>
import { useLeavesStore } from '@/store/leavesStore';
import LoaderSpiner from './LoaderSpiner.vue';
const leavesStore=useLeavesStore()


</script>

