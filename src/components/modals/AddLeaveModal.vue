<template>
    <div @click="closeModal" class="w-screen h-screen bg-modal-transparent fixed top-0 left-0 flex items-center justify-center z-[99]">
  
        <div  @click.stop class="bg-ss-gray p-6 w-[400px] h-[60%] flex flex-col items-start justify-start  ">
        <form @submit.prevent="handleSubmit" class="w-full flex flex-col h-full items-center justify-between p-4">
            <div class="w-full">
         <input type="text" class="ss-input" placeholder="Leave name" v-model="leaveName">
         <input type="text" class="ss-input" placeholder="Leave count" v-model="leaveCount">
         
</div>
<div class="w-full flex items-center justify-start">
<button v-if="!loading" class="ss-btn bg-ss-purple" type="submit">Submit</button>
<button v-else class="ss-btn bg-ss-purple" type="submit"><LoaderSpiner/></button>
<button class="ss-btn bg-ss-light-purple ml-2"  @click="closeModal">Cancel</button>
</div>
</form>
        </div>
  </div>
</template>

<script setup>


import LoaderSpiner from '../LoaderSpiner.vue';
import { defineEmits,ref } from 'vue';
const leaveName = ref('')
const leaveCount = ref(0)
const loading = ref(false)
const emit = defineEmits(['toggleModal','sendLeaveData']);

function closeModal(){
    emit('toggleModal',false)
}

function handleSubmit(){
    const smallCaseString = leaveName.value.split(" ")
     const newString = smallCaseString.map((word) => { 
    return word[0].toLowerCase() + word.substring(1); 
}).join(" ");
    emit('sendLeaveData',{leaveName:newString,leaveCount:parseInt(leaveCount.value)})
    leaveCount.value=0
    leaveName.value=""
}


</script>