import { createRouter, createWebHashHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import ProductView from "@/views/ProductView.vue";
import ContactView from "@/views/ContactView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
      meta: { title: "Home" },
    },
    {
      path: "/products",
      name: "products",
      component: ProductView,
      meta: { title: "Products" },
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
      meta: { title: "Contact Us" },
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to) => {
  const baseTitle = "Ducting FistDuct";
  if (to.meta.title) {
    document.title = `${to.meta.title} | ${baseTitle}`;
  } else {
    document.title = baseTitle;
  }
});

export default router;
