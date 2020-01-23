let express = require('express');
let router = express.Router();


module.exports = (db) => {
    router.get('/', (req, res) => {
  
      db.query(`SELECT * FROM groups`).then(data => {
        res.send(data.rows)
      });
  
    })
    
    router.post('/', (req, res) => {
      console.log("req.body", req.body.groupname)
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
  

    