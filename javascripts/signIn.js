var config = {
  apiKey: "AIzaSyCRucaH_NybSXGbRALAQRKEGkp0sUkYN5A",
  authDomain: "aardvark-f05c6.firebaseapp.com",
  databaseURL: "https://aardvark-f05c6.firebaseio.com",
  projectId: "aardvark-f05c6",
  storageBucket: "aardvark-f05c6.appspot.com",
  messagingSenderId: "634788103991"
};
firebase.initializeApp(config);

var signInBtn = document.getElementById("sign-in-btn");
signInBtn.addEventListener("click", signIn);
//sign In function
function signIn(){
  console.log("signing up");
  var email = document.getElementById("sign-in-email").value;
  console.log(email);
  var password = document.getElementById("sign-in-password").value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
alert(error);
});

}
