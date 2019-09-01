import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewExpense from '@/components/NewExpense'
import ViewExpense from '@/components/ViewExpense'
import EditExpense from '@/components/EditExpense'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ExpenseByCat from '@/components/ExpenseByCat'
import firebase from 'firebase'

Vue.use(Router)

// Any routes that we want to protect/restrict, we must add a meta object to it and set requiresAuth to true

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        // only can proceed if not logged in
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-expense',
      component: NewExpense,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:expense_id/edit',
      name: 'edit-expense',
      component: EditExpense,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:expense_id',
      name: 'view-expense',
      component: ViewExpense,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/category/:category',
      name: 'expense-by-cat',
      component: ExpenseByCat,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    console.log('In the requiresAuth if statement now')
    // check if NOT logged in
    if(!firebase.auth().currentUser){
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      //Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    console.log('In the requiresGuest if statement now')
    // check if logged in
    if(firebase.auth().currentUser){
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      //Proceed to route
      next();
    }
  } else {
    //Proceed to route
    console.log('In the else statement now')
    next()
  }
})


export default router;