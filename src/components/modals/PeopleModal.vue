<template>
  <div  @click="configStore.togglePeopleModal" class="w-screen h-screen bg-modal-transparent fixed top-0 right-0 flex items-center justify-end">
  <div @click.stop class="w-[600px] py-5 pl-0 pr-5 h-screen  bg-ss-gray flex flex-col  items-center justify-between">
    <div class="w-[90%]">
      <div class="text-xl text-white">Add user</div>
    <input class="outline-none  p-2 bg-black  w-full my-3 text-ss-purple border-b border-ss-purple" type="text" v-model="name"  placeholder="First Name" >
    <input class="outline-none  p-2 bg-black  w-full my-3 text-ss-purple border-b border-ss-purple" type="text" v-model="lastName"  placeholder="Last Name" >
    <div class="w-full flex items-center justify-start ">
    <input class="outline-none  p-2 bg-black  w-full my-3 text-ss-purple border-b border-ss-purple" type="text" v-model="email" placeholder="Email" >
     <button v-if="!loadingEmailUser" class="btn ml-2 bg-ss-purple py-2 px-3  text-white rounded-sm" @click="findUserByEmail" >Submit</button>
      <button v-else class="btn bg-ss-purple ml-2 py-2 px-3  flex items-center justify-center text-white rounded-sm"  > <LoaderSpiner/></button>
    </div>
    
    <div v-if="showUserProfile" class="w-full flex items-center justify-start my-2">
     <div class="rounded-full w-[40px] h-[40px]">
      <img :src="emailUser.profile.image_192" class="w-full h-full rounded-full" :alt="emailUser.profile.real_name">
     </div>
     <div class="text-sm text-white ">
      <p class="ml-2">{{emailUser.profile.real_name}}</p>
     </div>
    </div>

    <div class="w-full flex flex-col items-start justify-start">
    <label class="text-white text-md" id="team">Select Team</label>
    <select class="outline-none  p-2 bg-black  w-full my-3 text-ss-purple border-b border-ss-purple"  name="team" id="team" v-model="team">
      <option v-for="team in configStore.allTeams " :key="team._id" :value="team.name">
        {{team.name}}
      </option>
    </select>
    </div>
    <div class="w-full flex items-center justify-start mt-4
    ">
     <input v-model="isAdmin" type="checkbox" name="admin" id="admin">
     <label class="text-md text-white ml-2" for="admin">Set Admin</label>
    </div>
    </div>
    
    
   <div class="w-[90%] flex items-center justify-start">
  <button class="btn bg-ss-purple py-2 px-3  text-white rounded-sm mr-2" @click="configStore.togglePeopleModal">Cancel</button>
  <button class="btn bg-ss-purple py-2 px-3  text-white rounded-sm mr-2" v-if="submitLoading" ><LoaderSpiner/></button>
  <button class="btn bg-ss-purple py-2 px-3  text-white rounded-sm" v-else @click="addUserToDb">Submit</button>
   </div>
   </div>
  
  </div>
  
</template>

<script setup>
import api from '@/api/api';
import LoaderSpiner from '../LoaderSpiner.vue';
import  { onMounted , ref } from "vue"
import {useConfigStore} from "@/store/configStore"
const email = ref("")
const name  = ref("")
const lastName = ref("")
const team = ref("")
const showUserProfile = ref(false)
const emailUser= ref({})
const configStore = useConfigStore()
const loadingEmailUser = ref(false)
const submitLoading = ref(false)
const isAdmin = ref(false)
async function findUserByEmail (){
  showUserProfile.value=false
  loadingEmailUser.value=true
  const {data} =await api.get(`/users/userByEmail?email=${email.value}`)
  console.log(data)
  emailUser.value=data.user
  showUserProfile.value=true
  loadingEmailUser.value=false
}

async function addUserToDb(){
  submitLoading.value=true
  const {data} = await api.post('/users/add',{
    name:`${name.value} ${lastName.value}`,
    email:email.value,
    userId:emailUser.value.id,
    avatar:emailUser.value.profile.image_192,
    team:team.value,
    admin:isAdmin.value
  })
  
  console.log(data)

  await api.put('/team/addMember',{
    teamName:team.value,
    name:`${name.value} ${lastName.value}`,
    email:email.value,
    userId:emailUser.value.id,
    avatar:emailUser.value.profile.image_192,
  })
  submitLoading.value=false
  configStore.togglePeopleModal()
}

onMounted(()=>{
 configStore.fetchTeams()
})
</script>

