"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("http://students.cs.weber.edu/Group123/chatHub").build(); // Server setting
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); //local setting


connection.on("ReceiveMessage", function (playerGameBoard) {
    console.log("receiveMessage from the connection in chat.js")
});

connection.start().then(function () {
    console.log("Start");
    document.getElementById("grid").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});



document.getElementById("grid").addEventListener("click", function (event) {
    console.log("Click from the event listener in chat.js");
    var color = document.getElementById("color").value;
    //var gridArray = document.getElementById("gridArray").value;

    
    connection.invoke("SendMessage", color, gridArray).catch(function (err) {
        return console.error(err);
    });
    event.preventDefault();
});




// Possible new schema

/*

2 things:

 * Some way of storing color for each cell + alive dead state (maybe an array of objects instead of an array of numbers)
 * A way of just completely re-rendering the whole board when you receive a new board state from signal R 

*/
