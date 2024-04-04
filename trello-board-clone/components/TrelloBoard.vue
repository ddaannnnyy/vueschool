<template>
  <div>
    <draggable
      class="flex gap-4 overflow-x-auto items-start"
      v-model="columns"
      group="columns"
      item-key="id"
      :animation="150"
      handle=".drag-handle"
    >
      <template #item="{ element: column }: { element: Column }">
        <div
          class="column bg-gray-200 p-5 rounded min-w-[250px] transition-all duration-150"
        >
          <header class="font-bold mb-4">
            <DragHandle />
            {{ column.title }}
          </header>
          <draggable
            :class="column.tasks.length > 0 ? '' : 'py-3'"
            v-model="column.tasks"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            item-key="id"
            :animation="150"
            handle=".drag-handle"
          >
            <template #item="{ element: task }: { element: Task }">
              <div>
                <TrelloBoardTask :task="task" /></div
            ></template>
          </draggable>
          <footer>
            <NewTask @add="column.tasks.push($event)" />
          </footer>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import type { Column, Task } from "~/types/index";
import { nanoid } from "nanoid";
import draggable from "vuedraggable";
const alt = useKeyModifier("Alt");
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
