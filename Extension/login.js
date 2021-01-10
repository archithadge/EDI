var firebaseConfig = {
    apiKey: "AIzaSyCAfBqQF2jAJslfLHYaFx_8qTULbzBBXo4",
    authDomain: "myown-88b9a.firebaseapp.com",
    databaseURL: "https://myown-88b9a.firebaseio.com",
    projectId: "myown-88b9a",
    storageBucket: "myown-88b9a.appspot.com",
    messagingSenderId: "84163790813",
    appId: "1:84163790813:web:bcbcdbcac7097d2a1dd834",
    measurementId: "G-QGXN9YHYQN"
};
firebase.initializeApp(firebaseConfig);

port=chrome.extension.connect({
    name:"channel"
});


firebase.auth().onAuthStateChanged(firebaseUser => {
  var currentUser = firebase.auth().currentUser
  if (firebaseUser){  // If logged in
      // window.location.replace('homePage.html');
      
      port.postMessage("Logged In");
      window.location.replace("homePage.html");
      port.postMessage("User is: " + firebaseUser.email);
  }
  else{
      console.log("Not logged in");
  }
});

const email=document.getElementById("uname");
const password=document.getElementById("pass");
const login=document.getElementById("login");

  
login.addEventListener('click',e=>{
    const emai = email.value;
    const pas = password.value;
    const promise = firebase.auth().signInWithEmailAndPassword(emai, pas);
    
    promise.catch(e => console.log(e.message));
});