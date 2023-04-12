<template>
   <div class="w-[80%] h-full flex items-center justify-start flex-col pl-10">
    <div class="w-full h-[85%]  bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6 mt-16">
    <div class="w-full flex items-center justify-between">
      <p class="text-white text-2xl ">Absence calendar</p>
      <select v-if="userStore.user && userStore.user.admin" class="border border-ss-purple bg-ss-dark rounded-md text-white p-2 bg-b
      outline-none mr-2" name="team" id="team" v-model="selectedTeam">
        <option value="all" class="text-white"> Select Team </option>
      <option v-for="team in configStore.allTeams" :key="team._id" :value="team.name">{{ team.name }}</option>
     </select>
    </div>
    <div class="text-center section w-full h-full mt-20">
      
      <v-calendar
        class="custom-calendar max-w-full text-white"
        :masks="masks"
        :attributes="attributes"
        disable-page-swipe
        is-expanded
        is-dark
    
      >
        <template v-slot:day-content="{ day, attributes }">
          <div class="flex flex-col h-full z-10 overflow-hidden">
            <span class="day-label text-sm text-white">{{ day.day }}</span>
            <div class="flex-grow overflow-y-auto overflow-x-auto">
              <p
                v-for="attr in attributes"
                :key="attr.key"
                class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
                :class="attr.customData.class"
              >
                {{ attr.customData.title }}
              </p>
            </div>
          </div>
        </template>
      </v-calendar>
    </div>
    </div>
    </div>
    <div v-if="teamLeaves<=0" class="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50 bg-[#00000068]">
      <LoaderSpiner/>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, ref,watch} from "vue"
  import { useUserStore } from "@/store/userStore";
  import { useConfigStore } from "@/store/configStore";
import { storeToRefs } from "pinia";
import LoaderSpiner from "./LoaderSpiner.vue";
  const userStore = useUserStore()
  const configStore = useConfigStore()
  const selectedTeam = ref('all')
 const {teamLeaves} = storeToRefs(userStore)
  const masks = ref({
          weekdays: 'WWW',
  })
  
  
  const colorArray = ['red','blue','green','teal','purple','fuchsia','pink','aqua']

  
  const attributes = computed(()=>{
    return teamLeaves.value.filter((item)=>item.type!=='remote works').map((item, i) => {
      return {
        key: item._id,
        customData: {
          title: item.name,
          class: `text-white h-[23px] rounded-none ${colorArray[i % colorArray.length]}`,

        },
        dates: { start: new Date(new Date(item.dateFrom).getFullYear(), new Date(item.dateFrom).getMonth(), parseInt(item.dateFrom.substring(8, 10))), end: new Date(new Date(item.dateTo).getFullYear(), new Date(item.dateTo).getMonth(), parseInt(item.dateTo.substring(8, 10))) },
      }
    })
  })

  watch(selectedTeam,()=>{
    userStore.fetchTeamLeaves(selectedTeam.value)
  })

onMounted(()=>{
  configStore.fetchTeams()
})

  </script>
  
  <style lang="postcss" scoped>
  .red{
    background:rgb(225 29 72);
  }
  .blue{
    background:rgb(14 165 233);
  }
  .green{
    background: green;
  }
  .teal{
    background: teal;
  }
  .purple{
    background: purple;
  }
  .fuchsia{
    background: fuchsia;
  }
  .pink{
    background: pink;
  }
  .yellow{
    background: yellow;
  }
  ::-webkit-scrollbar {
    width: 0px;
    
  }
  ::-webkit-scrollbar-track {
    display: none;
  }
  /deep/ .custom-calendar.vc-container {
    --day-border: 1px solid #b8c2cc;
    --day-border-highlight: 1px solid #b8c2cc;
    --day-width: 90px;
    --day-height: 90px;
    --weekday-bg: #f8fafc;
    --weekday-border: 1px solid #eaeaea;
    border-radius: 0;
    width: 100%;
    & .vc-header {
      background-color: #f1f5f8;
      padding: 10px 0;
    }
    & .vc-weeks {
      padding: 0;
    }
    & .vc-weekday {
      background-color: var(--weekday-bg);
      border-bottom: var(--weekday-border);
      border-top: var(--weekday-border);
      padding: 5px 0;
    }
    & .vc-day {
      padding: 0 5px 3px 5px;
      text-align: left;
      height: var(--day-height);
      min-width: var(--day-width);
      background-color: white;
      &.weekday-1,
      &.weekday-7 {
        background-color: #eff8ff;
      }
      &:not(.on-bottom) {
        border-bottom: var(--day-border);
        &.weekday-1 {
          border-bottom: var(--day-border-highlight);
        }
      }
      &:not(.on-right) {
        border-right: var(--day-border);
      }
    }
    & .vc-day-dots {
      margin-bottom: 5px;
    }
  }
  </style>