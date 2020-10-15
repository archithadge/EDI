// For manipulating DOM of webpages
//Just extracting webpage url
// import { writeFile } from 'fs';
// let data=new Date();

// const { response } = require("express");

console.log("This extension is ready?");
var s=window.location.href;
var l=s.split('/');
// writeFile('Output.txt', l[2], (err) => { 
      
//     // In case of a error throw err. 
//     if (err) throw err; 
// }) 
console.log(l[2]);
// var z=document.getElementById('topnav');
// z.style.backgroundColor="blue";



chrome.runtime.sendMessage({command:"fetch",data:{"website":l[2]}},(response)=>{
    parseCoupons(response.data,l[2]);
    console.log("done");
    return true;
})

