console.log("*****************updatating_db***************");
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
var app=firebase.initializeApp(firebaseConfig);
var userID = "userID1";
firebase.database().ref('user').set('archit');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("USER IS PRESENT");
      userID=user.uid;
      updateLocalFromFirebase();
    } else {
      // No user is signed in.
      console.log("USER ISNT PRESENT");
      userID="userID1";
      updateLocalFromFirebase();
    }
  });



var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '_' + mm + '_' + dd;




