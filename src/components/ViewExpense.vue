<template>
  <div id="view-expense">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name}}</h4></li>
      <li class="collection-item">Expense ID: #{{expense_id}}</li>
      <li class="collection-item">Cost: ${{cost}}</li>
      <li class="collection-item">Category: {{category}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteExpense" class="btn red">Delete</button>
    
    <div class="fixed-action-btn">
      <router-link v-bind:to="{name: 'edit-expense', params: {expense_id: expense_id}}" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'

export default {
  name: 'view-expense',
  data() {
    return {
      expense_id: null,
      name: null,
      cost: null,
      category: null
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('This is beforeRouteEnter')
     db.collection('users').doc(firebase.auth().currentUser.email).collection('expenses').where('expense_id', "==", to.params.expense_id).get()
     .then(querySnapshot => {
       querySnapshot.forEach(doc => {
         next(vm => {
           vm.expense_id = doc.data().expense_id
           vm.name = doc.data().name
           vm.cost = doc.data().cost
           vm.category = doc.data().category
         }) 
       })
     })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      console.log("This is fetchData")
      db.collection('users').doc(firebase.auth().currentUser.email).collection('expenses').where('expense_id', "==", this.$route.params.expense_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.expense_id = doc.data().expense_id
            this.name = doc.data().name
            this.cost = doc.data().cost
            this.category = doc.data().category
          })
        })
    },
    deleteExpense() {
      if(confirm('Are you sure?')){
        db.collection('users').doc(firebase.auth().currentUser.email).collection('expenses').where('expense_id', "==", this.$route.params.expense_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete() 
            this.$router.push('/')
          })
        })
      }
    }
  }
}
</script>
