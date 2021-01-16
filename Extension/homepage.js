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
  var Analytics=document.getElementById("analytics");

  logout.addEventListener('click',e=>{
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      port.postMessage("Logged Out");
    }).catch(function(error) {
      // An error happened.
    });
      
  });

  function timeConversion(sec){
    var hr=String(Math.floor(sec/3600));
    var min=String(Math.floor(sec/60));
    var sc=String(sec%60);
    return hr+" hr "+min+" min "+sc+"sec";

  }

Analytics.addEventListener('click',e=>{
  chrome.runtime.sendMessage({ method: "getData", data: "xxx" }, function (res) {
    // document.getElementById("popupElement1").innerText = res.method;
    // document.getElementById("popupElement2").innerText = res.data;
    // document.getElementById("data").innerHTML=String(res.data.TL);
    // document.getElementById("data").innerHTML="";
    for(x in res.data.TL){
      document.getElementById("table1").innerHTML+="<tr><td>"+String(x)+"</td><td>"+String(timeConversion(res.data.TL[x]))+"</td>"+"<td>"+String(timeConversion(res.data.TS[x]))+"</td></tr>"
    }

    for(x in res.data.Blocked){
      document.getElementById("table2").innerHTML+="<tr><td>"+String(x)+"</tr></td>";
    }
    console.log(res);
// return true;
});
})

port.postMessage("Connected");

port.postMessage("Connected");



  