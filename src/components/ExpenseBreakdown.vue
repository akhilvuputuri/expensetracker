<template>
  <div id="expense-breakdown">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Summary</h4></li>
      <li v-for="category in categories" v-bind:key="categories.indexOf(category)" class="collection-item">
        <router-link v-bind:to="{name: 'expense-by-cat', params: {category: category}}">{{category}}</router-link>
        <div class="secondary-content">${{ getByCat(category) }}</div>
      </li>
      <br>
      <li class="collection-item">
        <b style="font-size:28px">Total</b>
        <div class="secondary-content" style="font-size:28px">${{ getTotalSpend() }}</div>
      </li>
    </ul>
    <GChart
    type="PieChart"
    :data="chartData"
    :options="chartOptions"
    />
    
  </div>
</template>

<script>
import firebase from 'firebase'
import db from './firebaseInit'
import { GChart } from 'vue-google-charts'

export default {
  name: 'dashboard',
  components: {
    GChart
  },
  data () {
    return {
      expenses: [],
      categories: ["Food", "Transport", "Clothing", "Entertainment", "Utilities", "Other"],
      chartDataHeader: ['Category', 'Spend', 'Nothing', 'Nothing'],
      chartDataRows:[
        ['Food', 2, 0, 0],
        ['Transport', 3, 0, 0],
        ['Clothing', 1, 0, 0],
        ['Entertainment', 2, 0, 0],
        ['Utilities', 3, 0, 0],
        ['Others', 5, 0, 0]
      ],
      updatedChartData: [],
      chartOptions:{
        chart: {
          title: 'Expense Breakdown',
          subtitle: 'Breakdown of Expenses by Category'
        }
      }
    }
  },
  computed: {
    chartData() {
      return [this.chartDataHeader, ...this.updatedChartData];
    }
  },
  methods: {
    getTotalSpend(){
      var total = 0
      this.expenses.forEach(x => {
       total+=parseFloat(x.cost)
      })
      return Math.round(total*100)/100
    },
    getByCat(cat){
      var total = 0
      this.expenses.filter(y => {
        return y.category == cat;
      })
      .forEach(x => {
        console.log(x)
        total+=parseFloat(x.cost)
      })
      return Math.round(total*100)/100
    },
    updateData() {
      this.updatedChartData = this.chartDataRows.map(row => {
        var temp;
        return row.map((item, index) => {
          if (index === 0) {
            temp = item
          }
          if (index === 1) {
            return this.getByCat(temp)
          }
          return item;
        });
      });
    }
  },
  created () {
    console.log('Database' + firebase.auth().currentUser.email)
    db.collection('users').doc(firebase.auth().currentUser.email).collection('expenses').orderBy('category').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data())
        const data = {
          'id': doc.id,
          'expense_id': doc.data().expense_id,
          'name':doc.data().name,
          'cost':doc.data().cost,
          'category':doc.data().category
        }
        this.expenses.push(data)
        this.updateData()
      })
    })
  }
}
</script>