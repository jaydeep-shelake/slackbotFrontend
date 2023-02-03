<template>
    <NavBar/>
    <main class="w-full h-screen bg-ss-dark flex items-start justify-start mt-[70px]">
     <SideBar/>
    <AllRequest/>
    <LeaveForm/>
    </main>
    
</template>
  
  <script setup>
  import LeaveForm from '@/components/LeaveForm.vue';
  import SideBar from "@/components/SideBar.vue"
  import NavBar from "@/components/NavBar.vue";
import AllRequest from '@/components/AllRequest.vue';
  // import {useUserStore} from "../store/userStore"
  //  const userStore = useUserStore()
  
  </script>