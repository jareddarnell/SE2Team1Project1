"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("http://students.cs.weber.edu/Group123/chatHub").build(); // Server setting
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); //local setting

//Disable send button until connection is established
//document.getElementById("grid").disabled = true;

connection.on("ReceiveMessage", function (color, arr) {
    console.log("receiveMessage")
    //document.getElementById("remoteGridArray").value = gridArray;
    //document.getElementById("remoteColor").value = color;
    gridArray = arr;
    //gameMath();
});

connection.start().then(function () {
    console.log("Start");
    document.getElementById("grid").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});



document.getElementById("grid").addEventListener("click", function (event) {
    console.log("Click");
    var color = document.getElementById("color").value;
    //var gridArray = document.getElementById("gridArray").value;

    
    connection.invoke("SendMessage", color, gridArray).catch(function (err) {
        return console.error(err);
    });
    event.preventDefault();
});




// Possible new schema
/*

var arr = [
    {
        color: '',
        value: 0
    },
]

*/


/*

2 things:

 * Some way of storing color for each cell + alive dead state (maybe an array of objects instead of an array of numbers)
 * A way of just completely re-rendering the whole board when you receive a new board state from signal R 

*/
