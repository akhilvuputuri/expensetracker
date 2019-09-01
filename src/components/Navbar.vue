<template>
  <nav>
    <div class="nav-wrapper" style="background-color:#3AAFA9">
      <div class="container">
        <router-link to="/" class="brand-logo" style="left:15%"> Expense Tracker</router-link>
        <ul class="right">
          <li v-if="isLoggedIn"><span class="email" style="color:#17252A">{{currentUser}}</span></li>
          <li v-if="isLoggedIn"><router-link to="/">Summary</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
          <li v-if="isLoggedIn"><button v-on:click="logout" class="btn" style="background-color:#2B7A78">Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    }
  },
  created() {
    if(firebase.auth().currentUser) {
      this.isLoggedIn = true
      this.currentUser = firebase.auth().currentUser.email
    }
  },
  methods: {
    logout: function() {
      console.log('Button click')
      firebase.auth().signOut().then(() => {
        this.$router.go({path: this.$router.path})
      })
    }
  }
}
</script>

<style scoped>
.email {
  padding-right: 10px;
}
</style>