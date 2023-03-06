<template>
   <div class="w-[70%] h-full flex items-center justify-start flex-col">
      <div class="w-[90%] h-[85%] mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
          <div class="w-full flex items-center justify-between">
           <h2 class="text-2xl text-white">All leaves types</h2>
            <button class="ss-btn bg-ss-purple"  @click="toggleaddLeave">Add Leave Type</button>
          </div>
           <div v-if="loading" class="w-full h-full mt-8 flex items-center justify-center ">
           <LoaderSpiner/>
          </div>
          <div v-else class="w-full h-full mt-8 flex flex-col items-center justify-start text-white">
             <div class="w-[90%]  flex items-center justify-between my-2  p-3">
               <p class="w-[25%]">Type</p>
               <p class="w-[25%]">Count</p>
               <p class="w-[25%]"></p>
               <p class="w-[25%]"></p>
              </div>
            
            <div v-for="leaveType in leaves" :key="leaveType._id" class="w-[90%] bg-ss-gray flex items-center justify-between my-2  p-3">
             <p class="w-[25%]">{{ leaveType.type }}</p>
             <p class="w-[25%]" >{{ leaveType.noOfleaves}}</p>
             <div class="w-[25%]">
                  <button class="btn bg-rejected text-sm py-1 px-3 rounded-sm"
                  @click.stop="handleDeleteType(leaveType._id)"
                  >Delete</button>
               </div>
               <div class="w-[25%]">
                  <button class="btn bg-approved text-sm py-1 px-3 rounded-sm" @click.stop="handleEdit(leaveType)" >Edit</button>
               </div>
            </div>
          </div>
        </div>
   </div>
   <AddLeaveModal  v-if="showLeaveModal" @toggle-modal="closeModal" @send-leave-data="addLeave"  />
</template>

<script setup>
import {ref,onMounted} from "vue"
import AddLeaveModal from '../modals/AddLeaveModal.vue';
import LoaderSpiner from "../LoaderSpiner.vue";
import api from '@/api/api';
const loading = ref(false)
const leaves = ref([])
const showLeaveModal = ref(false)

onMounted(async()=>{
  loading.value=true
   const { data } = await api.get('leaves/allLeavesType')
   leaves.value = data
   loading.value=false
})
function toggleaddLeave() {
  showLeaveModal.value = true
}
function closeModal(boolean) {
  showLeaveModal.value = boolean
}
async function addLeave(data) {

  await api.post('/leaves/addLeaveType', data)
  showLeaveModal.value = false
}

function handleEdit(){
  
}

function handleDeleteType(){

}
 </script>

