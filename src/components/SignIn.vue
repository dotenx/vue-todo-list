<template>
  <!-- This is an example component -->
  <div class="max-w-2xl mx-auto">
    <div
      class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form class="space-y-6" @submit.prevent="onSubmit">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to your account
        </h3>
        <div>
          <label
            for="email"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >Email</label
          >
          <input
            type="email"
            formControlName="email"
            id="email"
            v-model="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required=""
          />
        </div>
        <div>
          <label
            for="password"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >Password</label
          >
          <input
            type="password"
            formControlName="password"
            id="password"
            v-model="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required=""
          />
        </div>
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import AuthService  from "../services/auth.service";
  const authService = new AuthService();


  export default {
    name: 'SignUp',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      onSubmit() {
        let user = {
          email: this.email,
          password: this.password,
        }
        authService.login(user).then(() => {
          alert("User logged in successfully");
          this.email = "";
          this.password = "";
          this.$router.push(this.$route.query.redirect || '/todo')
        }).catch(error => {
          console.log(error);
        });
      }
    }
  }
</script>