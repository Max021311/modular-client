import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import HomePage from '../components/HomePage.vue';
import Register from '../components/Register.vue';
import AdminPage from '../components/AdminPage.vue';

const routes = [
  { path: '/', redirect: '/sign-in' }, // Redirección inicial
  { path: '/sign-in', name: 'SignIn', component: SignIn },
  { path: '/homepage', name: 'HomePage', component: HomePage },
  { path: '/register', name: 'Register', component: Register },
  { path: '/adminpage', name: 'AdminPage', component: AdminPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;