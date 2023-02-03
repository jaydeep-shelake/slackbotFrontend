<template>
    <div class="w-full h-screen flex items-center justify-center bg-ss-body">
  <div  class="w-[19rem] h-[19rem] flex flex-col items-center justify-center bg-ss-dark rounded-md">
    <img src="@/assets/slack-logo.png" alt="slack-logo" class="w-[50px]">
    <button v-if="loading" @click="loginWithSlack" class="ss-btn text-ss-light-purple mt-6">Loading...</button>
    <a  v-else  @click="loginWithSlack" class="ss-btn bg-ss-purple text-ss-light-purple mt-6">Login with slack</a>
    <button ></button>
  </div>
</div>
</template>

<script setup>
import {onMounted, ref,onBeforeUnmount} from "vue"
import { useUserStore } from "@/store/userStore";
// import axios from "axios"
const ngrokUrl = "https://callbackpage.onrender.com" //only for devlopment "https://callbackpage.onrender.com"

const url =`https://slack.com/oauth/v2/authorize?client_id=110386328693.4590206438709&user_scope=identity.team,identity.basic,identity.email,identity.avatar&redirect_uri=${ngrokUrl}`
const  loading = ref(false)
const userStore = useUserStore()

function openPopup () {
    const width = 400
    const height = 600
    const left = screen.width / 2 - width / 2
    const top = screen.height / 2 - height / 2

    
    return window.open(
      url,
      '',
      'toolbar=no,"_blank", location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
        width +
        ', height=' +
        height +
        ', top=' +
        top +
        ', left=' +
        left
    )
  }

async function loginWithSlack(){
    loading.value=true
    openPopup()
    
    
  }

 

  const handleCallbackFromSlack=(event={})=>{
 
  if(!event.data) return
  if(event.origin===ngrokUrl&&event.data){
    console.log(event.data)
     userStore.fetchUser(event.data)

  }
}

onMounted(()=>{
  window.addEventListener('message',handleCallbackFromSlack)

})
onBeforeUnmount(()=>{
  window.addEventListener('message',handleCallbackFromSlack)

})


</script>

<!-- <style>
.class{
    color:#d0bcff;
}
</style> -->
