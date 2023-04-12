<template>
  <NavBar/>
  <main class="w-full h-screen bg-ss-dark flex items-start justify-end">
   <SideBar/>
  <AllLeaves/>
  <LeaveForm/>
  </main>
  
</template>

<script setup>
 import AllLeaves from "@/components/AllLeaves.vue";
import LeaveForm from '@/components/LeaveForm.vue';
import SideBar from "@/components/SideBar.vue"
import NavBar from "@/components/NavBar.vue";
// import {useUserStore} from "../store/userStore"
//  const userStore = useUserStore()

</script>

