import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase"
import "firebase/firestore";
import firebaseConfig from "./config/firebase.js"

Vue.config.productionTip = false
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
