// Initialize Firebase
var config = {
  apiKey: "AIzaSyCRucaH_NybSXGbRALAQRKEGkp0sUkYN5A",
  authDomain: "aardvark-f05c6.firebaseapp.com",
  databaseURL: "https://aardvark-f05c6.firebaseio.com",
  projectId: "aardvark-f05c6",
  storageBucket: "aardvark-f05c6.appspot.com",
  messagingSenderId: "634788103991"
};
firebase.initializeApp(config);

let Handlebars = require('hbsfy/runtime');
let userTemplate = require('../templates/user.hbs');
let signUpPage = require('signUp.js');
let signInPage = require('signIn.js');
