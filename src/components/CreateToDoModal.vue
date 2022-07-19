<template>
  <div>
    <div>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            <div
              className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"
            >
              <h3 className="text-3xl font-semibold">Add a new todo</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <span
                  className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
                >
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <form @submit.prevent="submit">
                <div class="mb-6">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Title
                  </label>
                  <input
                    type="title"
                    v-model="todo.title"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="title"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Description
                  </label>
                  <input
                    type="description"
                    v-model="todo.description"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="description"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="start"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Start
                  </label>
                  <input
                    type="date"
                    v-model="todo.start"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="start"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="deadline"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Deadline
                  </label>
                  <input
                    type="date"
                    v-model="todo.deadline"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="deadline"
                    required
                  />
                </div>
                <div class="flex items-center justify-between">
                  <button
                    className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Add
                  </button>
                  <button
                    className="bg-gray-200 text-gray-900 active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    @click="$emit('close-modal')"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AuthService from "../services/auth.service";
const authService = new AuthService();

export default {
  name: "CreateToDoModal",
  data() {
    return {
      todo: {
        title: "",
        description: "",
        start: "",
        deadline: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        await axios.post(
          "https://api.dotenx.com/database/query/insert/project/noelOND7MdGyoUDU/table/items",
          this.todo,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authService.getToken()}`,
            },
          }
        );
        this.$emit("close-modal");
        this.$emit("refresh-todos");
        this.todo = {
          title: "",
          description: "",
          start: "",
          deadline: "",
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
