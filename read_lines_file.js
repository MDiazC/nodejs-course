/*
 * Put in the same folder of this code a fodler called public and then inside should be the file you want to read. In thsi case the file "lines" is un folder "public" that is in the same folder than this file
 * Example url call:
 * 127.0.0.1:3000/lines
 */

var http = require("http");
var url = require('url');
var inspect = require('util'),inspect;
var format = require('util').format;
var fs = require("fs");

var publicDir = "./public";

var server = http.createServer(function(req,res){
  var filePath = url.parse(req.url),
      pathname = filePath.pathname,
      urlData = publicDir + pathname;

fs.exists(urlData,function(exists){
	if(exists){
		fs.readFile(urlData,function(err,data){
			if(err){
				res.writeHead(403);
				res.end('Ooops');
			}
			else{	
				res.writeHead(200);
				res.end(data);
			}
		});
	}
	else{
		res.writeHead(404);
		res.end('Not found');
	}
});

//res.writeHead(200,'exist');
//res.end(inspect(urlData));

});

server.listen(3000);

