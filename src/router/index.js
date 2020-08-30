import ContactFormPage from '../views/ContactFormPage.vue';
import HomePage from '../views/HomePage.vue';
import Router from 'vue-router';
import Vue from 'vue';
Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactFormPage,
    },
  ],
});
