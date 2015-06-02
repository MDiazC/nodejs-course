var http = require("http");
var url = require('url');
var inspect = require('util'),inspect;
var format = require('util').format;
var fs = require("fs");

var publicDir = "./public";
var cache = {};

var server = http.createServer(function(req,res){
  var filePath = url.parse(req.url),
      pathname = filePath.pathname,
      urlData = publicDir + pathname;

if(pathname in cache){
	res.end(cache[pathname]);
}
else{

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
					cache[urlData]=data;
				}
			});
		}
		else{
			res.writeHead(404);
			res.end('Not found');
			console.log(cache);
		}
	});
}

//res.writeHead(200,'exist');
//res.end(inspect(urlData));

});

server.listen(3000);

