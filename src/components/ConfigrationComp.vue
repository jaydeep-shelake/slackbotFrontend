<template>
   <div class="w-[85%] h-full flex items-center justify-start flex-col ">
    <div class="w-[90%]  mt-16 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">

        <div class="w-full flex items-center justify-between">
         <h2 class="text-2xl text-white">Configration</h2>
          <button class="ss-btn bg-ss-purple">Add Team</button>
        </div>
        <div class="w-full h-full mt-12 flex items-start  flex-wrap">
            <router-link :to="{name:'TeamsPage'}" class="w-[200px] h-[200px] flex flex-col items-center justify-center bg-[#1c1b1f] rounded-md mr-4">
              <img class="w-[50px] h-[50px]" src="https://res.cloudinary.com/qtalk/image/upload/v1679384103/SuperLeaves/team_m2ivgc.svg" alt="add"/>
             <p class="text-xl text-white mt-3">Add Team</p>
            </router-link>
            <div @click="addUser" class="w-[200px] h-[200px] flex flex-col items-center justify-center bg-[#1c1b1f] rounded-md mx-4">
              <img class="w-[50px] h-[50px]" src="https://res.cloudinary.com/qtalk/image/upload/v1679384235/SuperLeaves/people_fpjpzj.svg" alt="add"/>
             <p class="text-xl text-white mt-3">Add People</p>
            </div>
            <router-link :to="{name:'leaveTypePage'}" class="w-[200px] h-[200px] flex flex-col items-center justify-center bg-[#1c1b1f] rounded-md mx-4">
              <img class="w-[50px] h-[50px]" src="https://res.cloudinary.com/qtalk/image/upload/v1679384385/SuperLeaves/flag_jmffwv.svg" alt="add"/>
             <p class="text-xl text-white mt-3" >Add Leave Type</p>
            </router-link>
            <router-link :to="{name:'allHolidays'}" class="w-[200px] h-[200px] flex flex-col items-center justify-center bg-[#1c1b1f] rounded-md ml-2" >
              <img class="w-[50px] h-[50px]" src="https://res.cloudinary.com/qtalk/image/upload/v1679384678/SuperLeaves/bag_fn2law.svg" alt="add"/>
              <p class="text-xl text-white mt-3">Add Holiday</p>
            </router-link>
            <router-link :to="{name:'RolesPage'}" class="w-[200px] h-[200px] flex flex-col items-center justify-center bg-[#1c1b1f] rounded-md mr-2 mt-8" >
              <img class="w-[50px] h-[50px]" src="https://res.cloudinary.com/qtalk/image/upload/v1679384857/SuperLeaves/role_fstgm6.svg" alt="add"/>
              <p class="text-xl text-white mt-3">Add Roles</p>
            </router-link>
        </div>
</div>
</div>

<MessageModal v-if="configStore.openMsgModal"/>
<PeopleModal  v-if="configStore.peopleModal"/>

</template>

<script setup>

import MessageModal from './modals/MessageModal.vue';
import PeopleModal from './modals/PeopleModal.vue'
import { useConfigStore } from '@/store/configStore';


const configStore=useConfigStore()

async function addUser(){
  configStore.togglePeopleModal()

}




</script>