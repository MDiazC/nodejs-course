var fs = require("fs"),
    path = require("path"),
    Q = require("q");

function listAllFiles(rutaListado) {
  return Q.ninvoke(fs, "readdir", rutaListado).then(function(listado) {
    return listado.map(function(ruta) {
      ruta = path.resolve(rutaListado, ruta)
      return Q.ninvoke(fs, "stat", ruta).then(function(stat) {
         if(!stat.isDirectory()){
	    return Q.ninvoke(fs,'readFile',ruta).then(function(data){
               return {stat: stat, path: ruta, content: data};
            })
         }else{
            return {stat: stat, path: ruta};
         }
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
  .fail(function(err){
      console.log("error-antes",err);		
  });
}


listAllFiles('.').then(function(listado) {
    console.log(listado);
})
.fail(function(err){
    console.log("error",err);		
});
