<template>
  <div class="flex items-start gap-4 overflow-x-auto">
    <draggable
      class="flex gap-4 items-start"
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
            <input
              type="text"
              class="title-input bg-transparent focus:bg-white rounded px-1 w-4/5"
              @keyup.enter="($event.target as HTMLInputElement).blur()"
              @keydown.backspace="
                column.title === ''
                  ? (columns = columns.filter((c) => c.id !== column.id))
                  : null
              "
              v-model="column.title"
            />
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
                <TrelloBoardTask
                  :task="task"
                  @delete="
                    column.tasks = column.tasks.filter(
                      (task) => task.id !== $event
                    )
                  "
                /></div
            ></template>
          </draggable>
          <footer>
            <NewTask @add="column.tasks.push($event)" />
          </footer>
        </div>
      </template>
    </draggable>
    <button
      @click="createColumn"
      class="bg-gray-200 whitespace-nowrap p-2 rounded opacity-50"
    >
      + Add Another Column
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Column, Task } from "~/types/index";
import { nanoid } from "nanoid";
import draggable from "vuedraggable";
const alt = useKeyModifier("Alt");
const columns = useLocalStorage<Column[]>("trelloClone", [
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
// If we had a back end, we can sync the data like this
watch(
  columns,
  () => {
    // push data to api
  },
  {
    deep: true, // required because columns is an array
  }
);

function createColumn() {
  const column: Column = {
    id: nanoid(),
    title: "",
    tasks: [],
  };
  columns.value.push(column);
  nextTick(() => {
    (
      document.querySelector(
        ".column:last-of-type .title-input"
      ) as HTMLInputElement
    ).focus();
  });
}
</script>

<style scoped></style>
