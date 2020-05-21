const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

db.serialize(function() {

    // Create table
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    // Insert data
    // const query = `
    //     INSERT INTO ideas(
    //         image,
    //         title,
    //         category,
    //         description,
    //         link
    //     ) VALUES (?,?,?,?,?);
    // `
    
    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    //     "Curso de Programação",
    //     "Estudo",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //     "https://youtube.com"
    // ]

    // db.run(query, values, function(err){
    //     if (err) return console.log(err)

    //     return console.log(this)
    // })

    // Delete data
    // db.run(`DELETE FROM ideas WHERE id = ?`, [4], function(err){
    //     if (err) return console.log(err)

    //     console.log("DELETED", this)
    // })

    // Consult data
    // db.all(`SELECT * FROM ideas`, function(err, rows){
    //     if (err) return console.log(err)

    //     return console.log(rows) 
    // })
})

module.exports = db