<template>
  <div id="dashboard">
    <ExpenseBreakdown />

    <ul class="collection with-header">
      <li class="collection-header"><h4>All Expenses</h4></li>
      <li v-for="expense in expenses" v-bind:key="expense.id" class="collection-item">
        <router-link v-bind:to="{name: 'expense-by-cat', params: {category: expense.category}}" class="chip">{{expense.category}}</router-link>
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
import firebase from 'firebase'
import db from './firebaseInit'
import ExpenseBreakdown from '@/components/ExpenseBreakdown.vue'

export default {
  name: 'dashboard',
  components: {
    ExpenseBreakdown
  },
  data () {
    return {
      expenses: []
    }
  },
  created () {
    db.collection('users').doc(firebase.auth().currentUser.email).collection('expenses').orderBy('category').get().then(querySnapshot => {
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
</script>
