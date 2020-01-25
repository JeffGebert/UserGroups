let express = require('express');
let router = express.Router();


module.exports = (db) => {
  router.get('/', (req, res) => {

    db.query(`SELECT * FROM users ORDER BY users.id`).then(data => {
      res.send(data.rows)
    });

  })

  router.post('/', (req, res) => {
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
  

  router.put('/', (req, res) => {

    let query = {
      text: `UPDATE users SET first_name = $1, last_name = $2 where users.id = $3`,
      values: [
        req.body.firstname,
        req.body.lastname,
        req.body.id
      ]
    }
    db.query(query).then(data => {
      res.send("db updated")
    })
  })



  
  router.delete('/', (req, res) => {


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

}