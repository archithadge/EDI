
console.log("*****************background.js***************")
var loggedIn = false;
var BlockedSites = {}
var timeLimit={};
var timeSpent={};
var DateWiseHistory={}
var database = firebase.database();



firebase.database().ref('/users/' + userID + "/TimeLimitSet").once('value').then((snapshot) => {
    if(snapshot.val()!=null){
        timeLimit=snapshot.val().TimeLimit;
        timeSpent=snapshot.val().TimeSpent;

    }
    // console.log("DONE1",TimeLimitSetSites);
});

firebase.database().ref('users/' + userID+'/datewiseUsage/'+today).once('value').then((snapshot) => {
    // TimeLimitSetSites = snapshot.val();
    // console.log("DONE1",TimeLimitSetSites);
    if(snapshot.val()==null){
        DateWiseHistory={};
    }
    else{
        DateWiseHistory=snapshot.val();
    }
});






function domainForDB(url) {
    var domain = url.split('/');
    domain = domain[2];
    domain = domain.replaceAll('.', '_');
    return domain;
}


//Function to get data from Current tabs
 function  getTabsData() {
    // var tabs_data = {};
    chrome.tabs.query({}, (tabs) => {
        for (var i = 0; i < tabs.length; i++) {
            console.log(domainForDB(tabs[i].url));
            if(domainForDB(tabs[i].url) in timeLimit){
                console.log("REACHED HERE",domainForDB(tabs[i].url));
                timeSpent[domainForDB(tabs[i].url)]=timeSpent[domainForDB(tabs[i].url)]+5;
                // console.log(TimeLimitSetSites);
            }
            // if(domainForDB(tabs[i].url) in TimeLimitSetSites){
            //     console.log("YES",domainForDB(tabs[i].url));
            //     TimeLimitSetSites[domainForDB(tabs[i].url)].TS=TimeLimitSetSites[domainForDB(tabs[i].url)].TS+5;
            // }
            if((domainForDB(tabs[i].url) in DateWiseHistory)==false){
                DateWiseHistory[domainForDB(tabs[i].url)]=5;
            }
            else{
                DateWiseHistory[domainForDB(tabs[i].url)]=DateWiseHistory[domainForDB(tabs[i].url)]+5;
            }
        }
        // console.log("Done");
    });
    
}


function updateFirebase(){
    firebase.database().ref('users/' + userID+'/TimeLimitSet/TimeSpent').set(timeSpent);
    console.log("DODODOD");
    firebase.database().ref('users/' + userID+'/datewiseUsage/'+today).set(DateWiseHistory);
}

// setInterval(updateLocalFromFirebase,2000);
setInterval(getTabsData,5000);
setInterval(updateFirebase,10000);
setInterval(updateLocalFromFirebase2,5000);

function updateLocalFromFirebase2() {
    firebase.database().ref('/users/' + userID + "/blockedSites").once('value').then((snapshot) => {
        BlockedSites = snapshot.val();
    });

    firebase.database().ref('/users/' + userID + "/TimeLimitSet").once('value').then((snapshot) => {
        timeLimit = snapshot.val().TimeLimit;
        // timeSpent=snapshot.val().TimeSpent;
    });

    // firebase.database().ref('users/' + userID+'/datewiseUsage/'+today).once('value').then((snapshot) => {
    //     DateWiseHistory = snapshot.val();
    // });

    // console.log(BlockedSites, TimeLimitSetSites);
}





//Function to update local dictionaries from firebase
function updateLocalFromFirebase() {
    firebase.database().ref('/users/' + userID + "/blockedSites").once('value').then((snapshot) => {
        BlockedSites = snapshot.val();
    });

    firebase.database().ref('/users/' + userID + "/TimeLimitSet").once('value').then((snapshot) => {
        timeLimit = snapshot.val().TimeLimit;
        timeSpent=snapshot.val().TimeSpent;
    });

    firebase.database().ref('users/' + userID+'/datewiseUsage/'+today).once('value').then((snapshot) => {
        DateWiseHistory = snapshot.val();
    });

    // console.log(BlockedSites, TimeLimitSetSites);
}












//Inter-Script Communication
chrome.extension.onConnect.addListener(function (port) {
    //console.log("Connected with pop");
    port.onMessage.addListener(function (msg) {
        console.log("Message is:- " + msg);
        if (msg === "Connected"){
            // port.postMessage(tabs_data);
            console.log("Connected");

        }
        if (msg === "Logged In") {
            loggedIn = true;
            // updateFilters(true);
        }
        if (msg === "Logged Out") {
            loggedIn = false
            // updateFilters(false);
        }
        if (msg === "Status") {
            if (loggedIn)
                port.postMessage("YES");
            else
                port.postMessage("NO");
        }
    })
});


