/*var fs = require("fs");
var Q = require("q");

function listAllFiles(filePath){

	var base = filePath;

	var defer = Q.defer();

	Q.ninvoke(fs, "readdir", base).then(function(list) {
		foreach(list as elem){
			abs = path.resolve(base,elem);
			Q.ninvoke(fs, "stat", abs).then(function(stats) {
				if(stats.isDirectory()){
					abs = path.resolve(base,elem);
					listAllFiles(abs);
				}
				else{
					defer.resolve(path.resolve(base,elem));
				}
			});
		}
	})
	.fail(function(err){
		console.log("error");		
	});
	return defer.promise;
}


listAllFiles('.').then(function(list){
console.log(list);
}
.done();*/
//-----------------------------------------------
/*
PASO 1: DEVOLVER LISTADO

var fs = require("fs");
var Q = require("q");

function listAllFiles(filePath){

	var base = filePath;

	var defer = Q.defer();

	return Q.ninvoke(fs, "readdir", base).then(function(list) {
		return list;
	})
	.fail(function(err){
		console.log("error");		
	});
}


listAllFiles('.').then(function(list){
console.log(list);
}
.done();

*/

//----------------------------------------------
/*
PASO 2: ANALIZAMOS TODOS LOS ELEMENTOS DEL DIRCTORIO


var fs = require("fs");
var Q = require("q");

function listAllFiles(filePath){

	var base = filePath;

	var Listado =;
	return Q.ninvoke(fs, "readdir", base).then(function(list) {
		abs = path.resolve(base,list[i]);
		Listado = list;
		return list.map(function(path){
			return Q.ninvoke(fs, "stat", path).then(function(stat) {
				return {stat:stat, path:path};
			}
		});
	})
	.spread(function(){
		for(i=0;_len=arguments.length;i<_len;i++){
			console.log(arguments[i].path);
			console.log(arguments[i].stat);
		}
	})
	.fail(function(err){
		console.log("error");		
	});
}


listAllFiles('.').then(function(list){
console.log(list);
}
.done();
*/

//----------------------------------------------


var fs = require("fs");
var Q = require("q");
//var path = require("path");

/*
function listAllFiles(rutaListado) {
  return Q.ninvoke(fs, "readdir", rutaListado).then(function(listado) {
    return listado.map(function(ruta) {
      ruta = path.resolve(rutaListado, ruta)
      return Q.ninvoke(fs, "stat", ruta).then(function(stat) {
        return {stat: stat, path: ruta};
      })
    })
  })
  .spread(function() {
    var resultado = [].slice.call(arguments);
    return resultado.map(function(fileObj) {
      if (fileObj.stat.isDirectory()) {
        return listAllFiles(fileObj.path);
      } else {
        return [fileObj];
      }
    });
  })
  .spread(function() {
    var result = [].slice.call(arguments);
    return [].concat.apply([], result);
  })
}

*/

function listAllFiles(filePath){

	var Listado;
console.log('path ',filePath);
	return Q.ninvoke(fs, "readdir", filePath)
	.then(function(list) {
console.log('list ',list);
		return list.map(function(path){
			ruta=path.resolve(filePath,path);
			return Q.ninvoke(fs, "stat", path)
				.then(function(stat) {
					return {stat: stat, path: ruta};
				})
			})
	})
	.spread(function(){
		var result = [].slice.call(arguments);
		return result.map(function(obj){
			if(obj.isDirectory()){
				return listAllFiles(obj.path);
			}else{
				return [obj]
			}
		})
	})
	.spread(function() {
	  var result = [].slice.call(arguments);
	  return [].concat.apply([], result);
	})
	.fail(function(err){
		console.log("error");		
	});
}


listAllFiles('.').then(function(list){
	console.log(list);
})




//-----------------------------------------------
/*
function myNinvo}e(obj,method){
	var defer = Q.defer();
	var args = [].slice.call(arguments,2);
	obj[method],apply(obj,args.concat(function(err){
		if(err){
			defer.reject(err);
		}
		else{
			defer.resolve.apply(defer, [].slice.caññ(arguments,1));
		}
	}));
	return defer.promise;
}
*/
