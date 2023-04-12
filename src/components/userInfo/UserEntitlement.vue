<template>
    <div class="w-full">
        <div v-for="leave  in user.leaveCount" :key="leave._id" class="flex items-center justify-start w-[100%] my-4">
            <div class="text-md  text-[#abb2b9] w-[40%]"> {{ leave.type }} : </div>
            <div class="w-[60%] border-b-1 border-[#abb2b9] flex items-center justify-start w-">
                <div class="w-[85%] bg-[#172229] h-[15px] rounded-sm">
                    <div class=" bg-[#84CAFE] h-full rounded-sm" :style="`width:${calculatePercentage(leave.count, leave.type).per}%`"></div>
                </div>
                <span class="ml-2 w-[15%] text-sm">
                    {{ leave.count }} / {{calculatePercentage(leave.count, leave.type).count}}

                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue"
import { useLeavesStore } from "@/store/leavesStore";


const leavesStore = useLeavesStore()

defineProps({
    user: {
        type: Object
    }
})
const calculatePercentage = (newValue,type) => {
    const item =  getOriginalValue(type)
 
     if(item){

        return {per:Math.ceil((newValue/item.noOfleaves) * 100),count:item.noOfleaves } 
     }
     else{
        return {per:0,count:0}
     }

      
}

const getOriginalValue  =  (type)=>{
    const leave =  leavesStore.leaveTypeCount.find(item=>item.type===type)
    return leave
}

</script>
