<template>
  <div class="w-full flex items-center justify-center mt-3">
          <div v-if="pageNumber > 0" @click="goToPrePage" class="w-[50px] h-[50px] p-2 flex items-center justify-center text-white bg-ss-light-purple cursor-pointer"><span>Pre</span></div>
             <div v-for="page in pages" :key="page" @click="setPageNumber(page)"  class="w-[50px] mx-3 h-[50px] p-2 flex items-center justify-center text-white cursor-pointer " :class="{ 'bg-ss-light-purple': page !== pageNumber, 'bg-ss-purple': page === pageNumber }">
             <span>{{ page + 1 }}</span>
             </div>
        <div v-if="pageNumber+1 < numberOfPages" @click="goToNextPage" class="w-[50px] h-[50px] p-2 flex items-center justify-center text-white bg-ss-light-purple cursor-pointer"><span>Next</span></div>
    </div>
</template>

<script setup>

import api from "@/api/api"
import {ref,watchEffect,defineProps,defineEmits} from "vue"

const pages = ref([])
const pageNumber = ref(0)
const numberOfPages = ref(0)
const dataRef = ref('')
const totalCount = ref(0)
const loading = ref(false)
const props= defineProps({
    url:{
        type:String
    }
})

const emits  = defineEmits(['sendPageData','loading'])
function goToNextPage() {
    pageNumber.value = Math.min(numberOfPages.value - 1, pageNumber.value + 1)
}
function goToPrePage() {
    pageNumber.value = Math.min(numberOfPages.value - 1, pageNumber.value - 1)
}
function setPageNumber(index) {
    pageNumber.value = index
}
watchEffect(async () => {
    loading.value= true
     emits('loading', true)
    pages.value = new Array(numberOfPages.value).fill(null).map((v, i) => i)
    const { data } = await api.get(`${props.url}?page=${pageNumber.value}`)
    loading.value=false
    dataRef.value = data
    numberOfPages.value = data.totalPages
    totalCount.value=  data.total
    emits('sendPageData',{data})
    emits('loading',false)

})
</script>
