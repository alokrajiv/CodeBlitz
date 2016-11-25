//NOT USED ANYMORE!

var express = require('express');
var router = express.Router();
var db = require('../models/index');
/*
 * GET questions.
 */
router.get('/all', function(req, res) {
    db.QuestionBankModel.find({},function(err, data){
        res.json(data); 
    })
});
router.get('/no/:no', function(req, res) {
    db.QuestionBankModel.find({questionNo: req.params.no},function(err, data){
        res.json(data); 
    })
});
router.get('/title/:title', function(req, res) {
    db.QuestionBankModel.find({questionTitle: req.params.title},function(err, data){
        res.json(data); 
    })
});
/*
 * POST to adduser.
 */
router.post('/add', function(req, res) {
	console.log(req.body);
    var question = new db.QuestionBankModel({
		questionNo: req.body.newQuestion.questionNo,
		questionTitle: req.body.newQuestion.questionTitle,
		questionContent: req.body.newQuestion.questionContent
	});
	question.save(function(err, data){
		if(err)
			res.render('error', {message:"question add failed", error: err});
		else
        	res.json(data); 
	})
});

/*
 * DELETE to deleteuser.
 */
router.delete('/no/:no', function(req, res) {
    db.QuestionBankModel.remove({questionNo : req.params.no}, function(err){
		if(err)
			res.render('error', {message:"question remove failed", data: err});
		else
			res.json({delete:"OK"});
	});
	
});

router.delete('/title/:title', function(req, res) {
    db.QuestionBankModel.remove({questionTitle : req.params.title}, function(err){
		if(err)
			res.render('error', {message:"question remove failed", data: err});
		else
			res.json({delete:"OK"});
	});
	
});

module.exports = router;