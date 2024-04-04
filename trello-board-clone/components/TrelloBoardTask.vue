<template>
  <div
    class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px] flex"
    :title="props.task.createdAt.toLocaleDateString()"
  >
    <DragHandle class="mr-2" />
    <span>{{ props.task.title }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types/index";
const props = defineProps<{
  task: Task;
}>();
</script>

<style scoped>
.sortable-drag .task {
  transform: rotate(5deg);
}
.sortable-ghost .task {
  position: relative;
}
.sortable-ghost .task::after {
  content: "";
  @apply absolute top-0 left-0 right-0 bottom-0 bg-slate-300 rounded;
}
</style>
