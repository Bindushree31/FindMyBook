import BookList from "@/components/BookList.vue";
import { createMemoryHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: BookList },
  { path: "/result", component: BookList },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
