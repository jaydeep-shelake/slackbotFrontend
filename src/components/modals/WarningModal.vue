<template>
  <div @click="handleClose" class="h-full w-full fixed top-0 left-0 flex items-center justify-center z-[99]">
  <div @click.stop class="bg-ss-gray p-6  w-[300px] flex flex-col items-center justify-center cursor-pointer border border-ss-light-purple rounded-md">
    <div class="flex flex-col text-white items-center justify-center">
        <img src="https://res.cloudinary.com/qtalk/image/upload/v1678098237/SuperLeaves/icons8-warning-58_mme0e6.png" alt="warning" class="w-[40px]">
        <p class="mt-2 text-center">{{ textMsg }}</p>
    </div>
    <div>
    <button class="ss-btn bg-ss-purple mt-10 flex items-center justify-center" v-if="loading" ><LoaderSpiner :white="true"/></button>
    <button class="ss-btn bg-ss-purple mt-10" @click="sendAction" v-else >{{ actionText }}</button>
    </div>
  </div>
  </div>
</template>

<script setup>
import {defineProps,defineEmits} from "vue"
import LoaderSpiner from "../LoaderSpiner.vue";
 defineProps({
    textMsg:{
        type:String,
        default:''
    },
    actionText:{
        type:String,
        default:''
    },
    loading:{
        type:Boolean,
        default:false
    }
})
const emits = defineEmits(['closeModal','sendData'])
function sendAction(){
    emits('sendData')
}

function handleClose(){
    emits('closeModal')
}
</script>