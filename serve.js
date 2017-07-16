

var bodyParser=require('body-parser');
var express= require('express');
var app = express();
var serverhttp=require('http').createServer(app);
var io=require('socket.io').listen(serverhttp);
var http=require('http');

serverhttp.listen(8000);
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.get("/",function (req,resp) {
    res.sendfile("./public/index.html");

});


io.sockets.on('connection', function (socket) {

    socket.on('Ordres', function (m) {


        http.get("http://localhost:8080/societes/"+m.msg+"/Orders?page=0&size=20",function(dd){
            dd.on('data',function(d){
                console.log(d);
                    socket.emit('AllOrdres',{ord:JSON.parse(d)});
            });
        });
    });

});








