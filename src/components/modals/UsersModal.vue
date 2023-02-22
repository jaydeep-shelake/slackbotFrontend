<template>
  <div @click="configStore.toggleUserModal" class="w-screen h-screen bg-modal-transparent fixed top-0 left-0 flex items-center justify-center z-[99]">

   <div v-if="searchedUesrs.length<=0" @click.stop class="bg-ss-gray p-6 w-1/2 h-[60%] flex flex-col items-start justify-start cursor-pointer ">
    
    <form @submit.prevent="searchForUser" class="w-full flex items-center justify-between">
    <input v-model="name" type="text" class="outline-none  p-2  my-3 text-ss-purple  bg-black border-none outline rounded-sm w-1/2" placeholder="Search">
     <div>
      <p class="text-md text-ss-blue"> Total: {{ totalUsers }}</p>
     </div>
    </form>
    <div v-if="loading" class="w-full mt-8  text-xs flex items-center justify-center flex-wrap h-[300px] overflow-y-auto">
      <LoaderSpiner/>
    </div>
    <div v-else class="w-full mt-8  text-xs flex items-center justify-center flex-wrap h-[300px] overflow-y-auto">
    
    <div v-for="user in listOfUsers" :key="user._id" @click="selectUser(user)" class=" flex flex-col items-center justify-between py-3 text-white  p-3 m-4 w-[150px]  h-auto" :class="{'bg-secondary-gradient':selectedUsers.includes(user)}">
       <div class="flex flex-col items-center justify-center">
        <img class="w-[30px] h-[30px] rounded-full" :src="user.avatar" alt="user">
        <p class="my-1 text-center">{{ user.name }}</p>
       </div>
       <div>
        <p class="text-center">{{ user.email }}</p>
       </div>
    </div>
    
    </div>
    <div class="w-full flex items-center justify-center mt-3">
      <div v-if="pageNumber>0" @click="goToPrePage" class="w-[50px] h-[50px] p-2 flex items-center justify-center text-white bg-ss-light-purple cursor-pointer"><span>Pre</span></div>
         <div v-for="page in pages" :key="page" @click="setPageNumber(page)"  class="w-[50px] mx-3 h-[50px] p-2 flex items-center justify-center text-white cursor-pointer " :class="{'bg-ss-light-purple':page!==pageNumber,'bg-ss-purple':page===pageNumber}">
         <span>{{ page+1 }}</span>
         </div>
    <div v-if="pageNumber<=3" @click="goToNextPage" class="w-[50px] h-[50px] p-2 flex items-center justify-center text-white bg-ss-light-purple cursor-pointer"><span>Next</span></div>
    <button class="ss-btn bg-black ml-10 text-white" @click="addUsersToTeam">Save</button>
    </div>


   </div>


   <div v-else  @click.stop class="bg-ss-gray p-6 w-1/2 h-[60%] flex  items-start justify-start flex-col cursor-pointer ">
   <div class="w-full flex items-center justify-between">
      <div class="text-md text-ss-blue">
        <span class="text-white"> Result for : </span> {{ name }}
      </div>
     <div>
      <p class="text-md text-ss-blue"> Total: {{ searchedUesrs.length }}</p>
     </div>
    </div>
     <div class="w-full flex items-center justify-center flex-col">
      <div v-if="searchUserLoading" class="w-full mt-8  text-xs flex items-center justify-center flex-wrap h-[300px] overflow-y-auto">
      <LoaderSpiner/>
    </div>
    <div v-else class="w-full  mt-8  text-xs flex items-center justify-center  flex-wrap h-[300px] overflow-y-auto">
    
    <div v-for="user in searchedUesrs" :key="user._id" @click="selectUser(user)" class=" flex flex-col items-center justify-between py-3 text-white  p-3 m-4 w-[150px]  h-auto" :class="{'bg-secondary-gradient':selectedUsers.includes(user)}">
       <div class="flex flex-col items-center justify-center">
        <img class="w-[30px] h-[30px] rounded-full" :src="user.avatar" alt="user">
        <p class="my-1 text-center">{{ user.name }}</p>
       </div>
       <div>
        <p class="text-center">{{ user.email }}</p>
       </div>
    </div>
   
    </div>
    <button @click="clearSearch" class="btn bg-ss-purple py-2 px-3  text-white rounded-sm">Clear</button>
     </div>
    
   </div>
  </div>
</template>

<script setup>
import { useConfigStore } from '@/store/configStore';
import {  ref,watchEffect } from '@vue/runtime-core';
import { defineEmits } from 'vue';
import LoaderSpiner from '../LoaderSpiner.vue';
import api from '@/api/api';
const configStore = useConfigStore()
const pages=ref([])
const pageNumber = ref(0)
const numberOfPages= ref(0)
const listOfUsers=ref([])
const totalUsers = ref(0)
const loading = ref(false)
const selectedUsers=ref([])
const name= ref('')
const searchedUesrs =ref([])
const searchUserLoading= ref(false)
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

async function searchForUser(){
   searchUserLoading.value=true
   const {data} =await api.get(`/users/search?name=${name.value}`)
   searchedUesrs.value=data
   searchUserLoading.value=false
   
}

function clearSearch(){
   name.value=""
   searchedUesrs.value=[]
}

function goToNextPage(){
         pageNumber.value=Math.min(numberOfPages.value-1,pageNumber.value+1)
}
function goToPrePage(){
pageNumber.value= Math.min(numberOfPages.value-1,pageNumber.value-1)
}
function setPageNumber(index){
 pageNumber.value=index
}

function selectUser(user){
   if(selectedUsers.value.includes(user)){
      console.log("user exits")
      selectedUsers.value= selectedUsers.value.filter((item)=>item._id!==user._id)
      console.log(selectedUsers.value)
      return
   }
  selectedUsers.value=[...selectedUsers.value,user]
  console.log(selectedUsers.value)
}
const emit = defineEmits(['sendSelectedUsers']);
function addUsersToTeam(){
if(selectedUsers.value.length>0){
   configStore.saveUsersToTeam(selectedUsers.value)
   emit('sendSelectedUsers',selectedUsers.value)
}
}

</script>
