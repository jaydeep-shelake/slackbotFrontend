<template>
   <div class="w-[70%] h-full flex items-center justify-start flex-col">
    <div class="w-[90%] h-[85%] mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">

        <div class="w-full flex items-center justify-between">
         <h2 class="text-2xl text-white">Configration</h2>
          <button class="ss-btn bg-ss-purple">Add Team</button>
        </div>
        <div class="w-full h-full mt-12 flex items-start justify-evenly flex-wrap">
            <router-link :to="{name:'TeamsPage'}" class="w-[200px] h-[200px] add-frame">
              <img class="w-[50px] h-[50px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674037089/SuperLeaves/Plus_ttu9ws.svg" alt="add"/>
             <p class="text-xl text-white mt-3">Add Team</p>
            </router-link>
            <div @click="addUser" class="w-[200px] h-[200px] add-frame">
              <img class="w-[50px] h-[50px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674037089/SuperLeaves/Plus_ttu9ws.svg" alt="add"/>
             <p class="text-xl text-white mt-3">Add People</p>
            </div>
            <router-link :to="{name:'leaveTypePage'}" class="w-[200px] h-[200px] add-frame">
              <img class="w-[50px] h-[50px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674037089/SuperLeaves/Plus_ttu9ws.svg" alt="add"/>
             <p class="text-xl text-white mt-3" >Add Leave Type</p>
            </router-link>
            <router-link :to="{name:'allHolidays'}" class="w-[200px] h-[200px] add-frame" >
              <img class="w-[50px] h-[50px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674037089/SuperLeaves/Plus_ttu9ws.svg" alt="add"/>
              <p class="text-xl text-white mt-3">Add Holiday</p>
            </router-link>
            <router-link :to="{name:'RolesPage'}" class="w-[200px] h-[200px] add-frame" >
              <img class="w-[50px] h-[50px]" src="https://res.cloudinary.com/qtalk/image/upload/v1674037089/SuperLeaves/Plus_ttu9ws.svg" alt="add"/>
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