var express = require('express');
var router = express.Router();
var db = require('../models/index');

/* GET home page. */
router.get('/groups/list', function(req, res) {
  db.GroupModel.find({},function(err, data){
      var ret = [];
        for(var i=0;i<data.length;i++)
            ret.push(data[i].groupNo);
        res.json(ret); 
    });
});

router.post('/groups/data', function(req, res) {
  db.GroupModel.find({},function(err, data){
      var ret = {
          locked: [],
          open: []
      };
        for(var i=0;i<data.length;i++){
            if(req.body.q_keys.indexOf(data[i].groupPassword)>-1){
                ret.open.push(data[i]);
            }
            else{
                ret.locked.push({
                    groupNo: data[i].groupNo
                });
            }
        }
        res.json(ret); 
    });
});

router.post('/group/data/no/:no', function(req, res) {
  db.GroupModel.findOne({groupNo: req.params.no},function(err, data){
        if(req.body.q_keys.indexOf(data.groupPassword)>-1)
            res.json(data);
        else{
            res.status(401);
            res.json({messg: "Correct password not found"});
        }
    });
});

router.post('/group/data/no/:no', function(req, res) {
  db.GroupModel.findOne({groupNo: req.params.no},function(err, data){
        if(req.body.q_keys.indexOf(data.groupPassword)>-1)
            res.json(data);
        else{
            res.status(401);
            res.json({messg: "Correct password not found"});
        }
    });
});

module.exports = router;