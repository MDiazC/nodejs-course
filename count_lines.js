var fs = require("fs");

var count='';

var readStream = fs.createReadStream(process.argv[2],{
flags:"r",
encodig:"ascii",
autoClose:true
});

readStream.on("data",function(trozo){
count +=trozo;
console.log("casa2");
});

readStream.on("end",function(){
console.log("Numero lineas ", count.split("\n").length);
});
