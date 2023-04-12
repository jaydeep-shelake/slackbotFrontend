<template>
  <div class="w-[80%] h-full flex items-center justify-start flex-col">
   <div v-if="loading" class="w-[90%] h-auto mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
   <LoaderSpiner/>
  </div>
    <div v-else class="w-[90%] h-auto mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
  <div class="w-full flex items-center justify-between">
     <p class="text-2xl text-white">web-test</p>
    
  </div>
  <div class="w-full flex items-center justify-start mt-2 ml-2">
        <div class="py-1 px-3 text-ss-purple bg-ss-light-purple rounded-xl mx-2">
           <p>Active</p>
        </div>
        <div class="py-1 px-3 bg-ss-alpha-purple text-ss-light-purple rounded-xl mx-2">
           <p>Weekly</p>
        </div>
        <div class="py-1 px-3  text-ss-light-purple rounded-xl mx-2">
          <div @click="showTimeModal=!showTimeModal" class="text-ss-light-purpl flex items-center justify-center"> <img class="mr-2" src="https://res.cloudinary.com/qtalk/image/upload/v1675843135/SuperLeaves/icons8-wall-clock-24_prhyzu.png" alt="date"> 
            <div v-if="!showTimeModal">{{ time }} </div>
            <select v-else @click.stop v-model="time"  name="time" id="time" class="bg-black outline-none border-none">
            <option :value="time">{{ time }}</option>
            <option value="10:30 AM">10:30 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="11:30 PM">11:30 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="12:30 PM">12:30 PM</option>
           </select>
          </div >
          
        </div>
        <div class="py-1 px-3  text-ss-light-purple rounded-xl mx-2">
           <p> {{ standupData.standup.users.length }} members</p>
        </div>
        <div class="py-1 px-3  text-ss-light-purple rounded-xl mx-2">
           <p> {{ standupData.standup.quetions.length }} quetions</p>
        </div>
        <div class="py-1 px-3 bg-ss-alpha-purple text-ss-light-purple rounded-sm mx-2">
           <p>#{{ standupData.standup.name }}</p>
        </div>
    </div>
    <div class="w-full flex flex-wrap items-start justify-start flex-col mt-8">
      <div class=" py-1 px-3 bg-ss-alpha-purple text-ss-light-purple rounded-md ">
       <p class="text-white text-l">Members :</p>
      </div>
     <div class="w-full flex flex-wrap items-center justify-start">
      <div  v-for="user in users" :key="user._id" class="w-auto my-2 mr-2 py-2 px-4 rounded-sm bg-black flex items-center justify-between">
        <div class="flex items-center justify-center">
         <img :src="user.avatar" :alt="user.name" class="w-[30px] h-[30px] rounded-full ">
         <p class="text-white ml-2 text-sm">{{ user.name }}</p>
        </div>
        <div class="cursor-pointer ml-2" @click="removeUser(user)" >
          <img class="w-[20px] h-[20px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674196054/SuperLeaves/X_bzheyy.svg" alt="cross">
        </div>
      </div>
      <div @click="configStore.toggleUserModal(true)" class="add-frame w-auto my-2 mr-2  px-4 rounded-sm bg-black flex items-center justify-between">
         
            <p class="text-white" >Add Member</p>
       
      </div>
     </div>
    </div>

    <div class="w-full flex flex-wrap items-start justify-start flex-col mt-8">
      <div class=" py-1 px-3 bg-ss-alpha-purple text-ss-light-purple rounded-md ">
       <p class="text-white text-l">Quetions :</p>
      </div>
      <div class="w-full flex flex-wrap items-center justify-start">
       <div v-for="( quetion,index ) in questions"  :key="index" class="w-auto my-2 mr-2 py-2 px-4 rounded-sm bg-black flex items-center justify-between">
        <p class="text-white"> {{ quetion.quetion }}</p>
        <div class="cursor-pointer ml-2" @click="removeQue(index)" >
          <img class="w-[20px] h-[20px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674196054/SuperLeaves/X_bzheyy.svg" alt="cross">
        </div>
       </div>
       <div  class="add-frame w-auto my-2 mr-2  px-4 rounded-sm bg-black flex items-center justify-between">
         <p class="text-white" @click="handleQueModal">Add Question</p>
       </div>
      </div>
      
    </div>

    <div class="w-full flex flex-wrap items-start justify-start flex-col mt-8">
      <div class=" py-1 px-3 bg-ss-alpha-purple text-ss-light-purple rounded-md mb-4 ">
       <p class="text-white text-l">Reminders :</p>
      </div>
      <div class="flex items-start justify-start flex-col mb-6">
        <label for="alert1" class="text-white mb-2">Alice sends a reminder to each participant</label>
            <select  name="alert" id="alert1" class="border text-ss-light-purple border-ss-purple p-2 outline-none bg-black
             rounded-md" v-model="firstAlert" >
             <option  :value="firstAlert"  >{{ firstAlert }} minute before the standup</option>
            
              <option  value="30" class="text-ss-purple">30 minute before the standup</option>
              <option  value="60" class="text-ss-purple">60 minute before the standup</option>
            </select>
      </div>
    
      <div class="flex items-start justify-start flex-col">
        <label for="alert1" class="text-white mb-2"> Alice sends a another reminder to each participant</label>
            <select  v-model="secondAlert"  name="alert" id="alert1" class="border border-ss-purple p-2 outline-none bg-black  text-ss-light-purple rounded-md">
              
              <option  :value="secondAlert"  >{{ secondAlert }} minute before the standup</option>
              <option  value="30"  >30 minute before the standup</option>
              <option  value="15"  >15 minute before the standup</option>
            </select>
      </div>
    
    </div>
    <div class="w-full flex flex-wrap items-start justify-start flex-col mt-10">
      <div class=" py-1 px-3 bg-ss-alpha-purple text-ss-light-purple rounded-md mb-4 ">
       <p class="text-white text-l">Report format :</p>
      </div>
     <!-- format  -->  
      <ReportFormat @get-format="format=>messageViewType=format"/>
    </div>

    <div class="flex w-full items-center justify-start mt-5">
      <button v-if="!updateLoading" :class="{'text-white bg-ss-light-purple py-1 px-4 rounded-sm':setSaveBtnToDefault,'text-white bg-ss-purple py-1 px-4 rounded-sm':!setSaveBtnToDefault}" :disabled="setSaveBtnToDefault" @click="updateStandup">Save</button>
      <button v-else class='text-white bg-ss-purple py-1 px-4 rounded-sm flex items-center justify-center' ><LoaderSpiner/></button>
      <button class=" text-white bg-red-500 py-1 px-4 rounded-sm ml-3">Delete</button>

    </div>
  </div>
  
 
  </div>
  <UsersModal v-if="configStore.userModalOpen" @send-selected-users="getSelectedUsers"/>
  <div v-if="showQueModal" @click="handleQueModal" class="w-screen h-screen bg-modal-transparent fixed top-0 left-0 flex items-center justify-center z-[99]">
    <div  @click.stop class="bg-ss-gray p-6 w-1/2 h-auto flex flex-col items-start justify-start cursor-pointer ">
      <input class="ss-input" type="text" v-model="quetion" placeholder="Enter quetion">
      <div class="w-full">
        <button class="text-white bg-ss-purple py-1 px-4 rounded-sm ml-3" @click="addQue">Add</button>
        <button class="text-white bg-ss-light-purple py-1 px-4 rounded-sm ml-3" @click="handleQueModal">Cancel</button>
      </div>
    </div>
