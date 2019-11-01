//EN PRIMER LUGAR INSTALAR LAS SIGUIENTES DEPENDENCIAS:
//Algunas son del github:
//https://github.com/prescottprue/react-redux-firebase
//sudo npm install--save firebase react - redux@5 react - redux - firebase@2 redux redux - firestore

import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer }   from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'firebase/app';
import 'firebase/firestore'

//Configuracion firebase
const firebaseConfig = {
    apiKey: "AIzaSyAmsqNoegI7yrCV8D65Jj4i5KeXH0UVj_A",
    authDomain: "biblioteca-6d8e5.firebaseapp.com",
    databaseURL: "https://biblioteca-6d8e5.firebaseio.com",
    projectId: "biblioteca-6d8e5",
    storageBucket: "biblioteca-6d8e5.appspot.com",
    messagingSenderId: "634564868913",
    appId: "1:634564868913:web:fe4b347889aa4b58fa4e10",
    measurementId: "G-KM1TNG5C40"
}
//Inicializar Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//Crear el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;

