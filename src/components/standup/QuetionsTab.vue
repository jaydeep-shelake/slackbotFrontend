<template>
    <div class="w-full flex flex-col items-start justify-start mt-[50px]">
        <div v-for="(que, i) in newStandup.questions " :key="i"
            class=" h-[50px] text-white my-3 bg-[#101012] p-2 w-[400px] flex items-center justify-start border rounded-md border-ss-light-purple focus-within:border-ss-purple">
            <input type="text" v-model="que.quetion" class=" outline-none border-none h-full bg-transparent w-[90%]" placeholder="Type question">
            <div class="cursor-pointer ml-2" @click="removeQue(i)" >
                  <img class="w-[20px] h-[20px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674196054/SuperLeaves/X_bzheyy.svg" alt="cross">
                </div>
        </div>
        <div>
            <div class="border-2 border-dashed border-ss-purple flex items-center justify-center p-2  cursor-pointer my-2"
                @click="addQue">
                <img src="https://res.cloudinary.com/qtalk/image/upload/v1674037089/SuperLeaves/Plus_ttu9ws.svg" alt="add">
                <p class="text-white ml-2">Add Question </p>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useStandupStore } from "@/store/standupStore";
import { storeToRefs } from "pinia";
const standupStore = useStandupStore()
const { newStandup } = storeToRefs(standupStore)

const addQue=()=>{
    newStandup.value.questions.push({quetion:''})
}
const removeQue=(index)=>{
    console.log(index)
    newStandup.value.questions=newStandup.value.questions.filter((item,i)=>i!==index)
}

</script>
