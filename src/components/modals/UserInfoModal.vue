<template>
  <div class="h-screen w-screen fixed top-0 right-0 flex items-center justify-end" @click="closeModal">
    <div class="w-[40%] h-full bg-ss-gray p-10" @click.stop>
     <div class="w-full flex items-center justify-between">
      <div v-for="(tab,i) in TABS" :key="i" class="text-white p-2 cursor-pointer " @click="handleTab(i)" :class="{'bg-[#172229]  border-b-2  border-b-[#84CAFE]':activeTab===i}">
        {{ tab }}
      </div>
     </div>
     <div class="w-full flex flex-col items-start justify-start text-white mt-10">
      <component :user="user" :is="geComponent" @close-modal="closeModal"/>
     </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits,ref,defineProps, computed, onMounted} from 'vue';
import OverView  from '@/components/userInfo/OverView.vue';
import UserEntitlement from '@/components/userInfo/UserEntitlement.vue'
import UserLeaves from '../userInfo/UserLeaves.vue';
import { useLeavesStore } from "@/store/leavesStore";

const leavesStore = useLeavesStore()

const emits  = defineEmits(['closeModal'])
defineProps({
  user:{
    type:Object,
  }
})
const activeTab = ref(0)
const TABS =[
  'Overview',
  'Entitlement',
  'Additional',
  'Requests'
]
const geComponent = computed(()=>{
  switch(activeTab.value){
    case 0:
      return  OverView
    case 1:
      return UserEntitlement
    case 3:
      return UserLeaves
    default:
      return ''
  }
})
const closeModal=()=>{
  emits('closeUserInfoModal')
}

const handleTab=(i)=>{
activeTab.value=i
}

onMounted(()=>{
  leavesStore.fetchLeavTypes()
})
</script>
