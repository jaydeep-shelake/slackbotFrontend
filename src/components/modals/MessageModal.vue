<template>
 <div @click="configStore.toggleMsgModal" class="w-screen h-screen bg-modal-transparent fixed top-0 left-0 flex items-center justify-center z-[99]">
  
  <div  @click.stop class="bg-ss-gray border-1 border-ss-purple p-6 w-[400px] h-auto flex flex-col items-center justify-center  ">
    <p class="text-2xl text-ss-light-purple">{{ configStore.msgModalMsg }}</p>
    <div class="w-full flex items-center justify-start">
      <button class="ss-btn bg-ss-purple w-[120px]">Ok</button>
    </div>
  </div>
  </div>
</template>

<script setup>
import {useConfigStore} from "@/store/configStore"

const configStore = useConfigStore()

</script>

