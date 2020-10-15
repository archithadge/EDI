let today = new Date().toISOString().slice(0, 10);
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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  console.log(firebase);

  
var i=0;

  chrome.runtime.onMessage.addListener((msg,sender,resp)=>{
    setTimeout(function() {
        firebase.database().ref('user/'+today+"/"+i.toString()).set(msg.data.website);
        i=i+1;
    }, 1);
    return true;
  })