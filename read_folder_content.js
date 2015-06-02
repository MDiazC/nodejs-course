//open a folder
var fs = require("fs"),
Q = require("q");
p = require("path");
EventEmitter = require("events").EventEmitter;

function readFilePromise(filePath) {
	return Q.ninvoke(fs, "readdir", filePath).then(function(list) {
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
				readpath=(obj.path).replace('/home/elementary/Documentos/git/node/Curso Node js/sesion 2','.');
				console.log("readpath "+readpath);
				fs.readFile(readpath,function(err,data){
					if(err){
						throw new Error("fallo abrir archivo");
					}
					 else{
						obj.content=data.toString();
						console.log("content "+(obj.content).substr(0,10));
						return [obj];
					}
				})
			}
		})
	})	
    .spread(function() {
		var result = [].slice.call(arguments);
		return [].concat.apply([], result);
	})
	.fail(function(err){
		console.log("error "+err);		
	});
}

readFilePromise('.');

