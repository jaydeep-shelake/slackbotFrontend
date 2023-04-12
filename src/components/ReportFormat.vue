<template>
    <div class="w-full flex items-start justify-start cursor-pointer">
      
            <div @click="handleOnClick('questions')"  class="w-[200px] mx-2 p-2 rounded-md bg-black flex flex-col items-center justify-between " :class="{ 'border-2 border-ss-purple': messageViewType === 'questions' }">
              <p class="text-white">Group by question</p>
              <div class="w-full p-2 bg-ss-light-purple mt-4 rounded-md">
                <p class="text-ss-purple text-l font-semibold">Daily Standup Report</p>
                <div class="w-full flex flex-col items-start justify-center mt-2">
                  <p class="text-ss-purple text-l ">Question 1</p>
                  <p class="text-gray-500 text-xs pl-2">User 1</p>
                  <p class="text-gray-600 text-sm pl-2">Answer for quetion 1</p>
                  <p class="text-gray-500 text-xs pl-2">User 2</p>
                  <p class="text-gray-600 text-sm pl-2">Answer for quetion 1</p>
                </div>
                <div class="w-full flex flex-col items-start justify-center mt-2">
                  <p class="text-ss-purple text-l ">Question 2</p>
                  <p class="text-gray-500 text-xs pl-2">User 1</p>
                  <p class="text-gray-600 text-sm pl-2">Answer for quetion 2</p>
                  <p class="text-gray-500 text-xs pl-2">User 2</p>
                  <p class="text-gray-600 text-sm pl-2">Answer for quetion 2</p>
                </div>
              </div>
            </div>
            <div @click="handleOnClick('user')" class="w-[200px] p-2 rounded-md bg-black flex flex-col items-center justify-between " :class="{ 'border-2 border-ss-purple': messageViewType === 'user' }">
              <p class="text-white">Group by user</p>
              <div class="w-full p-2 bg-ss-light-purple mt-4 rounded-md">
                <p class="text-ss-purple text-l font-semibold">Daily Standup Report</p>
                <div class="w-full flex flex-col items-start justify-center mt-2">
                  <p class="text-ss-purple text-l ">User 1</p>
                  <p class="text-gray-500 text-xs pl-2">Question 1</p>
                  <p class="text-gray-600 text-sm pl-2">Answer for quetion 1</p>
                  <p class="text-gray-500 text-xs pl-2">Question 2</p>
                  <p class="text-gray-600 text-sm pl-2">Answer for quetion 2</p>
                </div>
                <div class="w-full flex flex-col items-start justify-center mt-2">
                  <p class="text-ss-purple text-l ">User 2</p>
                  <p class="text-gray-500 text-xs pl-2">Question 1</p>
                  <p class="text-gray-600 text-sm pl-2">Answer for quetion 1</p>
                  <p class="text-gray-500 text-xs pl-2">Question 2</p>
                  <p class="text-gray-600 text-sm pl-2">Answer for quetion 2</p>
                </div>
              </div>
            </div>
           </div>
</template>

<script setup>
 import {ref,defineEmits} from "vue"

 const  messageViewType  = ref('questions')
  const emits = defineEmits(['get-format'])
  const handleOnClick=(type)=>{
    messageViewType.value=type
    emits('get-format',type)
  }
</script>