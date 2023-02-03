<template>
    <div class="w-full flex items-center justify-between p-3 fixed top-0 left-0 bg-black ">
    <div class="link-item  flex items-center justify-center">
        <img src="https://res.cloudinary.com/qtalk/image/upload/v1673720706/ssup-ui-lib/thunder_svg_v1srjk.png" alt="icon">
        <p class="text-2xl font-semibold text-ss-purple ml-3">SuperLeaves</p>
      </div>

     <div class="flex items-center justify-center">
        <div v-if="user" class="flex items-center justify-center" >        
        <div  class="rounded-full w-[40px] border-2 border-ss-purple mr-4">
            <img v-if="!user.avatar" src="https://quiph-assets.s3.ap-south-1.amazonaws.com/avatars/pngs/drawable-xhdpi/1F935.png" alt="avatar" class="rounded-full w-full">
            <img v-else  :src="user.avatar" alt="avatar" class="rounded-full w-full">
        </div>
        <button class="btn bg-ss-gray p-2 flex items-center text-sm justify-center text-white rounded-md" @click="userStore.logout"> <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNCAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2LjMxMjUgOC45NDUzMUwyMC4yNSAxMi44ODI4TDE2LjMxMjUgMTYuODIwMyIgc3Ryb2tlPSIjRUM5MjhFIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik05Ljc1IDEyLjg4MjhIMjAuMjUiIHN0cm9rZT0iI0VDOTI4RSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNOS43NSAyMS4xMzI4SDQuNUM0LjMwMTA5IDIxLjEzMjggNC4xMTAzMiAyMS4wNTM4IDMuOTY5NjcgMjAuOTEzMUMzLjgyOTAyIDIwLjc3MjUgMy43NSAyMC41ODE3IDMuNzUgMjAuMzgyOFY1LjM4MjgxQzMuNzUgNS4xODM5IDMuODI5MDIgNC45OTMxMyAzLjk2OTY3IDQuODUyNDhDNC4xMTAzMiA0LjcxMTgzIDQuMzAxMDkgNC42MzI4MSA0LjUgNC42MzI4MUg5Ljc1IiBzdHJva2U9IiNFQzkyOEUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==" alt="logut" class="mr-1"> logout</button>
        </div>

        <div v-else>
           <button class="btn bg-ss-purple p-2">Login</button>
        </div>
     </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/store/userStore';
const userStore= useUserStore()
const user = userStore.userDetails
</script>