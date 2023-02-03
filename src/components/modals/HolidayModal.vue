<template>
    <div @click="holidayStore.toogleHolidayModal" class="w-screen h-screen bg-modal-transparent fixed top-0 left-0 flex items-center justify-center z-[99]">
  
        <div  @click.stop class="bg-ss-gray p-6 w-[400px] h-[60%] flex flex-col items-start justify-start  ">
        <form @submit.prevent="handleSubmit" class="w-full flex flex-col h-full items-center justify-between p-4">
            <div class="w-full">
         <input type="text" class="ss-input" placeholder="Holiday Name" v-model="name">
         <v-date-picker class="inline-block h-full w-full" v-model="date">
    <template v-slot="{ inputValue, togglePopover }">
      <div class="flex items-center">
        <button
          class="p-2 bg-ss-light-purple border border-ss-purple hover:bg-blue-200 text-ss-purple rounded-l focus:bg-blue-500 focus:text-white focus:border-blue-500 focus:outline-none"
          @click.prevent="togglePopover()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="w-4 h-4 fill-current"
          >
            <path
              d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
            ></path>
          </svg>
        </button>
        <input
          :value="inputValue"
          class="ss-input w-full py-1 px-2 appearance-none"
          readonly
        />
      </div>
    </template>
  </v-date-picker>
</div>
<div class="w-full flex items-center justify-start">
<button v-if="!holidayStore.loading" class="ss-btn bg-ss-purple" type="submit">Submit</button>
<button v-else class="ss-btn bg-ss-purple" type="submit"><LoaderSpiner/></button>
<button class="ss-btn bg-ss-light-purple ml-2"  @click="holidayStore.toogleHolidayModal">Cancel</button>
</div>
</form>
        </div>
  </div>
</template>

<script setup>

import { useHolidayStore } from '@/store/holidayStore';
import LoaderSpiner from '../LoaderSpiner.vue';
import { ref } from 'vue';

const holidayStore = useHolidayStore()
const date = ref(new Date())
const name  = ref("")
function handleSubmit(){
   holidayStore.addHoliday({name:name.value,date:date.value.toISOString()})
     name.value=""
     date.value=new Date()
}
</script>