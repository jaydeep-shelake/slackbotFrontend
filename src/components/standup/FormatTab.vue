<template>
  <div class="flex items-start justify-start mt-[50px]">
   <ReportFormat @get-format="handleFormat"/>
  </div>
</template>

<script setup>
import ReportFormat from "@/components/ReportFormat.vue"
import { useStandupStore } from "@/store/standupStore";
import { storeToRefs } from "pinia";

const standupStore = useStandupStore()
const {newStandup} =storeToRefs(standupStore)

const handleFormat =(format)=>{
  newStandup.value.format=format

}
</script>