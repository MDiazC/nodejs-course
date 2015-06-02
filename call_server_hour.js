var http = require("http");
var format = require('util').format;

var server = http.createServer();

server.on("request",function(req,res){
 var today = new Date();
 console.log("casa");
res.writeHead("hol");
res.end(format("%s:%s:%s",today.getHours(),today.getMinutes(),today.getSeconds() ) );
});

server.listen(3000);



/*

var http = requeire("http");

var server = http.createServer(function(req,res){
res.end("hola mundo!!!");
});

server.on("request",);

server.listen(3000);


*/
