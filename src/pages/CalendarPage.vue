<template>
    <ConfigSlot>
        <CalendarComp/>
    </ConfigSlot>
</template>
<script setup>
import CalendarComp from '@/components/CalendarComp.vue';
import ConfigSlot from './configration/ConfigSlot.vue'
</script>