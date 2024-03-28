<script setup lang="ts">
import { VICTORY_MESSAGE } from '@/settings'
defineProps<{
  wordOfTheDay: string
}>()
</script>

<template>
  <p>{{ wordOfTheDay }}</p>
  <input type="text" name="" id="" />
  <p>{{ VICTORY_MESSAGE }}</p>
  <p>Better luck next time</p>
</template>
