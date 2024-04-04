<template>
  <div>
    <draggable
      class="flex gap-4 overflow-x-auto items-start"
      v-model="columns"
      group="columns"
      item-key="id"
    >
      <template #item="{ element: column }: { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="font-bold mb-4">
            {{ column.title }}
          </header>
          <TrelloBoardTask
            v-for="task in column.tasks"
            :key="task.id"
            :task="task"
          />
          <footer>
            <button class="text-gray-500" @click="">+ Add a card</button>
          </footer>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import type { Column } from "~/types/index";
import { nanoid } from "nanoid";
import draggable from "vuedraggable";
const columns = ref<Column[]>([
  {
    id: nanoid(),
    title: "Backlog",
    tasks: [
      {
        id: nanoid(),
        title: "Create marketing landing page",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Create product landing page",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Create funny landing page",
        createdAt: new Date(),
      },
    ],
  },
  {
    id: nanoid(),
    title: "In Progress",
    tasks: [],
  },
  {
    id: nanoid(),
    title: "Completed",
    tasks: [],
  },
]);
</script>

<style scoped></style>
