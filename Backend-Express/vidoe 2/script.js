const fs = require('node:fs');

fs.writeFile("hello.txt","Hii",function(err){
    if(err) console.log(err)
        else console.log("Done")
})

 fs.appendFile("Hey.txt",`Logged at ${Date.now()} ?`,function(err){
    if(err) console.log(err)
        else console.log("Done")
 })

 fs.copyFile("Hey.txt","./copied/heroAlom.txt",function(err){
    if(err) console.log(err)
        else console.log("Done")
 })

 fs.unlink("hello.txt",function(err){
    if(err) console.log(err)
        else console.log("Removed File")
 })

 fs.rm("./copied",{recursive:true},function(err){
    if(err) console.log(err)
        else console.log("Removed Folder")
 })

 fs.readFile("Hey.txt",function(err,data){
    if(err) console.log(err)
        console.log(data.toString())
    
 })