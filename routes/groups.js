let express = require('express');
let router = express.Router();


module.exports = (db) => {
    router.get('/', (req, res) => {
  
      db.query(`SELECT * FROM groups`).then(data => {
        res.send(data.rows)
      });
  
    })
  
    return router;
  
  };
  