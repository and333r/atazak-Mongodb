const express= require('express')
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/test', ['atazak'])
const app= express()


const fs= require("fs")
const {text} = require("express");
PORT=3000

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

app.post("/", (req,res)=>{
    let texto=[]
    let body= JSON.stringify(req.body)
     texto= JSON.parse(body)
    texto.forEach(e=>{
        db.collection('atazak').insertOne(e)
    })
    /*fs.writeFile("public/data.txt",JSON.stringify(req.body), function(err){
        if(err) {
            return console.log(err)
        }
        console.log("The file was saved!")
    })*/
})

app.get("/download", async (req,res)=>{
    db.atazak.find((err, docs) => {
        if (err) {
            res.send(err);
        } else {
            docs.forEach(e => {
                db.atazak.remove({_id: mongojs.ObjectId(e._id)}, function (err) {
                    if (err) console.log(err)
                })
            })
            res.send(docs);

        }
    })

})



let lector = function (){

    return new Promise((resolve, reject)=>{
        fs.readFile("public/data.txt",(err,data)=>{
            if(err) {
                return reject
            }
            resolve(data)
        })
    })
}


app.listen(PORT, function(){console.log("Servidor lanzado en el puerto 3000")})
