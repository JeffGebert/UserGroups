let express = require('express');
let router = express.Router();

/* GET groupmembers listing. */

module.exports = (db) => {
    router.get('/', (req, res) => {
  
      db.query(`SELECT * FROM groupmembers`).then(data => {
        res.send(data.rows)
      });
  
    })
  
    return router;
  
  };
  