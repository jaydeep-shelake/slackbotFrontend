<template>
    <div class="py-1 px-3 text-white rounded-xl mx-2 mt-[50px]">
     
        <label for="time" class="">Select Time</label>
        <div class="mt-4 text-ss-light-purpl border border-ss-light-purple py-2 px-4 flex items-center justify-center rounded-md w-[200px]"> <img class="mr-2"
                src="https://res.cloudinary.com/qtalk/image/upload/v1675843135/SuperLeaves/icons8-wall-clock-24_prhyzu.png"
                alt="date">

            <select v-model="newStandup.time" name="time" id="time" class="bg-black outline-none border-none">
                <option value="">Select Time</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="11:30 PM">11:30 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="12:30 PM">12:30 PM</option>
            </select>
        </div>
     
        <div class="w-full flex flex-wrap items-start justify-start flex-col mt-8">
          <div class=" py-1 px-3 bg-ss-alpha-purple text-ss-light-purple rounded-md mb-4 ">
           <p class="text-white text-l">Reminders :</p>
          </div>
          <div class="flex items-start justify-start flex-col mb-6">
            <label for="alert1" class="text-white mb-2">Alice sends a reminder to each participant</label>
                <select  name="alert" id="alert1" class="border text-ss-light-purple border-ss-light-purple p-2 outline-none bg-black
                 rounded-md" v-model="newStandup.firstAlert" >
                
                    <option value="">Select reminder</option>
                  <option  value="30" class="text-ss-purple">30 minute before the standup</option>
                  <option  value="60" class="text-ss-purple">60 minute before the standup</option>
                </select>
          </div>
    
          <div class="flex items-start justify-start flex-col">
            <label for="alert1" class="text-white mb-2"> Alice sends a another reminder to each participant</label>
                <select  v-model="newStandup.secondAlert"  name="alert" id="alert1" class="border border-ss-light-purple p-2 outline-none bg-black  text-ss-light-purple rounded-md">
                    <option value="">Select reminder</option>
                  <option  value="30"  >30 minute before the standup</option>
                  <option  value="15"  >15 minute before the standup</option>
                </select>
          </div>
    
        </div>
    </div>
</template>

<script setup>
 import {useStandupStore} from "@/store/standupStore"
import { storeToRefs } from "pinia"
 const standupStore  = useStandupStore()
 const {newStandup} = storeToRefs(standupStore)

  
</script>

