import { createWebHistory, createRouter } from "vue-router";
import SignUp from "@/components/SignUp.vue";
import SignIn from "@/components/SignIn.vue";
import ToDo from "@/components/ToDo.vue";

import AuthService  from "../services/auth.service";
const authService = new AuthService();

const routes = [
  {
    path: "/register",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/todo",
    name: "ToDo",
    component: ToDo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'SignIn' && to.name !== 'SignUp'  && !authService.isLoggedIn()) {
    next({ name: 'SignIn' })}
  else next()
  })
  

export default router;