</div>

</template>

<script setup>
 import api from '@/api/api';
import { ref, watch, nextTick,watchEffect} from '@vue/runtime-core';
import LoaderSpiner from './LoaderSpiner.vue';
import UsersModal from './modals/UsersModal.vue';
import ReportFormat from './ReportFormat.vue';
import { useRoute } from 'vue-router';
import { useConfigStore } from '@/store/configStore';
 const {id}= useRoute().params
 const configStore=useConfigStore()
 
 const standupData= ref(null)
 const users = ref([])
 const quetion=ref('')


 const showQueModal=ref(false)
 const intialUser=ref([])
 const questions = ref([])
 const initialQue=ref([])
 const time=ref('')
 const initialTime=ref('')
 const loading = ref(false)
 const showTimeModal = ref(false)
 const updateLoading = ref(false)
 const setSaveBtnToDefault=ref(true)
 const messageViewType = ref('')
 const initialMessageViewType = ref('')
 const firstAlert = ref('')
 const initalFirstAlert=ref('')
 const secondAlert=ref('')
 const initialSecondAlert=ref()

 
 watchEffect(async()=>{
   loading.value=true
   const {data} = await api.get(`/standup/${id}`)

    standupData.value=data
    loading.value=false
    users.value=data.standup.users
    intialUser.value=data.standup.users
    questions.value=data.standup.quetions
    initialQue.value=data.standup.quetions
    time.value=data.standup.standUpTime
    initialTime.value=data.standup.standUpTime
    messageViewType.value=data.standup.messageViewType
    initialMessageViewType.value=data.standup.messageViewType
    firstAlert.value=getAlertTimeinMin(data.standup.firstAlert)
    initalFirstAlert.value=getAlertTimeinMin(data.standup.firstAlert)
    secondAlert.value=getAlertTimeinMin(data.standup.secondAlert)
    initialSecondAlert.value=getAlertTimeinMin(data.standup.secondAlert)
    console.log(messageViewType.value,initialMessageViewType.value)
     
    nextTick(() => {
     setSaveBtnToDefault.value=true
    })
    
    
 })


 

 function getSelectedUsers(selectedUsers){
  users.value=[...users.value,...selectedUsers]
 }

 function removeUser(user){
  users.value= users.value.filter((item)=>user.userId!==item.userId)
 }
 
 watch(() => [users.value,questions.value,time.value,messageViewType.value,firstAlert.value,secondAlert.value],()=>{
  if(JSON.stringify(users.value)==JSON.stringify(intialUser.value)&&JSON.stringify(questions.value)==JSON.stringify(initialQue.value)&&time.value===initialTime.value&& messageViewType.value==initialMessageViewType.value&&firstAlert.value===initalFirstAlert.value && secondAlert.value==initialSecondAlert.value){
     setSaveBtnToDefault.value=true
   
  }
  else{
    setSaveBtnToDefault.value=false
    
    
  }
 
 })

 function handleQueModal(){
  showQueModal.value=!showQueModal.value
 }

 function addQue(){
  console.log(questions.value)
  questions.value=[...questions.value,{quetion:quetion.value,}]
  showQueModal.value=false
 }

 function removeQue(index){
  questions.value=questions.value.filter((item,i)=>i!==index)
 }

async function updateStandup(){
  updateLoading.value=true
   await api.put(`/standup/${id}`,{
      questions:questions.value,
      time:time.value,
      users:users.value,
      messageViewType:messageViewType.value,
      firstAlert:substractStandupTime(firstAlert.value),
      secondAlert:substractStandupTime(secondAlert.value)
    })
    updateLoading.value=false
    setSaveBtnToDefault.value=true
    
 }


 // this function will substract the minutes from the time 
 function substractStandupTime(min){
 const  standupTime = time.value
 let date = new Date("01/01/2000 " + standupTime);
  date.setMinutes(date.getMinutes() - min);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
   return  hours + ':' + minutes + ' ' + ampm

 }

 // this function will retun the differnce between the standup time and alert time in minutes
 function getAlertTimeinMin(min){
  
  const  standupTime = time.value
  let date1 = new Date("01/01/2000 " + standupTime);
  let date2 = new Date("01/01/2000 " + min); // alert time
  let difference = date1 - date2;
  const minutes =Math.abs(difference / 1000 / 60)
  return minutes
  
 }

 
</script>
