<template>
  <RouterView/>
</template>

<script setup>
import {onBeforeUnmount, onMounted} from "vue"

import {useSoketStore} from "@/store/soketStore"
import {useUserStore} from "@/store/userStore"
import { useHolidayStore } from "./store/holidayStore"

const soketStore =useSoketStore()

const userStore = useUserStore()
const holidayStore =useHolidayStore()

onMounted(()=>{

if(localStorage.getItem("slackUser")!==null){
  soketStore.setupSocketConnection()
   
}
  holidayStore.fetchHolidays()


  userStore.fetchUserTeam()
// 
})




onBeforeUnmount(()=>{
  soketStore.disconnect()
})
</script>


