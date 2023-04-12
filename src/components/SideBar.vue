<template>
    <div class="w-[15%] fixed top-0 left-0 h-screen bg-ss-dark p-2 flex items-center justify-start flex-col">
    
      <div>
        
        <router-link :to="{name:'HomePage'}" class="link-item-a flex items-center justify-start">
          <div class="link-item  flex items-center justify-center">
          <img src="https://res.cloudinary.com/qtalk/image/upload/v1673720706/ssup-ui-lib/thunder_svg_v1srjk.png" alt="icon">
          <p class="text-2xl font-semibold text-ss-purple ml-3">SuperLeaves</p>
        </div>
        </router-link>
      </div>
      <div class="link-item">
        
        <router-link :to="{name:'HomePage'}" class="link-item-a flex items-center justify-start">
          <img src="https://res.cloudinary.com/qtalk/image/upload/v1679377300/SuperLeaves/dashboard_ayata6.svg" alt="dashboard"
           class="mr-3 w-[20px]"
          >
          Dashboard
        </router-link>
      </div>
      <div class="link-item">
        <router-link :to="{name:'RequestPage'}" class="link-item-a flex items-center justify-start">
          <img src="https://res.cloudinary.com/qtalk/image/upload/v1679377690/SuperLeaves/request_fgry2g.svg" alt="request"
          class="mr-3 w-[20px]">
          Requests
        </router-link>
        <span v-if="requestStore.notiCount>0" class="rounded-full flex items-center justify-center bg-ss-purple text-white w-[40px] h-[34px]">
          {{ requestStore.notiCount }}
        </span>
      </div>
      <div class="link-item">
        <router-link :to="{name:'CalendarPage'}" class="link-item-a flex items-center justify-start">
          <img src="https://res.cloudinary.com/qtalk/image/upload/v1679377921/SuperLeaves/calendar_mwy5c9.svg" alt="calendar"
          class="mr-3 w-[20px]">
          Calendar</router-link>
      </div>
      <div class="link-item"  v-if="userStore.user && userStore.user.admin">
        <router-link :to="{name:'ReportPage'}" class="link-item-a flex items-center justify-start">
          <img src="https://res.cloudinary.com/qtalk/image/upload/v1679378094/SuperLeaves/report_e4rtoa.svg" alt="report"
          class="mr-3 w-[20px]">
          Report</router-link>
      </div>
 
      <div class="link-item" v-if="userStore.user && userStore.user.admin">
        <router-link :to="{name:'ConfigrationPage'}" class="link-item-a flex items-center justify-start">
          <img src="https://res.cloudinary.com/qtalk/image/upload/v1679378740/SuperLeaves/setting_iqcglz.svg" alt="config" class="mr-3 w-[20px]">
          Configration</router-link>
      </div>
      <div class="link-item">
        <router-link :to="{name:'StandupPage'}" class="link-item-a flex items-center justify-start">
           <img src="https://res.cloudinary.com/qtalk/image/upload/v1679378954/SuperLeaves/standup_iwkgg5.svg" class="mr-3 w-[20px]" alt="standup">
          Stand up</router-link>
      </div>
    </div>
  
</template>

<style>
.link-item .router-link-exact-active{
    background: linear-gradient(270deg, rgba(127, 60, 221, 0.162) 50%, rgba(92, 39, 165, 0) 100%);
}
</style>
<script setup>
import { useRequestStore } from '@/store/requestStore';
import { useUserStore } from '@/store/userStore';
const requestStore = useRequestStore()
const userStore  = useUserStore()
</script>