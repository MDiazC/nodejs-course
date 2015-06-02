var fs = require("fs"),
    path = require("path"),
    EventEmitter = require("events").EventEmitter,
    Q = require("q");

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
	fileObj.casa="casa";
console.log(fileObj);
        return [fileObj];
      }
    });
  })
  .spread(function() {
    var result = [].slice.call(arguments);
    return [].concat.apply([], result);
  })
}

function somethingChanged(ruta) {
  var listado,
      emitter = new EventEmitter,
      lastChange = 0;

  function comprueba() {
    var cambio = false;
    listAllFiles(ruta).then(function(listado) {
      for (var i=listado.length; i--;) {
        if (listado[i].stat.mtime > lastChange) {
          lastChange = listado[i].stat.mtime;
          cambio = true;
        }
      }
      if (cambio) emitter.emit("changed");
    })
  }

  setInterval(comprueba, 1000);
  comprueba();

  return emitter;
}

var emitter = somethingChanged(".");
emitter.on("changed", function() {
  console.log("ALGO CAMBIO!")
})


