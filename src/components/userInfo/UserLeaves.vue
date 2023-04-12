<template>
  <div class="w-full flex items-center justify-center flex-col">
    <LoaderSpiner v-if="leaveStore.loading" />
    <div v-else-if="leaveStore.userLeaves <= 0" class="text-white">
      No Leaves found !
    </div>
    <div v-else>
      <div class="flex items-center justify-evenly mb-10">
        <DatePicker @send-date="getDates" />
        <button class="bg-purple-500 ml-4 py-1 px-3 rounded-md " @click="filterLeaves">Apply</button>
      </div>
      <div v-for="(leave, i ) in leaveStore.userLeaves" :key="leave._id"
        class="w-full flex items-center justify-evenly  p-2 rouded-sm text-white text-sm my-2 h-[60px]"
        :class="{ 'bg-[#1c1b1f]': i % 2 === 0 }">
        <div class="flex items-center justify-start">
          {{ leave.type }}
        </div>
        <div class="flex items-center justify-start">
          {{ leave.dateFrom.split("T")[0] }}
          -
          {{ leave.dateTo.split("T")[0] }}
        </div>
        <div class="flex items-center justify-start">
          {{ leave.noOfDaysOnLeave }} days
        </div>
        <div class="flex items-center justify-start" @click="handleOpenLeaveModal(leave)">
          <img src="https://res.cloudinary.com/qtalk/image/upload/v1679586154/SuperLeaves/info_vtlbo2.svg" alt="">
        </div>
      </div>
    </div>
  </div>
<LeaveModal v-if="showLeaveModal" :leave-id="selectedLeave._id" @close-modal="showLeaveModal=false"/>
</template>

<script setup>
import { useLeavesStore } from "@/store/leavesStore"
import LoaderSpiner from "../LoaderSpiner.vue";
import LeaveModal from "../modals/LeaveModal.vue";
import DatePicker from "@/components/DatePicker.vue"
import { onMounted, defineProps, ref } from "vue"
import { compairDates } from "@/helpers/helpers"
const leaveStore = useLeavesStore()

const props = defineProps({
  user: {
    type: Object
  }
})
const dateRange = ref({
  start: new Date(),
  end: new Date()
})

const showLeaveModal = ref(false)
const selectedLeave = ref()
onMounted(() => {
  leaveStore.fetchLeaves(props.user.userId)


})
const getDates = (dates) => {
 
  dateRange.value.start = dates.start
  dateRange.value.end = dates.end
}
const filterLeaves=()=>{

leaveStore.fetchLeavesInRange(compairDates(dateRange.value.start), compairDates(dateRange.value.end),props.user.userId)
}

const handleOpenLeaveModal =(leave)=>{
 showLeaveModal.value=true
 selectedLeave.value=leave
}
</script>
