<template>
  <div id="expense-by-cat">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{this.$route.params.category}}</h4></li>
      <li v-for="expense in expenses" v-bind:key="expense.id" class="collection-item">
        <div class="chip">{{expense.category}}</div>
        <router-link v-bind:to="{name: 'view-expense', params: {expense_id: expense.expense_id}}">{{expense.name}}</router-link>

        <div class="secondary-content">${{expense.cost}}</div>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'

export default {
  name: 'expense-by-cat',
  data() {
    return {
      category: null,
      expenses: []
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('This is beforeRouteEnter')
     db.collection('users').doc(firebase.auth().currentUser.email).collection('expenses').where('category', "==", to.params.category).get()
     .then(querySnapshot => {
       querySnapshot.forEach(doc => {
         next(vm => {
           const data = {
              'id': doc.id,
              'expense_id': doc.data().expense_id,
              'name':doc.data().name,
              'cost':doc.data().cost,
              'category':doc.data().category
            }
            vm.expenses.push(data)
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
            const data = {
              'id': doc.id,
              'expense_id': doc.data().expense_id,
              'name':doc.data().name,
              'cost':doc.data().cost,
              'category':doc.data().category
            }
            this.expenses.push(data)
          })
        })
    }
  }
}
</script>

<style scoped>
#app {
  height: 100vh;
}
</style>