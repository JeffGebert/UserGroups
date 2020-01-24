let express = require('express');
let router = express.Router();

/* GET groupmembers listing. */

module.exports = (db) => {
    router.get('/', (req, res) => {

      if (req.query.groupname  && req.query.unselected) {

        query = {
          text: `SELECT groupmembers.id, users.first_name, users.last_name FROM groupmembers JOIN users ON groupmembers.user_id = users.id JOIN groups ON groupmembers.group_id = groups.id  WHERE groups.name != $1`,
          values: [
            req.query.groupname
          ]
        }

      }else if (req.query.groupname) {

        query = {
          text: `SELECT groupmembers.id, users.first_name, users.last_name FROM groupmembers JOIN users ON groupmembers.user_id = users.id JOIN groups ON groupmembers.group_id = groups.id  WHERE groups.name = $1`,
          values: [
            req.query.groupname
          ]
        }
        
      }else{
        
        query = {
          text: `SELECT * FROM groupmembers`
        }
        
      }
      
      console.log("queryyyy", query)
  
      db.query(query).then(data => {
        res.send(data.rows)
      });
  
    })

   router.delete('/', (req,res) => {

      let query = {
        text: `DELETE FROM groupmembers WHERE groupmembers.id = $1`,
        values: [
          req.body.groupmembers_id
        ]
      }

      console.log("query", query)
      db.query(query).then(data  => {
        res.send("deleted from db")
      })


   }) 
  
    return router;
  
  };
  

