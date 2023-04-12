<template>
  <div class="w-[70%] h-full flex items-center justify-start flex-col">
    <div class="w-[90%] h-[85%] mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
        <div class="w-full flex items-center justify-between">
            <h2 class="text-2xl text-white">{{ id }}</h2>
            <div class="bg-ss-light px-3 py-1 rounded-md flex  items-center justify-center">
             <p class="text-md text-white">Members</p>
             <p class="text-2xl  text-ss-purple ml-3">7</p>
            </div>
        </div>
        <div v-if="configStore.loadingFetchTeams" class="w-full flex items-center justify-center ">
            <LoaderSpiner/>
        </div>
        <div v-else class="w-full flex flex-col items-center justify-center text-white">
            <div class="w-full flex  items-center justify-center flex-wrap">
                <div v-for="approver in configStore.currentTeam.approvers" :key="approver._id" class="w-[170px] h-[150px] flex flex-col items-center justify-center box-shadow-user-card p-2 bg-black rounded-sm" >
                   <img :src="approver.avatar" :alt="approver.name" class="w-[40px] h-[40px] rounded-full">
                    <p class="text-md text-center mt-2">{{ approver.name }}</p>
                    <p class="text-sm text-ss-purple">Lead</p>
                </div> 
                
            </div>
            <div class="w-full flex items-center justify-evenly mt-10 flex-wrap">
                
                <div v-for="member in configStore.getTeamMembers " :key="member._id" class="w-[170px] h-[150px] flex flex-col items-center justify-center box-shadow-user-card p-2 bg-black rounded-sm m-2" >
                    <img :src="member.avatar" :alt="member.name" class="w-[40px] h-[40px] rounded-full">
                    <p class="text-md text-center mt-2">{{ member.name }}</p>
                    <p class="text-sm text-ss-purple">member</p>
                </div>
            </div>
        </div>
    </div>
   </div>

</template>
<script setup>
import {  watchEffect } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { useConfigStore } from '@/store/configStore';


import LoaderSpiner from '../LoaderSpiner.vue';
const route = useRoute()
const configStore = useConfigStore()

const {id} = route.params


 watchEffect(()=>{
    configStore.getSingleTeam(id)
    
    
 })



</script>