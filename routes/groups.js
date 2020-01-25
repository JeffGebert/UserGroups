let express = require('express');
let router = express.Router();


module.exports = (db) => {
    router.get('/', (req, res) => {

      if (req.query.group) {
        query = {
          text: `SELECT id FROM groups where name = $1`,
          values: [
            req.query.group
          ]
      }
     }else{
         query = {
          text: `SELECT * FROM groups ORDER BY id`
        }

      }
  
      db.query(query).then(data => {
        res.send(data.rows)
      });
  
    })

    router.put('/', (req, res) => {

      let query = {
        text: `UPDATE groups SET name = $1 WHERE groups.id = $2`,
        values: [
          req.body.groupname,
          req.body.id
        ]
      }
      db.query(query).then(data => {
        res.send("db updated")
      })
    })
    
    router.post('/', (req, res) => {
      let query = {
        text: `INSERT INTO groups (name)
        VALUES ($1)`,
        values: [
          req.body.groupname,
        ]
      }
      db.query(query).then(data => {
        res.send("inserted into db")
        
      })
      
    })

    
    router.delete('/', (req, res) => {
  
  
      let query = {
        text: `DELETE FROM groups WHERE groups.id = $1`,
        values: [
          req.body.group_id
        ]
      }
      db.query(query).then(data  => {
        res.send("deleted from db")
      })
  
    })


    return router;
  
  };
  

    