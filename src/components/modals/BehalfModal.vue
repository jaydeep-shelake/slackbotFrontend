<template>
 <div @click="closeMoal" class="w-screen h-screen fixed top-0 left-0 flex items-center justify-center ">
     <form
            @submit.prevent="submit"
             @click.stop
            class=" bg-ss-dark border w-[400px] rounded-md border-ss-light-purple p-6 flex flex-col items-center justify-sta mt-8 "
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
                      class="flex-grow pl-8 pr-2 py-2 bg-black rounded w-full text-ss-purple border border-ss-light-purple"
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
                      class="bg-black flex-grow pl-8 pr-2 py-2 rounded w-full text-ss-purple border border-ss-light-purple"
                      :value="inputValue.end"
                      v-on="inputEvents.end"
                    />
                  </div>
                </div>
              </template>
            </v-date-picker>
            <div class="w-full flex items-center justify-start mb-3 mt-6">
               <p class="text-white text-xs">Applying on behalf of</p>
               <p class="text-ss-purple text-sm ml-2">{{  selectedUser.name }}</p>
              </div>
            <select
              v-model="type"
              type="text"
              class="ss-input border border-ss-light-purple"
              placeholder="Enter Type"
            >
              <option
                value=""
                class="text-white bg-black border-none outline-none w-full"
              >
                Select Type
              </option>
              <option
                :value="leaveType"
                class="text-white bg-black border-none outline-none w-full capitalize"
                 v-for="leaveType in leaveStore.leaveTypes" :key="leaveType"
              >
                {{ makeCapitalize(leaveType) }}
              </option>
            
            </select>

            <select
              v-model="substitute"
              type="text"
              class="ss-input border border-ss-light-purple"
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
                class="ss-input border border-ss-light-purple"
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
 </div> 
</template>

<script setup>
import {ref,defineProps,defineEmits} from "vue"
import { useLeavesStore } from '@/store/leavesStore';
import {makeCapitalize} from "@/helpers/helpers"
const leaveStore  = useLeavesStore()
const props  = defineProps({
    userData:{
      type:Object
    },
    selectedUser:{
      type:Object
    }
})

const emit =  defineEmits(['closeFromModal'])
const approver = ref(props.userData.approvers[0])
const members  = ref(props.userData.members.filter(item=>item.userId!==props.selectedUser.userId))
const substitute = ref('')
const desc = ref('')
const type = ref('')
const range = ref({
    start: new Date(),
    end: new Date(),
})

function closeMoal(){
  emit('closeFromModal')
}

function submit(){
  emit('closeFromModal')
  const substituteData = members.value.find(item=>item.userId===substitute.value)
 leaveStore.addLeave({
  dateTo: range.value.end.toISOString(),
    dateFrom: range.value.start.toISOString(),
    desc: desc.value,
    type: type.value,
    substitute: substitute.value,
    approver: approver.value.userId,
    substituteData,
    approverData:approver,
    userData: props.selectedUser
 })
}

</script>
