<template>
   <div class="mb-10">
            <img :src="user.avatar" :alt="user.name">
          </div>
           <div class="flex items-center justify-start w-[90%] my-4">
             <div class="text-md  text-[#abb2b9] w-[20%]">Name: </div>
             <span class="w-[80%] border-b-1 border-[#abb2b9] flex items-center justify-start w-">{{ user.name }}</span>
           </div>
           <div class="flex items-center justify-start w-[90%] my-4">
             <div class="text-md  text-[#abb2b9] w-[20%]">Email: </div>
             <div class="w-[80%] border-b-1 border-[#abb2b9] flex items-center justify-start">{{ user.email }}</div>
           </div>
           <div class="flex items-center justify-start w-[90%] my-4">
             <div class="text-md  text-[#abb2b9] w-[20%]">Team: </div>
             <div class="w-[80%] border-b-1 border-[#abb2b9] flex items-center justify-start">{{ user.team }}</div>
           </div>
           <div class="flex items-center justify-start w-[90%] my-4">
             <div class="text-md  text-[#abb2b9] w-[20%]">User: </div>
             <div class="w-[80%] border-b-1 border-[#abb2b9] flex items-center justify-start">{{ user.admin ? 'Admin user' : 'Regular user' }}</div>
           </div>
           <div class="flex items-center justify-start w-[90%] my-4">
             <button @click="showWarningModal=true" class="flex items-center justify-center bg-rejected py-2 px-3 rounded-sm">
              Delete  
              <img src="https://res.cloudinary.com/qtalk/image/upload/v1679998136/SuperLeaves/trash-icon_rb1pbb.svg" alt="delete" class="w-[15px] ml-2">
            </button>
           </div>
          <WarningModal v-if="showWarningModal" textMsg="Are you sure you want to remove user" actionText="Delete user" @send-data="deleteUser"/>
</template>

<script setup>
import WarningModal from "../modals/WarningModal.vue";
 import {defineProps,ref,defineEmits} from "vue"
 import api from "@/api/api";
 const props = defineProps({
    user:{
        type:Object
    }
 })
const emits  = defineEmits(['closeModal'])
 const showWarningModal  = ref(false)

 const deleteUser=async()=>{
     await api.delete(`/users/user/${props.user._id}`)
     emits('closeModal')
 }
</script>

