"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("http://students.cs.weber.edu/Group123/chatHub").build(); // Server setting
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); //local setting

connection.start().then(function () {
    document.getElementById("grid").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("ReceiveMessage", function (color, playerGameBoard) {
    gridArray = playerGameBoard;
    reRender();
});

connection.on("ReceiveMath", function () {
    gameMath();
});

document.getElementById("grid").addEventListener("click", function (event) {

    connection.invoke("SendMessage", color, gridArray).catch(function (err) {
        return console.error(err);
    });
    event.preventDefault();
});

document.getElementById("gamePlay").addEventListener("click", function (event2) {
    connection.invoke("SendMath").catch(function (err) {
        return console.error(err);
    });
    event2.preventDefault();
});