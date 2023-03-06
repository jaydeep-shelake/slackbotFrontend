<template>
  <RouterView/>
</template>

<script setup>
import {onBeforeUnmount, onMounted,watch} from "vue"
import { storeToRefs } from "pinia";
import {useSoketStore} from "@/store/soketStore"
import {useLeavesStore} from "@/store/leavesStore"
import {useUserStore} from "@/store/userStore"
import { useHolidayStore } from "./store/holidayStore"
import { useStandupStore } from "./store/standupStore";
const soketStore =useSoketStore()
const leavesStore = useLeavesStore()
const userStore = useUserStore()
const holidayStore =useHolidayStore()
const standupStore = useStandupStore()
const {user} = storeToRefs(userStore)
onMounted(()=>{

if(localStorage.getItem("slackUser")!==null){
  soketStore.setupSocketConnection()

leavesStore.fetchLeaves()
leavesStore.fetchLeavTypes()
userStore.fetchUserTeam()
holidayStore.fetchHolidays()
userStore.fetchTeamLeaves()
userStore.getUsersLeaveCount()
standupStore.fetchStandups()
}
// 
})

watch(user,()=>{
  if(localStorage.getItem("slackUser")){
  soketStore.setupSocketConnection()
  }
leavesStore.fetchLeaves()
leavesStore.fetchLeavTypes()
userStore.fetchUserTeam()
holidayStore.fetchHolidays()
userStore.fetchTeamLeaves()
standupStore.fetchStandups()
userStore.getUsersLeaveCount()
})



onBeforeUnmount(()=>{
  soketStore.disconnect()
})
</script>


