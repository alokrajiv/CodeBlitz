var express = require('express');
var router = express.Router();
var db = require('../models/index');
/*
 * GET questions.
 */
router.get('/all', function(req, res) {
    db.GroupModel.find({},function(err, data){
        res.json(data); 
    })
});
router.get('/no/:no', function(req, res) {
    db.GroupModel.findOne({groupNo: req.params.no},function(err, data){
        res.json(data); 
    });
});
router.post('/changePassword/no/:no', function(req, res) {
    db.GroupModel.findOne({groupNo: req.params.no},function(err, data){
        data.groupPassword = req.body.newPassword ;
		data.save(function(err, data){
			if(err){
				res.status(500);
				res.render('error', {message:"password change failed", error: err});
			}
			else{
				res.json(data);
			}
		})
    });
});
router.get('/no/:no1/question/no/:no2', function(req, res) {
    db.GroupModel.find({groupNo: req.params.no1, 'groupQuestions.questionNo': req.params.no2},function(err, data){
		res.json(data);
    });
});
/*
 * POST to adduser.
 */
router.post('/add', function(req, res) {
    var group = new db.GroupModel({
		groupNo: req.body.newGroup.groupNo,
		groupPassword: req.body.newGroup.groupPassword,
		groupQuestions: []
	});
	group.save(function(err, data){
		if(err){
			res.status(409);
			res.render('error', {message:"question add failed", error: err});
		}
		else
        	res.json(data); 
	})
});
router.post('/no/:no/question/add', function(req, res) {
	db.GroupModel.find({groupNo: req.params.no},function(err, groups){
		var group = groups[0];
        group.groupQuestions.push({
			questionNo: req.body.newQuestion.questionNo,
			questionTitle: req.body.newQuestion.questionTitle,
			questionContent: req.body.newQuestion.questionContent,
			code: req.body.newQuestion.code
		});
		group.save(function(err, data){
			if(err){
				res.status(409);
				res.render('error', {message:"question add failed", error: err});
			}
			else
				res.json(data); 
		});
    });
});
/*
 * DELETE to deleteuser.
 */
router.delete('/no/:no', function(req, res) {
    db.GroupModel.remove({groupNo : req.params.no}, function(err){
		if(err){
			res.status(409);
			res.render('error', {message:"group remove failed", data: err});
		}
		else
			res.json({delete:"OK"});
	});
	
});

router.delete('/no/:no1/question/no/:no2', function(req, res) {
    db.GroupModel.findOne({groupNo: req.params.no1, 'groupQuestions.questionNo': req.params.no2},function(err, group){
		if(err){
			res.status(409);
			res.render('error', {message:"question remove failed", data: err});
		}
		else if(!group)
			res.json({'resp':'No such question'});
		else{
				var key_id = undefined;
				for(var i=0;i<group.groupQuestions.length;i++){
					var subdoc = group.groupQuestions[i];
					console.log(subdoc.questionNo+" -> "+req.params.no2);
					if(subdoc.questionNo==req.params.no2)
						key_id = subdoc._id;
				}
				if(!key_id){
					res.status(409);
					res.render('error', {message:"sub-doc delete error", error: {status: "Loop failed to catch id", stack:{}}});
				}
				else{
					group.groupQuestions.id(key_id).remove();
					group.save(function(err, data){
						if(err){
							res.status(409);
							res.render('error', {message:"question add failed", error: err});
						}
						else
							res.json(data); 
					});
				}
			}
		
		
    });
});


router.post('/time', function(req, res) {
  var toSaveObj = new db.TimeManagerModel({
        eventName: req.body.newTime.eventName,
		startTime: req.body.newTime.startTime,
		endTime: req.body.newTime.endTime
    });
    var upsertData = toSaveObj.toObject();
    delete upsertData._id;
    db.TimeManagerModel.update({eventName: toSaveObj.eventName}, upsertData, {upsert: true}, function(err, data){
        if(err){
            res.status(500);
            res.render('error', {message:"time change failed", error: err});
        }
        else{
            res.json(data);
        }
    });
});


module.exports = router;