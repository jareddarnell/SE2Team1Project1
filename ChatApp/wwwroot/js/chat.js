"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("http://students.cs.weber.edu/Group123/chatHub").build(); // Server setting
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); //local setting

//Disable send button until connection is established
document.getElementById("grid").disabled = true;

connection.on("ReceiveMessage", function (color, gridArray) {
    document.getElementById("remoteGridArray").value = gridArray;
    document.getElementById("remoteColor").value = color;
});

connection.start().then(function () {
    document.getElementById("grid").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("grid").addEventListener("click", function (event) {
    var color = document.getElementById("color").value;
    var gridArray = document.getElementById("gridArray").value;


    connection.invoke("SendMessage", color, gridArray).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});