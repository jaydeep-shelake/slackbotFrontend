<template>
  <div class="w-[70%] h-full flex items-center justify-start flex-col">
    <div class="w-[90%] h-[85%] mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
      <div class="w-full flex items-center justify-end">
      <button v-if="!standupStore.loading" class="bg-[#634EFB] py-2 px-4 rounded-md border-none outline-none text-white" @click="handleSave">Save</button>
      <button v-else class="bg-[#634EFB] py-2 px-4 rounded-md border-none outline-none text-white flex items-center justify-center w-[70px]" @click="handleSave">
       <LoaderSpiner white/>
      </button>
      </div>
      <div class="w-full flex items-center justify-evenly text-white mt-[20px]">
        <div v-for="( tab , i ) in TABS " :key="tab" @click="activeTab=i" class="p-2 rounded-sm w-[25%] cursor-pointer text-center" :class="{'bg-secondary-gradient \ ':activeTab===i,'bg-ss-body':activeTab!==i}">
          <p>{{ tab }}</p>
        </div>
        
      </div>
      <KeepAlive>
        <component  :is="getCurrentComponent"></component>
      </KeepAlive>
      
     
    </div>
  </div>
</template>

<script setup>
import { computed, ref, } from "vue";
import BasicTab from "@/components/standup/BasicTab.vue"
import QuetionsTab from "../standup/QuetionsTab.vue";
import FormatTab from "../standup/FormatTab.vue";
import ScheduleTab from "../standup/ScheduleTab.vue";
import { useStandupStore } from "@/store/standupStore";
import LoaderSpiner from "../LoaderSpiner.vue";
const standupStore  = useStandupStore()
const activeTab = ref(0)

const getCurrentComponent = computed(()=>{
    switch (activeTab.value){
      case 0 : return BasicTab; 
      case 1 : return QuetionsTab
      case 2 : return ScheduleTab
      case 3: return FormatTab
      default: return ''
    } 
})
 
const TABS=[
  'BASIC',
  'QUESTIONS',
  'SCHEDULE',
  'FORMAT'
]
const handleSave = ()=>{
 standupStore.saveStanup()
}


</script>
