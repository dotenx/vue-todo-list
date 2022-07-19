<template>
  <div class="grid content-center">
    <div>
      <h1 class="text-3xl mb-8">Todos</h1>
    <button
      class="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      @click="showCreateToDoModal = true"
    >
      Add Todo
    </button>
    </div>


    <CreateToDoModal
      v-show="showCreateToDoModal"
      @close-modal="showCreateToDoModal = false"
      @refresh-todos="fetchTodos"
    />

    <table class="table-auto">
      <thead>
        <tr>
          <th class="border px-4 py-2">Title</th>
          <th class="border px-4 py-2">Start</th>
          <th class="border px-4 py-2">Description</th>
          <th class="border px-4 py-2">Deadline</th>
          <th class="border px-4 py-2">Is Done</th>
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td class="border px-4 py-2">{{ todo.title }}</td>
          <td class="border px-4 py-2">{{ todo.start }}</td>
          <td class="border px-4 py-2">{{ todo.description }}</td>
          <td class="border px-4 py-2">{{ todo.deadline }}</td>
          <td class="border px-4 py-2">
            {{ todo.is_done ? "Yes" : "No" }}
          </td>
          <td class="border px-4 py-2">
            <button
              class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
              @click="() => setToDone(todo.id)"
            >
              Done
            </button>
            <button
              class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
              @click="() => deleteTodo(todo.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import AuthService from "../services/auth.service";
const authService = new AuthService();

import CreateToDoModal from "./CreateToDoModal.vue";

export default {
  name: "ToDo",
  components: {
    CreateToDoModal,
  },
  data() {
    return {
      todos: [],
      showCreateToDoModal: false,

      fetchTodos: async () => {
        const res = await axios.post(
          "https://api.dotenx.com/database/query/select/project/noelOND7MdGyoUDU/table/items",
          {
            columns: [],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authService.getToken()}`,
            },
          }
        );
        this.todos = res.data;
      },
    };
  },
  methods: {
    async setToDone(id) {
      await axios.post(
        `https://api.dotenx.com/database/query/update/project/noelOND7MdGyoUDU/table/items/row/${id}`,
        {
          is_done: "true",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      this.fetchTodos();
    },
    async deleteTodo(id) {
      await axios.post(
        `https://api.dotenx.com/database/query/delete/project/noelOND7MdGyoUDU/table/items/row/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      this.fetchTodos();
    },
  },
  mounted() {
    this.fetchTodos();
  },
};
</script>
