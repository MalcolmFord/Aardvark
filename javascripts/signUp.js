var config = {
  apiKey: "AIzaSyCRucaH_NybSXGbRALAQRKEGkp0sUkYN5A",
  authDomain: "aardvark-f05c6.firebaseapp.com",
  databaseURL: "https://aardvark-f05c6.firebaseio.com",
  projectId: "aardvark-f05c6",
  storageBucket: "aardvark-f05c6.appspot.com",
  messagingSenderId: "634788103991"
};
firebase.initializeApp(config);

var signUpBtn = document.getElementById("sign-up-btn")
signUpBtn.addEventListener("click", signUp);
//signUp function
function signUp(){
  console.log("signing up");
  var email = document.getElementById("sign-up-email").value;
  console.log(email);
  var password = document.getElementById("sign-up-password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          alert(error);
        })
      };
