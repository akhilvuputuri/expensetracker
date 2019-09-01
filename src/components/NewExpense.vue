<template>
  <div id="new-expense">
    <h3>New Expense</h3>
    <div class="row">
      <form @submit.prevent="saveExpense" class="col-s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="expense_id" required>
            <label>Expense ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="number" step="0.01" v-model="cost" required>
            <label>Cost</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="category" required>
            <label>Category</label>
            <div style="font-size:8px">Pick any one of Transport, Food, Clothing, Entertainment, Utilities, Other</div>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'

export default {
  name: 'new-expense',
  data() {
    return {
      expense_id: null,
      name: null,
      cost: null,
      category: null
    }
  },
  methods: {
    saveExpense() {
      db.collection('users').doc(firebase.auth().currentUser.email).collection('expenses').add({
        expense_id: this.expense_id,
        name: this.name,
        cost: this.cost,
        category: this.category
      }) 
      .then(docRef => this.$router.push('/'))
      .catch(error => console.log(err))
    }
  }
}
</script>
