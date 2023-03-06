<template>
  <div class="w-[70%] h-full flex items-center justify-start flex-col">
          <div class="w-[90%] h-[85%] mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
              <div class="w-full flex items-center justify-between">
               <h2 class="text-2xl text-white">All Holidays</h2>
                <button class="ss-btn bg-ss-purple"  @click="holidayStore.toogleHolidayModal">Add Holiday</button>
              </div>
               <div v-if="loading" class="w-full h-full mt-8 flex items-center justify-center ">
               <LoaderSpiner/>
              </div>
              <div v-else class="w-full h-full mt-8 flex flex-col items-center justify-start text-white">
                <div class="w-full flex items-center justify-start flex-wrap">
                  <div v-for="holiday in holidayStore.allHolidays" :key="holiday._id" class="holiday-block  w-[80px] h-[80px] mx-2 flex flex-col items-center justify-center rounded-md border border-ss-light-purple p-2">
                   <span class="text-2xl">{{ holiday.date.slice(8,10) }}</span>
                  <span class="text-l">{{ getMonth(holiday.date) }}</span>
                  <span class="text-xs">{{ getDay(holiday.date) }}</span>
                  </div>
                  <div class="w-[80px] h-[80px] mx-2 flex flex-col items-center justify-center rounded-md border border-dashed border-ss-light-purple cursor-pointer " @click="holidayStore.toogleHolidayModal">
                    <img src="https://res.cloudinary.com/qtalk/image/upload/v1677843878/SuperLeaves/icons8-plus-math-50_q28sji.png" class="w-[30px] h-[30px]" alt="add">
                  </div>
                </div>
                
             </div>
            </div>
    </div>
     <HolidayModal v-if="holidayStore.openHolidayModal"/>   
</template >

<script setup>
import LoaderSpiner from "../LoaderSpiner.vue";
import HolidayModal from '../modals/HolidayModal.vue';
import { useHolidayStore } from '@/store/holidayStore';
import { ref } from "vue"

const holidayStore = useHolidayStore()
const DAYS_ARRAY = ['MON','TUE','WED','THU','FRI']
function getDay(date){
  const day = new Date(date)
  return DAYS_ARRAY[day.getDay() - 1]
}

function getMonth(date){
  const month = new Date(date).toDateString()
  return month.slice(3,7)
}
const loading = ref(false)
</script>

<style scoped>
.holiday-block{
    background: repeating-linear-gradient(-45deg, #8154c6, #6f60ac 0.75px, #1d1c25 0.75px, #363636 4.5px) no-repeat, #262626;
}

</style>