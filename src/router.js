import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import introduccion from './views/introduccion.vue'
import newBook from './views/newBook.vue'
import biografia from './views/biografia.vue'
import contactRodrigo from './views/contactRodrigo.vue'
import changeBooks from './views/changeBooks.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/introduccion',
      name: 'introduccion',
      component: introduccion
    },
    {
      path: '/newBook',
      name: 'newBook',
      component: newBook
    },
    {
      path: '/biografia',
      name: 'biografia',
      component: biografia
    },
    {
      path: '/contactRodrigo',
      name: 'contactRodrigo',
      component: contactRodrigo
    },
    {
      path: '/changeBooks',
      name: 'changeBooks',
      component: changeBooks
    },
  ]
})
