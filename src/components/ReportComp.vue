<template>
  <div class="w-[85%]">
    <div class="w-full h-auto bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6  ml-16  mt-14">
      <div class="w-full flex items-center justify-between ">
        <p class="text-2xl text-white">Employee Report</p>
        <div class=" flex items-center">
          <select class="border border-[#5c5c5c] bg-ss-dark rounded-md text-white p-2 bg-b
      outline-none mr-2" name="team" id="team" v-model="selectedTeam">
            <option value="all">All </option>
            <option v-for="team in configStore.allTeams" :key="team._id" :value="team.name">{{ team.name }}</option>
          </select>
          <button class="ss-btn bg-ss-purple">Download</button>
        </div>
      </div>
      <div v-if="!loading" class="w-[90%]  flex flex-col items-center justify-center pt-12">
        <div class="w-full h-full flex items-center justify-evenly ">
          <table class="w-full ">
            <thead class="w-full text-white">
              <tr class="w-full">
                <th class="py-2">Name</th>
                <th class="p-2" v-for="types in listOfUsers[0].leaveCount" :key="types._id">{{ types.type }}</th>

              </tr>
            </thead>
            <tbody class="w-full text-white text-center mt-4">
              <tr v-for="user in listOfUsers" :key="user.userId" @click="handleClick(user)"
                class="w-full border-y-2 border-[#5c5c5c] my-2 ">
                <td class="py-2">{{ user.name }}</td>
                <td class="py-2" v-for="leave in user.leaveCount" :key="leave
                  ._id">{{ leave.count }}</td>

              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="w-full flex flex-col items-center justify-center mt-10">
        <LoaderSpiner />
      </div>

      <div class="w-full flex items-center justify-center mt-3">
        <div v-if="pageNumber > 0" @click="goToPrePage"
          class="w-[50px] h-[50px] p-2 flex items-center justify-center text-white cursor-pointer rounded-sm"><span><img
              src="https://res.cloudinary.com/qtalk/image/upload/v1679554838/SuperLeaves/left-arrow_gvppa6.svg"
              alt=""></span></div>
        <div v-for="page in pages" :key="page" @click="setPageNumber(page)"
          class="w-[50px] mx-3 h-[50px] p-2 flex items-center justify-center text-white cursor-pointer rounded-sm"
          :class="{ 'bg-[#1c1b1f]': page !== pageNumber, 'bg-ss-purple': page === pageNumber }">
          <span>{{ page + 1 }}</span>
        </div>
        <div v-if="pageNumber + 1 < numberOfPages" @click="goToNextPage"
          class="w-[50px] h-[50px] p-2 flex items-center justify-center text-white cursor-pointer rounded-sm"><span>
            <img src="https://res.cloudinary.com/qtalk/image/upload/v1679554830/SuperLeaves/right-arrow_hy9q7x.svg"
              alt="">
          </span></div>
      </div>
    </div>
  </div>
  <UserInfoModal v-if="showUserInfoModal" :user="selectedUser"  @closeUser-info-modal="closeUserInfoModal"/>
</template>

<script setup>

import { onMounted, ref, watchEffect } from '@vue/runtime-core';
import LoaderSpiner from './LoaderSpiner.vue';
import api from '@/api/api';
import { useConfigStore } from '@/store/configStore';
import UserInfoModal from './modals/UserInfoModal.vue';

const pages = ref([])
const pageNumber = ref(0)
const numberOfPages = ref(0)
const listOfUsers = ref([])
const totalUsers = ref(0)
const loading = ref(false)
const showUserInfoModal = ref(false)
const configStore = useConfigStore()
const selectedTeam = ref('all')
const dataRef = ref('')
const selectedUser = ref()
watchEffect(async () => {
  loading.value = true
  pages.value = new Array(numberOfPages.value).fill(null).map((v, i) => i)

  if (selectedTeam.value === 'all') {
    const { data } = await api.get(`/users/userlist?page=${pageNumber.value}`)
    dataRef.value = data
  }
  else {
    const { data } = await api.get(`/team?teamName=${selectedTeam.value}&page=${pageNumber.value}`)
    dataRef.value = data
  }
  listOfUsers.value = dataRef.value.users
  numberOfPages.value = dataRef.value.toalPages
  totalUsers.value = dataRef.value.userCount
  loading.value = false
  console.log(pageNumber.value)
})

onMounted(() => {
  configStore.fetchTeams()
  selectedTeam
})




function goToNextPage() {
  pageNumber.value = Math.min(numberOfPages.value - 1, pageNumber.value + 1)
}
function goToPrePage() {
  pageNumber.value = Math.min(numberOfPages.value - 1, pageNumber.value - 1)
}
function setPageNumber(index) {
  pageNumber.value = index
}

const handleClick = (user) => {
   selectedUser.value=user
  showUserInfoModal.value = true
}

const closeUserInfoModal =()=>{
  showUserInfoModal.value=false
}
</script>

<style scoped>.scrollbar-hide::-webkit-scrollbar {
  display: none !important;
}</style>

