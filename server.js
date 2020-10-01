let express = require('express')
let path = require('path')
let mongodb = require("mongodb")
let pug = require('pug')
let sanitizeHTML = require('sanitize-html')
let config = require('./config')


let app = express()
let mydb

try{
    mongodb.connect(config.db.connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
        try{
            mydb = client.db()
        }catch (e){
            console.log("connection failed to the DataBase !!!!")
        }
    })

}catch (e){
    console.log("connection failed to the DataBase !!!!")
}

app.listen(config.app.port)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/static', express.static(__dirname + '/public'))


app.set('views', './views')
app.set('view engine', 'pug')


app.get("/", function (req, res) {
    mydb.collection("items").find().toArray(function (err, items) {
        res.render('home', {items: items})
    })
})

app.post("/create-item", function (req, res) {
    let safeInput = sanitizeHTML(req.body.item, {allowedTags: [], allowedAttributes: {}})
    mydb.collection("items").countDocuments({}, function (err, count) {
        if (count < config.db.maxItemsToStore) {
            try {
                mydb.collection("items").insertOne({todo: safeInput}, function (err, info) {
                    let newItemHTML = {
                        li: pug.renderFile('./views/includes/item.pug', {
                            item: info.ops[0]
                        })
                    }
                    res.json(newItemHTML)
                })
            } catch (e) {
                res.status(531).send('insertion error');
            }

        } else {
            res.status(431).send('Full DataBase');
        }
    })

})

app.post("/update-item", function (req, res) {
    let safeInput = sanitizeHTML(req.body.new_value_todo, {allowedTags: [], allowedAttributes: {}})
    mydb.collection("items").findOneAndUpdate({_id: new mongodb.ObjectId(req.body.item_id)}, {$set: {todo: safeInput}}, function () {
        res.redirect("/")
    })
})

app.post("/delete-item", function (req, res) {
    mydb.collection("items").deleteOne({_id: new mongodb.ObjectId(req.body.item_id)}, function () {
        res.redirect("/")
    })
})
