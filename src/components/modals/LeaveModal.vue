<template>
    <div @click="closeModal" class="w-screen h-screen fixed top-0 left-0 flex items-center justify-end">
          
        <div @click.stop class="w-[600px] p-10 h-screen  bg-ss-gray flex flex-col  items-center justify-start">
            <div  v-if="loading" class="w-full h-full flex items-center justify-center">
                <LoaderSpiner/>
              </div>
            <div v-else  class="w-full text-white">
          <div class="w-full bg-neutral-5 flex items-center justify-start my-5 p-5">
            <div class="flex items-center justify-center mr-10 p-2 rounded-md cursor-pointer hover:bg-black">
                <img src="https://res.cloudinary.com/qtalk/image/upload/v1677746635/SuperLeaves/icons8-trash-30_rmn9ty.png" class="w-[20px] mr-2" alt="delete">
              <p class="text-sm">DELETE</p>
            </div>
            <div class="flex items-center justify-center mr-10  p-2 rounded-md cursor-pointer hover:bg-black">
                <img src="https://res.cloudinary.com/qtalk/image/upload/v1677746771/SuperLeaves/icons8-pdf-30_y49tte.png" class="w-[20px] mr-2" alt="pdf">
              <p class="text-sm">PDF</p>
            </div>
            <div class="flex items-center justify-center  p-2 rounded-md cursor-pointer hover:bg-black">
                <img src="https://res.cloudinary.com/qtalk/image/upload/v1677747029/SuperLeaves/icons8-logout-32_c9ktr5.png" class="w-[20px] mr-2" alt="cancel">
              <p class="text-sm" @click="handleCancelLeave">CANCEL</p>
            </div>
         </div>
         <div class="w-full flex items-center justify-start">
             <div>
                <img :src="leave.userAvatar" alt="" class="w-[80px] h-[80px] rounded-full mr-6">
             </div>
                <div class="flex flex-col items-start justify-center">
                    <p class="text-xs p-1 rounded-md bg-approved">{{ leave.type }}</p>
                    <p class="text-l my-1">{{ leave.name }}</p>
                    <p class="text-sm text-gray-500">{{ leave.type }}</p>
                </div>

            </div>
            <div class="w-full bg-neutra-5 mt-10 ">
               <div class="w-[90%] p-4 flex items-center justify-between">
                <p>Date</p>
                <p> {{ leave.dateTo.slice(0, 10).replaceAll('-', '/') }} -   {{ leave.dateFrom.slice(0, 10).replaceAll('-', '/') }}</p>
               </div>
                 <div class="w-[90%] p-4 flex items-center justify-between">
                    <p>Requested</p>
                    <p> {{ getDaysDiff(leave.dateTo, leave.dateFrom) }} day</p>
                 </div>
                 <div class="w-[90%] p-4 flex items-center justify-between">
                    <p>Approval</p>
                    <div class="flex items-center justify-center">
                     <img :src="leave.approverAvatar" alt="" class="w-[40px] h-[40px] rounded-full mr-2">
                     <p>{{ leave.approverName }}</p>
                    </div>
                    
                </div>

            </div>
            <div class="w-full flex items-center justify-start mt-10">
            <button class="btn bg-ss-purple py-2 px-3  text-white rounded-sm mr-2" @click="closeModal">Close</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits,defineProps,ref, watchEffect} from 'vue';
import { getDaysDiff } from '@/helpers/helpers';
import LoaderSpiner from '../LoaderSpiner.vue';
import { useLeavesStore } from '@/store/leavesStore';
import api from '@/api/api';
const emit = defineEmits(['closeModal'])
const leaveStore = useLeavesStore()
const leave = ref({})
const loading = ref(false)
const props = defineProps({
    leaveId:{
        type:String
    }
})
watchEffect(async()=>{
  loading.value=true
  const {data}=await api.get(`/leaves?leaveId=${props.leaveId}`)
  leave.value=data
  loading.value=false
})

function handleCancelLeave(){
  leaveStore.cancelLeave(leave)
}
function closeModal(){
    emit('closeModal')
}
</script>

