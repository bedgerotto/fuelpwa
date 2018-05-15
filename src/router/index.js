import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import FuelControll from '@/components/FuelControll'

import 'font-awesome/css/font-awesome.css'
import 'jquery/dist/jquery.js'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/controll',
      name: 'FuelControll',
      component: FuelControll
    }
  ]
})
