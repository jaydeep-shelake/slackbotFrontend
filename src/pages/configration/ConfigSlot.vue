<template>
    <NavBar/>
    <main class="w-full h-screen bg-ss-dark flex items-start justify-center pl-16">
     <SideBar/>
     <slot >
      <ConfigrationComp/>
    </slot>
  
    </main>

  </template>
  
  <script setup>
 
  import SideBar from "@/components/SideBar.vue"
  import NavBar from "@/components/NavBar.vue";
  import ConfigrationComp from "@/components/ConfigrationComp.vue"
  // import {useUserStore} from "../store/userStore"
  //  const userStore = useUserStore()
  
  </script>
  
  
