var http = require("http");
var url = require('url');
var inspect = require('util').inspect;
var format = require('util').format;

var server = http.createServer(function(req,res){
  var urlData = url.parse(req.url);

res.writeHead(200);
res.end(inspect(urlData));
});

server.listen(3000);

