var port = chrome.extension.connect({
    name: "channel"
});
port.postMessage("Status");

port.onMessage.addListener(function(msg){
    if (msg === "YES")  // LOGGED IN
        window.location.replace("homepage.html");
    else
        window.location.replace("index.html");
});
