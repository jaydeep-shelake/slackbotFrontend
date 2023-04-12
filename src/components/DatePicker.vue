<template>
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
                      class="text-white w-4 h-full mx-2 absolute pointer-events-none"
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
                      class="flex-grow pl-8 pr-2 py-2 bg-black rounded w-full text-white"
                      :value="inputValue.start"
                      v-on="inputEvents.start"
                    />
                  </div>
                  <span class="flex-shrink-0 m-2">
                    <svg
                      class="w-4 h-4 stroke-current text-white"
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
                      class="text-white w-4 h-full mx-2 absolute pointer-events-none"
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
                      class="bg-black flex-grow pl-8 pr-2 py-2 rounded w-full text-white"
                      :value="inputValue.end"
                      v-on="inputEvents.end"
                    />
                  </div>
                </div>
              </template>
  </v-date-picker>

</template>

<script setup>
import {ref,defineEmits,  watch} from "vue"
const emits = defineEmits(['sendDate'])
const range = ref({
    start: new Date(),
    end: new Date(),
});

watch(range,()=>{
    emits('sendDate', range.value)
})



</script>
