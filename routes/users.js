let express = require('express');
let router = express.Router();


module.exports = (db) => {
  router.get('/', (req, res) => {

    db.query(`SELECT * FROM users`).then(data => {
      res.send(data.rows)
    });

  })

  router.post('/', (req, res) => {
    console.log("hello")
    let query = {
      text: `INSERT INTO users (first_name, last_name)
      VALUES ($1, $2)`,
      values: [
        req.body.firstname,
        req.body.lastname,
      ]
    }
    
    db.query(query).then(data => {
      res.send("inserted into db")
      
    })
    
  })
  
  router.delete('/', (req, res) => {

    console.log("request",req.body.user_id)


    let query = {
      text: `DELETE FROM users WHERE users.id = $1`,
      values: [
        req.body.user_id
      ]
    }
    db.query(query).then(data  => {
      res.send("deleted from db")
    })

  })

  return router;

};

