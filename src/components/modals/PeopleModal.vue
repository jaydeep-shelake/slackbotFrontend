<template>
  <div  class="w-screen h-screen bg-modal-transparent fixed top-0 right-0 flex items-center justify-end">
  <div @click.stop class="w-[600px] py-5 pl-0 pr-5 h-screen  bg-ss-gray flex  items-center justify-between">
    <div class="w-full">
    <input class="outline-none  p-2 bg-black  w-full my-3 text-ss-purple border-b border-ss-purple" type="text" v-model="name"  >
    <input class="outline-none  p-2 bg-black  w-full my-3 text-ss-purple border-b border-ss-purple" type="text" v-model="lastName"  >
    <input class="outline-none  p-2 bg-black  w-full my-3 text-ss-purple border-b border-ss-purple" type="text" v-model="email"  >
    <div class="w-full flex flex-col items-start justify-start">
    <label class="text-white text-md" id="team">Select Team</label>
    <select name="team" id="team">
      <option v-for="team in configStore.allTeams " :key="team._id" :value="team.name">
        {{team.name}}
      </option>
    </select>
    </div>

   </div>
  </div>
  </div>
</template>

<script setup>
// import api from '@/api/api';
import  { onMounted , ref } from "vue"
import {useConfigStore} from "@/store/configStore"
const email = ref("")
const name  = ref("")
const lastName = ref("")
const configStore = useConfigStore()
// async function debounceSearch(){
//   const {data} =await api.get(`/users/userByEmail?email=jaydeep@ssup.co`)
// console.log(data)
// }

onMounted(()=>{
 configStore.fetchTeams()
})
</script>

