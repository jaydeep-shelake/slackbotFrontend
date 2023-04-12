<template>

        <div class=" absolute right-[20px] top-[20px] flex items-center justify-center">
            <div v-if="user" class="flex items-center justify-center">
                <div class="rounded-full w-[40px] border-2 border-ss-purple mr-4">
                    <img v-if="!user.avatar"
                        src="https://quiph-assets.s3.ap-south-1.amazonaws.com/avatars/pngs/drawable-xhdpi/1F935.png"
                        alt="avatar" class="rounded-full w-full">
                    <img v-else :src="user.avatar" alt="avatar" class="rounded-full w-full">
                </div>
                <button class="btn bg-ss-gray p-2 flex items-center text-sm justify-center text-white rounded-md"
                    @click="userStore.logout"> <img
                        src="https://res.cloudinary.com/qtalk/image/upload/v1679555236/SuperLeaves/logo-out_eagee1.svg"
                        alt="logut" class="mr-1"> logout</button>
            </div>

            <div v-else>
                <button class="btn bg-ss-purple p-2">Login</button>
            </div>
        </div>
   
</template>

<script setup>
import { useUserStore } from '@/store/userStore';
const userStore = useUserStore()
const user = userStore.userDetails
</script>