import { createRouter, createWebHashHistory } from "vue-router";

import SignUp from "../../pages/SignUp.vue";
import SignIn from "../../pages/SignIn.vue";
import EnterScreen from "../components/EnterScreen/EnterScreen.vue";
import HomePage from "../../pages/HomePage.vue";
import About from "../../pages/About.vue";
import Contact from "../../pages/Contacts.vue";
import ProductDetail from "../../pages/ProductDetail.vue";
import Reviews from "../../pages/Reviews.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: EnterScreen, meta: { marginTop: true } },
    { path: "/sign-in", component: SignIn, meta: { marginTop: true } },
    { path: "/sign-up", component: SignUp, meta: { marginTop: true } },
    { path: "/home", component: HomePage, meta: { marginTop: false } },
    { path: "/about", component: About, meta: { marginTop: false } },
    { path: "/contacts", component: Contact, meta: { marginTop: false } },
    { path: "/reviews", component: Reviews, meta: { marginTop: false } },
    {
      path: "/product/:id",
      name: "ProductDetail",
      component: ProductDetail,
      meta: { marginTop: false }
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/sign-in', '/sign-up'];
  const authRequired = !publicPages.includes(to.path);
  const token = sessionStorage.getItem('authToken');

  if (authRequired && !token) {
    return next('/');
  }
  next();
});


export default router;
