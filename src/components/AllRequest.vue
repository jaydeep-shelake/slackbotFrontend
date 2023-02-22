
<template>
    <div class="w-[60%] h-full flex items-center justify-start flex-col">
    <div class="w-[90%] h-[85%] mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
        <div class="w-full flex items-center justify-between">
         <h2 class="text-2xl text-white">Requests</h2>
          <button class="ss-btn bg-ss-purple">View All</button>
        </div>
        <div  v-if="requestStore.allRequest.length>0"  class="w-full h-full mt-8">
            <div  v-for="request in requestStore.allRequest" :key="request._id" class="w-full p-5 bg-primary-gradient flex flex-col items-center justify-evenly text-white my-4">
              <div class="flex tems-center w-full justify-evenly">
                <div>
                <p>{{ request.name }}</p>
                </div>
                <div>
                <p> {{ new Date(request.dateFrom).toDateString() }} </p>
                </div>
                <div>
                <p>{{ new Date(request.dateTo).toDateString() }}</p>
                </div>
                <div>
                <p class="capitalize">{{ request.type }}</p>
                </div>
                <div>
                <p>{{ request.desc }}</p>
                </div>
              </div>
              <div class="flex items-start justify-start  w-full mt-4">
                <button v-if="!requestStore.laoding" class="ss-btn bg-ss-purple text-sm mr-2" @click="handleApproveRequest({userId:request.userId
,approver:request.approverId,teamId:request.teamId,messageTs:request.messageTs,approved:true,_id:request._id,type:request.type})">Approve</button>
                <button v-else class="ss-btn bg-ss-purple text-sm mr-2 flex items-center justify-center" ><LoaderSpiner/></button>

                <button class="ss-btn bg-ss-purple text-sm" @click="handleApproveRequest({userId:request.userId
,approver:request.approverId,teamId:request.teamId,messageTs:request.messageTs,approved:false})">Reject</button>
              </div>
            </div>
        </div>
        <div v-else class="w-full h-full mt-8 flex items-center justify-center">
         <h1 class="text-xl text-white">You dont have any requests</h1>
        </div>

    </div>
   </div>
  
</template>

<script setup>
import { useRequestStore } from '@/store/requestStore';
import { onMounted } from '@vue/runtime-core';
import LoaderSpiner from './LoaderSpiner.vue';
const requestStore = useRequestStore()
function handleApproveRequest(data){
requestStore.approveRequest(data)
}


onMounted(()=>{
    requestStore.getRequest()
    requestStore.updateNotiCount()
})
</script>

