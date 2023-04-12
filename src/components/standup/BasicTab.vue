<template>
    <div class="w-full flex flex-col items-start justify-start mt-[60px]">
        <div class="flex flex-col items-start justify-start mb-[20px]">
            <label for="channel" class="text-white">Standup Name</label>
            <input type="text" v-model="newStandup.name" placeholder="Enter standup name" class="bg-neutral-10 border-none outline-none p-2 mt-2 h-[42px] w-[400px] rounded-sm text-white">
        </div>
        <div class="flex flex-col items-start justify-start">
            <label for="channel" class="text-white">Select Channel</label>
            <select id="channel" @change="handleChange" v-model="newStandup.channel"  type="text" class="bg-neutral-10 border-none outline-none p-2 mt-2 w-[400px] rounded-sm text-white h-[42px]">
                <option value="" class="text-white">Select Channel</option>
                <option v-for="channel in channels" :key="channel.id" :value="channel.id" class="text-white">{{ channel.name }}</option>
            </select>
        </div>
        <div class="flex  items-start justify-start flex-wrap mt-[30px] w-full">
            <div  v-for="user in newStandup.users" :key="user._id" class="w-[300px] mr-2  py-2 my-2  px-4 rounded-sm bg-[#101012]  flex items-center justify-between">
            <div class="flex items-center justify-center">
             <img :src="user.avatar" :alt="user.name" class="w-[30px] h-[30px] rounded-full ">
             <p class="text-white ml-2 text-sm">{{ user.name }}</p>
            </div>
            <div class="cursor-pointer ml-2" @click="removeUser(user)" >
              <img class="w-[20px] h-[20px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674196054/SuperLeaves/X_bzheyy.svg" alt="cross">
            </div>
          </div>

            <div class="border-2 border-dashed border-ss-purple flex items-center justify-center p-2  cursor-pointer my-2" @click="showUserModal=true">
                <img src="https://res.cloudinary.com/qtalk/image/upload/v1674037089/SuperLeaves/Plus_ttu9ws.svg" alt="add">
                <p class="text-white ml-2">Add members </p>
            </div>
        </div>
    </div>
    <UsersModal v-if="showUserModal" @send-selected-users="getUesrs" @closeModal="showUserModal=false"/>
</template>

<script setup>

import { onMounted,ref } from "vue";
import UsersModal from "../modals/UsersModal.vue";
import { useStandupStore } from "@/store/standupStore";
import { useUserStore } from "@/store/userStore";
import api from "@/api/api";
import { storeToRefs } from "pinia";
const standupStore = useStandupStore()
const userStore  = useUserStore()
const {newStandup} = storeToRefs(standupStore)
const channels  = ref([])
const showUserModal = ref(false)

 onMounted(async()=>{
  const userId  = userStore.user.userId
  
     const {data}=await api.get(`/standup/getChannelList?userId=${userId}`)
    channels.value= data
 })

 const handleChange = ()=>{
     newStandup.value.channelName= channels.value.find((item)=>item.id=== newStandup.value.channel).name
 }

const getUesrs=(data)=>{
     newStandup.value.users=[...newStandup.value.users,...data]
}
const removeUser =(user)=>{
    newStandup.value.users= newStandup.value.users.filter((item)=>item.userId!==user.userId)
}
</script>

