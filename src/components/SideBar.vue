<template>
    <div class="w-[15%] h-screen bg-ss-dark p-2 flex items-center justify-start flex-col">
    
      <div class="link-item">
        <router-link to="/" class="link-item-a">Dashboard</router-link>
      </div>
      <div class="link-item">
        <router-link :to="{name:'RequestPage'}" class="link-item-a">Requests</router-link>
        <span v-if="requestStore.notiCount>0" class="rounded-full flex items-center justify-center bg-ss-purple text-white w-[40px] h-[34px]">
          {{ requestStore.notiCount }}
        </span>
      </div>
      <div class="link-item">
        <router-link :to="{name:'CalendarPage'}" class="link-item-a">Calendar</router-link>
      </div>
      <div class="link-item">
        <router-link to="/setting" class="link-item-a">Setting</router-link>
      </div>
      <div class="link-item">
        <router-link :to="{name:'ReportPage'}" class="link-item-a">Report</router-link>
      </div>
      <div class="link-item">
        <router-link :to="{name:'ConfigrationPage'}" class="link-item-a">Configration</router-link>
      </div>
      <div class="link-item">
        <router-link :to="{name:'StandupPage'}" class="link-item-a">Stand up</router-link>
      </div>
    </div>
  
</template>

<style>
.router-link-exact-active{
    background: linear-gradient(270deg, rgba(127, 60, 221, 0.162) 50%, rgba(92, 39, 165, 0) 100%);
}
</style>
<script setup>
import { useRequestStore } from '@/store/requestStore';
const requestStore = useRequestStore()
</script>