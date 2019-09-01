import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import './components/firebaseInit'
import VueGoogleCharts from 'vue-google-charts'

Vue.use(VueGoogleCharts)

Vue.config.productionTip = false

let app
firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')    
  }
})