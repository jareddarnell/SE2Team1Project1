"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("http://students.cs.weber.edu/Group123/chatHub").build(); // Server setting
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); //local setting


connection.on("ReceiveMessage", function (color, playerGameBoard) {
    console.log("receiveMessage from the connection in chat.js");
    console.log(color);
    console.log(playerGameBoard);
    gridArray = playerGameBoard;
    reRender();
});

connection.start().then(function () {
    console.log("Start");
    document.getElementById("grid").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});



document.getElementById("grid").addEventListener("click", function (event) {
    console.log("Click from the event listener in chat.js");
    //var color = document.getElementById("color").value;

    connection.invoke("SendMessage", color, gridArray).catch(function (err) {
        return console.error(err);
    });
    event.preventDefault();
});

//document.getElementById("gamePlay").addEventListener("click", function (event) {
//    console.log("Click from the event listener in chat.js");
//    //var color = document.getElementById("color").value;

    //connection.invoke("SendMessage", color, gridArray).catch(function (err) {
    //    return console.error(err);
    //});
//    event.preventDefault();
//});