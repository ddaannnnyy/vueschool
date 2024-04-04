<template>
  <div
    class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px]"
    :title="props.task.createdAt.toLocaleDateString()"
  >
    <span>{{ props.task.title }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types/index";
const props = defineProps<{
  task: Task;
}>();
</script>

<style scoped></style>
