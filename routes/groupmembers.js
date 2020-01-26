let express = require('express');
let router = express.Router();

/* GET groupmembers listing. */

module.exports = (db) => {
    router.get('/', (req, res) => {

      if (req.query.groupname  && req.query.unselected) {
        
        query = {
          text: `SELECT DISTINCT ON (user_id) user_id, users.first_name, users.last_name from groupmembers JOIN users ON groupmembers.user_id =users.id where user_id NOT IN  (SELECT  groupmembers.user_id  FROM groupmembers JOIN users ON groupmembers.user_id = users.id JOIN groups ON groupmembers.group_id = groups.id  WHERE groups.name = $1)`,
          values: [
            req.query.groupname
          ]
        }
        
      }else if (req.query.groupname) {
        console.log("req.query", req.query)
        query = {
          text: `SELECT groupmembers.id, users.id, users.first_name, users.last_name FROM groupmembers JOIN users ON groupmembers.user_id = users.id JOIN groups ON groupmembers.group_id = groups.id  WHERE groups.name = $1`,
          values: [
            req.query.groupname
          ]
        }
        
      }else{
        
        query = {
          text: `SELECT * FROM groupmembers`
        }
        
      }

        
      db.query(query).then(data => {
        res.send(data.rows)
      });
  
    })

   router.post('/', (req,res) => {

    console.log("req.body", req.body)


    query = {
       text: `INSERT into groupmembers (user_id, group_id)
       VALUES ($1, $2)`,
       values: [
         req.body.data.user_id,
         req.body.data.group_id
       ]
     }
     db.query(query).then(data => {
       res.send("inserted into db!!")
     })

   })


   router.delete('/', (req,res) => {

      query = {
        text: `DELETE FROM groupmembers WHERE groupmembers.id = $1`,
        values: [
          req.body.groupmembers_id
        ]
      }
      db.query(query).then(data  => {
        res.send("deleted from db")
      })


   }) 
  
    return router;
  
  };
  

