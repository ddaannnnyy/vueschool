<script setup lang="ts">
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings'
import { ref } from 'vue'
import englishWords from '../englishWordsWith5Letters.json'

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => {
      return englishWords.includes(wordGiven)
    }
  }
})

const guessInProgress = ref('')
const guessSubmitted = ref('')
</script>

<template>
  <p>{{ wordOfTheDay }}</p>
  <input type="text" v-model="guessInProgress" @keydown.enter="guessSubmitted = guessInProgress" />
  <p
    v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  ></p>
</template>
