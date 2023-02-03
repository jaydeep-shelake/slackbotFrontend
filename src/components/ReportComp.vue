<template>
   <div class="w-[80%] h-full flex items-center justify-start flex-col">
    <div class="w-[90%] h-auto mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
    <div class="w-full flex items-center justify-between">
     <p class="text-2xl text-white">Employee Report</p>
     <button class="ss-btn bg-ss-purple">Download</button>
    </div>
    <div v-if="!loading" class="w-full flex flex-col items-center justify-center mt-10">
     <div class="w-[90%] flex items-center justify-evenly ">
      <table class="w-full " >
        <thead class="w-full text-white">
        <tr>
            <th class="py-2">Name</th>
            <th class="py-2">Earned Leaves</th>
            <th class="py-2">Sick Leaves</th>
            <th class="py-2">Festive Leaves</th>
            <th class="py-2">Remote Work</th>
        </tr>
        </thead>
        <tbody class="w-full text-white text-center mt-4">
            <tr v-for="user in listOfUsers" :key="user.userId" class="w-full border-y-2 border-ss-purple my-2 ">
                <td class="py-2">{{ user.name }}</td>
                <td class="py-2">{{ user.earnedLeaves }}</td>
                <td class="py-2">{{ user.sickLeaves }}</td>
                <td class="py-2">{{ user.festiveLeaves }}</td>
                <td class="py-2">{{ user.remoteWork }}</td>
            </tr>
            
        </tbody>
      </table>
     </div>
    </div>
    <div v-else class="w-full flex flex-col items-center justify-center mt-10">
        <LoaderSpiner/>
    </div>

    <div class="w-full flex items-center justify-center mt-3">
      <div v-if="pageNumber>0" @click="goToPrePage" class="w-[50px] h-[50px] p-2 flex items-center justify-center text-white bg-ss-light-purple cursor-pointer"><span>Pre</span></div>
         <div v-for="page in pages" :key="page" @click="setPageNumber(page)"  class="w-[50px] mx-3 h-[50px] p-2 flex items-center justify-center text-white cursor-pointer " :class="{'bg-ss-light-purple':page!==pageNumber,'bg-ss-purple':page===pageNumber}">
         <span>{{ page+1 }}</span>
         </div>
    <div v-if="pageNumber<=3" @click="goToNextPage" class="w-[50px] h-[50px] p-2 flex items-center justify-center text-white bg-ss-light-purple cursor-pointer"><span>Next</span></div>
    </div>
    </div>
    </div>

</template>

<script setup>

import {  ref,watchEffect } from '@vue/runtime-core';
import LoaderSpiner from './LoaderSpiner.vue';
import api from '@/api/api';

const pages=ref([])
const pageNumber = ref(0)
const numberOfPages= ref(0)
const listOfUsers=ref([])
const totalUsers = ref(0)
const loading = ref(false)

watchEffect(async ()=>{
   loading.value=true
   pages.value= new Array(numberOfPages.value).fill(null).map((v,i)=>i)
   console.log("watch ran ")
   const {data} = await api.get(`/users/userlist?page=${pageNumber.value}`)
   listOfUsers.value=data.users
   numberOfPages.value=data.toalPages
   totalUsers.value = data.userCount
   loading.value=false
   console.log(pageNumber.value)
})
function goToNextPage(){
         pageNumber.value=Math.min(numberOfPages.value-1,pageNumber.value+1)
}
function goToPrePage(){
pageNumber.value= Math.min(numberOfPages.value-1,pageNumber.value-1)
}
function setPageNumber(index){
 pageNumber.value=index
}
</script>

