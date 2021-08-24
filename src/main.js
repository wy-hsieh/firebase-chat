import Vue from 'vue'
import firebase from 'firebase/app';
import 'firebase/database'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

const firebaseConfig = {
  apiKey: "AIzaSyAfEhL3iTOm7IbHO350SsW-m3tjF85bzNs",
  authDomain: "member-test-bd49f.firebaseapp.com",
  databaseURL: "https://member-test-bd49f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "member-test-bd49f",
  storageBucket: "member-test-bd49f.appspot.com",
  messagingSenderId: "606989754064",
  appId: "1:606989754064:web:a5e00539b916d9f105c8d5",
  measurementId: "G-8Z6TLV1Y9G"
}
firebase.initializeApp(firebaseConfig)

library.add(faArrowCircleUp, faArrowCircleDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
