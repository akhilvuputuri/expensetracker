import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)
console.log('Database' + firebase.auth().currentUser)
export default firebaseApp.firestore()