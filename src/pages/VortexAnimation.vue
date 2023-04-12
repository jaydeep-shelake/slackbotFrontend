<template>
  <div class="w-screen h-screen">
 <button class="bg-white text-ss-purple p-2 border-none outline-none" @click="onClick" >Click</button>
   
  </div>
</template>

<script setup>


 const onClick=()=>{
  navigator.serviceWorker.controller.postMessage({
    type: 'trigger-api',
  });
  window.location.href="https://ssup.co"
   
  
   
 }


</script>