//Blocking Requests
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        console.log()
        if(domainForDB(details.url) in timeLimit){
            if(timeSpent[domainForDB(details.url)]>=timeLimit[domainForDB(details.url)]){
                return {cancel:true};
            }
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]);


// console.log("*****************background.js***************")
// var loggedIn = false;
// var BlockedSites = {}
// var TimeLimitSetSites = {}
// var DateWiseHistory={}
// var database = firebase.database();



// firebase.database().ref('/users/' + userID + "/TimeLimitSet").once('value').then((snapshot) => {
//     if(snapshot.val()!=null){
//         TimeLimitSetSites = snapshot.val();

//     }
//     console.log("DONE1",TimeLimitSetSites);
// });

// firebase.database().ref('users/' + userID+'/datewiseUsage/'+today).once('value').then((snapshot) => {
//     // TimeLimitSetSites = snapshot.val();
//     // console.log("DONE1",TimeLimitSetSites);
//     if(snapshot.val()==null){
//         DateWiseHistory={};
//     }
//     else{
//         DateWiseHistory=snapshot.val();
//     }
// });






// function domainForDB(url) {
//     var domain = url.split('/');
//     domain = domain[2];
//     domain = domain.replaceAll('.', '_');
//     return domain;
// }


// //Function to get data from Current tabs
//  function  getTabsData() {
//     // var tabs_data = {};
//     chrome.tabs.query({}, (tabs) => {
//         for (var i = 0; i < tabs.length; i++) {
//             console.log(domainForDB(tabs[i].url));
//             if(domainForDB(tabs[i].url) in TimeLimitSetSites.TimeLimit){
//                 console.log("REACHED HERE",domainForDB(tabs[i].url));
//                 TimeLimitSetSites.TimeSpent[domainForDB(tabs[i].url)]=TimeLimitSetSites.TimeSpent[domainForDB(tabs[i].url)]+5;
//                 console.log(TimeLimitSetSites);
//             }
//             // if(domainForDB(tabs[i].url) in TimeLimitSetSites){
//             //     console.log("YES",domainForDB(tabs[i].url));
//             //     TimeLimitSetSites[domainForDB(tabs[i].url)].TS=TimeLimitSetSites[domainForDB(tabs[i].url)].TS+5;
//             // }
//             if((domainForDB(tabs[i].url) in DateWiseHistory)==false){
//                 DateWiseHistory[domainForDB(tabs[i].url)]=5;
//             }
//             else{
//                 DateWiseHistory[domainForDB(tabs[i].url)]=DateWiseHistory[domainForDB(tabs[i].url)]+5;
//             }
//         }
//         // console.log("Done");
//     });
    
// }


// function updateFirebase(){
//     firebase.database().ref('users/' + userID+'/TimeLimitSet').set(TimeLimitSetSites);
//     console.log("DODODOD");
//     firebase.database().ref('users/' + userID+'/datewiseUsage/'+today).set(DateWiseHistory);
// }

// // setInterval(updateLocalFromFirebase,2000);
// setInterval(getTabsData,5000);
// setInterval(updateFirebase,10000);
// // setInterval(updateLocalFromFirebase,5000);





// //Function to update local dictionaries from firebase
// function updateLocalFromFirebase() {
//     firebase.database().ref('/users/' + userID + "/blockedSites").once('value').then((snapshot) => {
//         BlockedSites = snapshot.val();
//     });

//     firebase.database().ref('/users/' + userID + "/TimeLimitSet").once('value').then((snapshot) => {
//         TimeLimitSetSites = snapshot.val();
//     });

//     firebase.database().ref('users/' + userID+'/datewiseUsage/'+today).once('value').then((snapshot) => {
//         DateWiseHistory = snapshot.val();
//     });

//     // console.log(BlockedSites, TimeLimitSetSites);
// }












// //Inter-Script Communication
// chrome.extension.onConnect.addListener(function (port) {
//     //console.log("Connected with pop");
//     port.onMessage.addListener(function (msg) {
//         console.log("Message is:- " + msg);
//         if (msg === "Connected"){
//             // port.postMessage(tabs_data);
//             console.log("Connected");

//         }
//         if (msg === "Logged In") {
//             loggedIn = true;
//             // updateFilters(true);
//         }
//         if (msg === "Logged Out") {
//             loggedIn = false
//             // updateFilters(false);
//         }
//         if (msg === "Status") {
//             if (loggedIn)
//                 port.postMessage("YES");
//             else
//                 port.postMessage("NO");
//         }
//     })
// });


// //Blocking Requests
// chrome.webRequest.onBeforeRequest.addListener(
//     function (details) {
//         console.log()
//         if(domainForDB(details.url) in TimeLimitSetSites){
//             // if(TimeLimitSetSites[domainForDB(details.url)].TL<=TimeLimitSetSites[domainForDB(details.url)].TS){
//             //     return {cancel:true};
//             // }
//         }
//     },
//     { urls: ["<all_urls>"] },
//     ["blocking"]);