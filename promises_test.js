
var Q = require("q");
var defer = Q.defer(),
promise = defer.promise;
// flujo
promise.then(function(val) {
console.log("val:", val);
}, function(err) {
console.log("Error!");
});
// estado
defer.resolve(4802);

// ------------------------------------------------------------------------------------
var fs = require("fs"),
Q = require("q");
//Gestor del recurso
function readFilePromise(filePath) {
var defer = Q.defer();
fs.readFile(filePath, function(err, data) {
err ? defer.reject(err) : defer.resolve(data);
})
return defer.promise;
}
//Consumidor del recurso
readFilePromise("./prueba.js").then(function(contenido) {
console.log("contenido:", contenido.toString());
}, function(err) {
console.log("ERROR!", err);
});


//----------------------------------------------------------------------------------

var Q = require("q");
var def1 = Q.defer(), def2 = Q.defer(), def3 = Q.defer(),
pro1 = def1.promise, pro2 = def2.promise, pro3 = def3.promise;
pro1.then(function(v1) {
console.log(v1);
return [pro2, pro3];
})
.spread(function(v2, v3) {
console.log(v2, v3);
});
def1.resolve(42);
setTimeout(def2.resolve.bind(def2, 13), 1000);
setTimeout(def3.resolve.bind(def3, 71), 200);
