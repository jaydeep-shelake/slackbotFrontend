<template>
   <div class="w-[85%] h-full flex items-center justify-start flex-col">
        <div class="w-[100%] h-[85%] mt-10 bg-ss-body rounded-lg flex flex-col items-start justify-start px-8 py-6">
            <div class="w-full flex items-center justify-between">
             <h2 class="text-2xl text-white">Roles</h2>'
            <button class="ss-btn bg-ss-purple" @click="showUserModal=true">Add Admin</button>
            </div>
            <div class="w-full flex items-start justify-between mt-10">
                <div class="w-[30%] flex flex-col items-start justify-start">
                  <div v-for="( role ) in roles" :key="role"  class="w-[300px] h-[100px] border  text-white my-2 flex  items-start justify-start p-6 flex-col z-50 cursor-pointer" @click="getRoleInfo(role)" :class="{' border-ss-purple bg-primary-gradient':selectedRole.name === role.name,'border-gray-400': selectedRole.name !== role.name }">
                     <p class="w-full">{{ role.name }} ({{ role?.members.length }})</p>
                     <div class="w-full flex items-center justify-start mt-2 relative">
                        <div v-for="(user , i ) in role.members" :key="user._id"  >
                           <img :src="user.avatar" :alt="user.name" class="w-[24px] h-[24px] border-2 border-gray-600 rounded-full absolute " :style="`z-index:${1 - i*1}; left:${i===0?0: i * 20}px;`">
                        </div>
                     </div>
                  </div>
                </div>  
                <div class="w-[70%] text-white">
                  <div class="w-full flex items-center justify-between p-2">
                    <div>PERSON</div>
                    <div>ROLE</div>
                  </div>
                  <div class="w-full flex items-center justify-between p-2 cursor-pointer hover:bg-primary-gradient" v-for="member in selectedRole.members" :key="member._id">
                     <div class="flex items-center justify-center my-2 ">
                        <img :src="member.avatar" :alt="member.name" class="w-[30px] h-[30px] rounded-full mr-2">
                        <p class="text-sm">{{ member.name }}</p>
                     </div>
                    
                     <div class="flex items-center justify-center">
                        <p class="mr-2 text-sm">{{ findObjectNamesByEmail(member.name) }}</p>
                        <img src="https://res.cloudinary.com/qtalk/image/upload/v1677746635/SuperLeaves/icons8-trash-30_rmn9ty.png" alt="delete" class="w-[20px]" @click="openWarning(member)">
                     </div>
                  </div>
                </div>  
            </div>
        </div>
    </div>
<UsersModal v-if="showUserModal" @send-selected-users="getUser" :applyOnBehalf="true" @close-modal="showUserModal=false"/>
<WarningModal v-if="showWarinigModal" @send-data="handleRemove" @close-modal="showWarinigModal=false" textMsg="Are you sure you want remove admin ?"  actionText="Remove" :loading="warningLoading" />
</template>
<script setup>
import api from "@/api/api"
import UsersModal from "../modals/UsersModal.vue";
import WarningModal from "../modals/WarningModal.vue"
import {  onMounted,ref } from "vue"
const selectedRole=ref({})
const showUserModal= ref(false)
const showWarinigModal = ref(false)
const warningLoading = ref(false)
const selectedUser = ref({})
let roles =ref( [
 {
    name: 'Administrator',
    members:[]
 },
 {
    name: 'Company manager',
    members: []
 },
 {
    name: 'Team manager',
    members: []
 },
 {
   name: 'Direct manager',
   members: []
 }
 

 
])

onMounted(async()=>{
 const {data}= await api.get('users/admin')
 roles.value.forEach((item)=>{
   if(item.name==='Administrator') item.members = data
 })
 
 getTeamOfLeads()
})
async function getTeamOfLeads(){
  const {data} = await api.get(`team/Team Leads`)
    roles.value.forEach((item)=>{
     if(item.name==="Company manager" || item.name==="Direct manager") item.members = data.approvers
     if(item.name==="Team manager") item.members = data.members
    })
 
}

function getRoleInfo(role){
    selectedRole.value=role
}

async function getUser(user){
 const {data} = await api.put('/users/makeAdmin',{_id:user._id, admin: true })
   roles.value.forEach((item)=>item.name==='Administrator'?item.members.push(data):'')
  showUserModal.value=false
}

function openWarning(user){
    showWarinigModal.value=true
    selectedUser.value=user
}

async function handleRemove(){
    warningLoading.value=true
    console.log(selectedUser.value)
     const { data } = await api.put('/users/makeAdmin', { _id:selectedUser.value._id,admin:false })
     warningLoading.value=false
     showWarinigModal.value=false
     roles.value.forEach((item) => item.name === 'Administrator' ? item.members=item.members.filter(memb=>memb._id!==data._id) : '')

}

function findObjectNamesByEmail(name) {
    const objectNames = [];
    roles.value.forEach(obj => {
        obj.members.forEach(member => {
            if (member.name === name) {
                objectNames.push(` ${obj.name}`);
            }
        });
    });
    
    return objectNames.toString();
}


</script>
