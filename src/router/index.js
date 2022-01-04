import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Create from '../views/playlist/Create.vue'
import Details from '../views/playlist/Details.vue'

//route guards
import {auth} from '../firebase/config'

const requireAuth = (to, form, next) => {
  let user = auth.currentUser
  if(!user) {
    next({ name: 'Login' })

  }else {
    next()
  }

}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    beforeEnter: requireAuth
  },
  {
    path: '/playlist/:id',
    name: 'Details',
    component: Details,
    beforeEnter: requireAuth,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
