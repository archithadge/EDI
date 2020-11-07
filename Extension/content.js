console.log("This extension is ready?");
var s=window.location.href;
//Fetching domain of website
var l=s.split('/');

// console.log(l[2]);

//To send website details to background scripts
chrome.runtime.sendMessage({command:"fetch",data:{"website":l[2]}},(response)=>{
    parseCoupons(response.data,l[2]);
    console.log("done");
    return true;
});

