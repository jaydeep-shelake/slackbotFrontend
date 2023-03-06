<template>
  <div
    class="w-[25%] h-full bg-ss-dark flex flex-col items-center justify-start"
  >
    <div class="w-[95%] h-[90%] flex items-center justify-start flex-col">
      <form
        @submit.prevent="submit"
        p
        class="bg-primary-gradient border rounded-md border-ss-light-purple p-6 flex flex-col items-center justify-sta mt-8 w-full"
      >
        <v-date-picker
          v-model="range"
          class="w-full"
          is-range
          is-dark
          color="purple"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <div class="flex flex-col sm:flex-row justify-start items-center">
              <div class="relative flex-grow">
                <svg
                  class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <input
                  class="flex-grow pl-8 pr-2 py-2 bg-black rounded w-full text-ss-purple"
                  :value="inputValue.start"
                  v-on="inputEvents.start"
                />
              </div>
              <span class="flex-shrink-0 m-2">
                <svg
                  class="w-4 h-4 stroke-current text-gray-600"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <div class="relative flex-grow">
                <svg
                  class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <input
                  class="bg-black flex-grow pl-8 pr-2 py-2 rounded w-full text-ss-purple"
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                />
              </div>
            </div>
          </template>
        </v-date-picker>
        <input class="ss-input" type="text" :value="approver" disabled />
        <select
          v-model="type"
          type="text"
          class="ss-input"
          placeholder="Enter Type"
        >
          <option
            value=""
            class="text-white bg-black border-none outline-none w-full"
          >
            Select Type
          </option>
          <option
            value="earned leaves"
            class="text-white bg-black border-none outline-none w-full"
            v-for="leaveType in leaveStore.leaveTypes" :key="leaveType"
          >
            {{ leaveType }}
          </option>
          
        </select>
       <div v-if="showErr" class="w-full bg-red-500 flex items-center justify-center text-white text-sm p-2 rounded-md my-2">
         Please Select leave type
       </div>
        <select
          v-model="substitute"
          type="text"
          class="ss-input"
          placeholder="Substitute"
        >
          <option
            value=""
            class="text-white bg-black border-none outline-none w-full"
          >
            Select Substitute
          </option>
          <option
            v-for="member in members"
            :key="member.userId"
            :value="member.userId"
          >
            {{ member.name }}
          </option>
        </select>
        <div class="w-full flex flex-col items-start justify-start">
          <label class="text-ss-purple" for="reason ">Reason</label>
          <textarea
            v-model="desc"
            name="reason"
            id="reason"
            class="ss-input"
          ></textarea>
        </div>
        <button
          v-if="leaveStore.leavesLoading"
          class="ss-btn bg-ss-purple mt-4 w-full flex items-center justify-center"
          type="submit"
        >
          <LoaderSpiner />
        </button>
        <button v-else class="ss-btn bg-ss-purple mt-4 w-full" type="submit">
          Submit
        </button>
      </form>
      <div class="w-full">
        <h2 class="text-ss-purple text-2xl mt-8">Upcoming public holidays</h2>
        <div class="w-full flex flex-col items-center justify-center">
          <div
            v-for="holiday in getFutureHoliday"
            :key="holiday._id"
            class="w-full bg-ss-gray p-4 rounded-sm my-3"
          >
            <div class="w-full">
              <p class="text-white text-sm">
                <span class="bg-primary-gradient p-2 mr-1">{{
                  holiday.name.length <=1? 'Public Holiday' :  holiday.name
                }}</span>
                on {{ new Date(holiday.date).toDateString() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {  ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useLeavesStore } from "@/store/leavesStore";
import { useUserStore } from "@/store/userStore";
import LoaderSpiner from "./LoaderSpiner.vue";
import { useHolidayStore } from "@/store/holidayStore";
const holidayStore = useHolidayStore();
const { getFutureHoliday } = storeToRefs(holidayStore)
const leaveStore = useLeavesStore();
const userStore = useUserStore();
const { approver, members, approverId } = storeToRefs(userStore);
const range = ref({
  start: new Date(),
  end: new Date(),
});

const substitute = ref("");
const type = ref("");
const desc = ref("");
const showErr = ref(false)
watch(type,()=>{
  if (type.value.length > 0) {
    showErr.value = false
  }
})
 

function submit() {
  if(substitute.value.length >0){
    showErr.value=false
    const approverData = members.value.find(item => item.userId === approverId.value)
    const substituteData = members.value.find(item => item.userId === substitute.value)
    const userData = userStore.user

    leaveStore.addLeave({
      dateTo: range.value.end.toISOString(),
      dateFrom: range.value.start.toISOString(),
      desc: desc.value,
      type: type.value,
      substitute: substitute.value,
      substituteData,
      userData,
      approverData
    });
    range.value.start = new Date();
    range.value.end = new Date();
    type.value = "";
    desc.value = "";
  }
  else{
    showErr.value=true
  }
  
  
}


</script>
