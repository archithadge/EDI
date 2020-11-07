//Firebase config details
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

let today = new Date().toISOString().slice(0, 10);

//To store and fetch blocking website details
l = [];

firebase.database().ref().once("value", function (snapshot) {
  // console.log(snapshot.val());
  l = snapshot.val().blocked;
  // firebase.database().ref('user2/'+today+"/"+i.toString()).set(snapshot.val().blocked);
  // firebase.database().ref('user23/'+today+"/"+i.toString()).set(l);
}, function (error) {
  console.log("Error: " + error.code);
});

var i = 0;
var k = "";

chrome.runtime.onMessage.addListener((msg, sender, resp) => {
  setTimeout(function () {
    firebase.database().ref('user/' + today + "/" + i.toString()).set(msg.data.website);
    i = i + 1;
  }, 1);
  return true;
});

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    for (var i = 0; i < l.length; i++) {
      if (details.url.indexOf(l[i]) != -1) {
        return { cancel: details.url.indexOf(l[i]) != -1 };
      }
    }
    // return {cancel: details.url.indexOf(".com") != -1};
  },
  { urls: ["<all_urls>"] },
  ["blocking"]);