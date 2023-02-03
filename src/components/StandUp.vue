<template>
  <div class="w-[80%] h-full flex items-center justify-start flex-col">
    <div class="w-[90%] h-auto mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
  <div class="w-full flex items-center justify-between">
     <p class="text-2xl text-white">Standup's</p>
     <button class="ss-btn bg-ss-purple">Create Standup</button>
  </div>
  <div v-if="standupStore.loading" class="w-full flex flex-col items-center justify-center mt-6">
    <LoaderSpiner/>
  </div>
  <div v-else class="w-full flex flex-col items-center justify-center mt-6">
   <div  v-for="standup in standupStore.allStandUp" :key="standup._id" class="w-full flex items-center justify-start flex-col border border-ss-light-purple rounded-md px-3 py-4 my-4">
      <router-link :to="{name:'SingleStandupPage',params:{id:standup._id}}" class="w-full">
    <div class="p-2 w-full flex items-center justify-between">
      <p class="text-2xl text-white">{{ standup.name }}</p>
      <div class="flex items-center justify-center">
    <button class=" bg-ss-purple text-ss-light-purple py-1 px-2 rounded-sm">View</button>
    <!-- <button class=" bg-ss-alpha-purple text-ss-light-purple ml-2 py-1 px-2 rounded-sm">Delete</button> -->
      </div>
    </div>
    <div class="w-full flex items-center justify-start mt-2 ml-2">
        <div class="py-1 px-3 text-ss-purple bg-ss-light-purple rounded-xl mx-2">
           <p>Active</p>
        </div>
        <div class="py-1 px-3 bg-ss-alpha-purple text-ss-light-purple rounded-xl mx-2">
           <p>Weekly</p>
        </div>
        <div class="py-1 px-3  text-ss-light-purple rounded-xl mx-2">
           <p>{{ standup.standUpTime }} am daily</p>
        </div>
        <div class="py-1 px-3  text-ss-light-purple rounded-xl mx-2">
           <p>{{ standup.users.length }} members</p>
        </div>
        <div class="py-1 px-3  text-ss-light-purple rounded-xl mx-2">
           <p>{{ standup.quetions.length  }} quetions</p>
        </div>
        <div class="py-1 px-3 bg-ss-alpha-purple text-ss-light-purple rounded-sm mx-2">
           <p>#{{standup.name}}</p>
        </div>
    </div>
   </router-link>
   </div>
  </div>
</div>
</div>

</template>

<script setup>
import { useStandupStore } from '@/store/standupStore'; 
import LoaderSpiner from './LoaderSpiner.vue';
const standupStore = useStandupStore()
</script>

