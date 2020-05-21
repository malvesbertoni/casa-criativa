// using express to start and setup the server
const express = require("express")
const server = express()

const db = require('./db')

// setup express utilities
server.use(express.static("public")) // configure static files (css, scripts, imgs)
server.use(express.urlencoded({ extended: true })) // enables req.body

//configure nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// defined '/' route
// gets client's request and respond
server.get("/", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados.")
        } 

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })
    })
})

server.get("/ideias", function(req, res) {
    
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados.")
        } 

        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", { ideas: reversedIdeas })
    })
})

server.post("/", function(req, res){
    // Insert data into db 
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `
    
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados.")
        }

        return res.redirect("/ideias")
    })
})

// server listening on port 3000
server.listen(3000)