const express = require('express');
const http = require('https');
const request = require('request');
const router = express.Router();
const db = require('./postgresql');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/', function(req, response, next) {
  const data = {};
  const resSet = req.body;

  if(resSet != null && resSet.id != null){
    data["hookid"] = resSet.id;
    data["create_time"] = resSet.create_time;
    data["event_type"] = resSet.event_type;
    data["summary"] = resSet.summary;

    db.createData(data).then(() => {
      response.sendStatus(200);
    });
  } else{
    response.send("Parameters needed.");
  }
});

module.exports = router;
