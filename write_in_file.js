var fs = require("fs");

var count='';

var writeStream = fs.createWriteStream(process.argv[2],{
flags:"w",
encodig:"ascii"
});

writeStream.write("");
write=true;
while(write)
	write=writeStream.write("tree\n");

writeStream.on("drain",function(trozo){
console.log("drain");
writeStream.end();
});

writeStream.on("finish",function(){
console.log("Number lines ");
});



