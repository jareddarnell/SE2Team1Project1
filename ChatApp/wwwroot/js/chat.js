"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("grid").addEventListener("click", function (event) {
    var color = document.getElementById("color").value;




    /* THIS IS THE VARIABLE WE NEED TO CHANGE TO THE X,Y COORDINATES */
    var xcoord = document.getElementById("xcoord").value;
    var ycoord = document.getElementById("ycoord").value;
    /*****************************************************************/



    connection.invoke("SendMessage", color, xcoord, ycoord).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});