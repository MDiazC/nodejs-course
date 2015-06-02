//open a folder
var fs = require("fs"),
Q = require("q");
p = require("path");

function readFilePromise(filePath) {
	Q.ninvoke(fs, "readdir", filePath).then(function(list) {
		return list;
	})
	.then(function(list){
		var fullpath;
		return list.map(function(path){
			fullpath= p.resolve(filePath,path);
			return Q.ninvoke(fs, "stat", fullpath).then(function(stats) {
				fullpath= p.resolve(filePath,path);
				return {path: fullpath, stat: stats};
			})
		})
	})
	.spread(function(){
		var result = [].slice.call(arguments);
		return result.map(function(obj){
			if(obj.stat.isDirectory())
				return readFilePromise(obj.path);
			else{
				console.log("path "+obj.path);
				console.log("stats "+ obj.stat);
			}
		})
	})	
	.fail(function(err){
		console.log("error "+err);		
	});
};

var Filepath='.'
readFilePromise(Filepath);
