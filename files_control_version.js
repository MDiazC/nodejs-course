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
				return Q.ninvoke(fs,"readFile",readpath).then(function(data){
					obj.content=data.toString();
					return [obj];
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

var cache={};
function somethingChanged(filePath){
	var changed=false, lastChange=0, emitter = new EventEmitter;
	
	function check(){
		changed=false;
		readFilePromise(filePath).then(function (list){
			for(var i=0; i < list.length;i++){
				if(list[i].stat.mtime > lastChange){
					lastChange=list[i].stat.mtime;
					if(cache[list[i].path])
						length = cache[list[i].path].length;
					else{
						cache[list[i].path]={};
						length=0;
					}
					cache[list[i].path][length]=list[i].content;
					console.log("cambio "+(cache[list[i].path][length]).substr(1,10));
					changed=true;
				}
			}
			if(changed)
				emitter.emit('changed');
		})
	}
	
	setInterval(function(){check();},3000);
	check();
	changed=false;
	
	return emitter;
}

var emitter = somethingChanged('.');
emitter.on('changed',function(){
	console.log("algo cambió");
})


var content;

function processFile(content) {
    console.log("process "+content);
}
