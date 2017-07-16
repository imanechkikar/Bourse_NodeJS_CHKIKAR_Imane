/**
 * Created by Info-Shop on 01/01/2017.
 */


var sw='run';
var socket = io.connect('http://localhost:8000');

socket.on('stream', function (data) {
    console.log(data.n);
    document.getElementById('number').innerHTML=data;
});

