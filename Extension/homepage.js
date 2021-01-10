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
// firebase.analytics();


firebase.auth().onAuthStateChanged(firebaseUser => {
  var currentUser = firebase.auth().currentUser
  if (firebaseUser){  // If logged in
      // window.location.replace('homePage.html');
      port.postMessage("Logged In");
      console.log(firebaseUser.email);
  }
  else{
      console.log("Not logged in");
      port.postMessage("Logged Out");
      window.location.replace("index.html");
  }
});


  port=chrome.extension.connect({
      name:"channel"
  });

  var logout=document.getElementById("logout");

  logout.addEventListener('click',e=>{
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      port.postMessage("Logged Out");
    }).catch(function(error) {
      // An error happened.
    });
      
  });

port.postMessage("Connected");

port.postMessage("Connected");
port.onMessage.addListener(function(tabs_data){
    // print_info(tabs_data);
});
  