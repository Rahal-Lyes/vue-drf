import { createRouter, createWebHistory } from "vue-router";
import UserRegister from "@/views/UserRegister.vue";
import LoginPage from "@/views/LoginPage.vue"; // nouveau nom du fichier
import { useUserStore } from "@/store/userStore.js";
const routes = [
  {
    path: "/register",
    name: "UserRegister",
    component: UserRegister,
  },{
    path:'/chart',
    name:'chart',
    component: () => import('@/views/Chart.vue'),
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/dashboard",
    component: () => import("@/components/DashBoard.vue"),
    meta: { requireLogin: false },
    
  },{
    path: "/dashboard/leads",
    name: "Leads",
    component: () => import("@/views/Leads.vue"),
  },{
    path:'/formulaire',
    name:'formulaire',
    component: () => import('@/components/formulaire/DynamicForm.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); // ✅ appelle le store
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !userStore.isAuthenticated
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
