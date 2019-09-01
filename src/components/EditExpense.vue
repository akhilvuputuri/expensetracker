<template>
  <div id="edit-expense">
    <h3>Edit Expense</h3>
    <div class="row">
      <form @submit.prevent="updateExpense" class="col-s12">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="expense_id" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="cost" required>
          </div> 
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="category" required>
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
import firebase from 'firebase'
import db from './firebaseInit'
export default {
  name: 'edit-expense',
  data() {
    return {
      expense_id: null,
      name: null,
      category: null,
      cost: null
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter' + firebase.auth().currentUser.email)
     db.collection('users').doc(firebase.auth().currentUser.email).collection('expenses').where('expense_id', '==', to.params.expense_id).get()
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
      db.collection('users').doc(firebase.auth().currentUser.email).collection('expenses').where('expense_id', '==', this.$route.params.expense_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.expense_id = doc.data().expense_id
            this.name = doc.data().name
            this.cost = doc.data().cost
            this.category = doc.data().category
          })
        })
    },
    updateExpense() {
      db.collection('users').doc(firebase.auth().currentUser.email).collection('expenses').where('expense_id', '==', this.$route.params.expense_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              expense_id: this.expense_id,
              name: this.name,
              cost: this.cost,
              category: this.category
            })
            .then(() => {
              this.$router.push({name: 'view-expense', params: {expense_id: this.expense_id}})
            })
          })
        })
    }
  } 
}
</script>