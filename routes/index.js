var express = require('express');
var router = express.Router();
var db = require('../models/index');

/* GET home page. */
router.get('/', function(req, res) {
  res.json({messg: "Hello World"});
});
/* GET home page. */
router.get('/admin', function(req, res) {
  res.redirect('/static/html/admin/');
});
router.get('/game', function(req, res) {
  res.redirect('/static/html/user/');
});
router.get('/editor', function(req, res) {
  res.send('');
});
router.get('/time', function(req, res){
    db.TimeManagerModel.findOne({eventName: "CodeBlitz"}, function(err, data){ 
        if(!err && data){
            res.json({
                startTime: data.startTime.getTime(),
                endTime: data.endTime.getTime(),
                currTime: Math.floor((new Date).getTime()/1000)
            });
        }
        else{
            res.json({
                startTime: (new Date).getTime()/1000,
                endTime: (new Date).getTime()/1000,
                currTime: Math.floor((new Date).getTime()/1000)
            });
        }
    })
});
router.get('/exec/lang/id/:langId', function(req, res){
    var request = require("request");

    var options = { method: 'POST',
    url: 'http://api.hackerrank.com/checker/submission.json',
    headers: 
    { 'postman-token': 'dcb84d5c-a241-9336-31d7-5ce2c2d23bc9',
        'cache-control': 'no-cache',
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
    formData: 
    { source: '<?php echo "Hello";',
        lang: req.params.langId,
        testcases: '[""]',
        api_key: 'hackerrank|333238-561|67894c1077f4a2d59e1fb03e03dd8f4cacba0451' } 
    };
    
    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
    res.send(body);
    });
});

router.get('/exec/lang/code/:langCode', function(req, res){
    var request = require("request");
    var langIdOf = {"c":1,"cpp":2,"java":3,"python":5,"perl":6,"php":7,"ruby":8,"csharp":9,"mysql":10,"oracle":11,"haskell":12,"clojure":13,"bash":14,"scala":15,"erlang":16,"lua":18,"javascript":20,"go":21,"d":22,"ocaml":23,"r":24,"pascal":25,"sbcl":26,"python3":30,"groovy":31,"objectivec":32,"fsharp":33,"cobol":36,"visualbasic":37,"lolcode":38,"smalltalk":39,"tcl":40,"whitespace":41,"tsql":42,"java8":43,"db2":44,"octave":46,"xquery":48,"racket":49,"rust":50,"swift":51,"fortran":54};
    var langId = langIdOf[req.params.langCode];
    if(! langId){
        res.send('<h1>NO SUCH LANGUAGE</h1>');
    }
    else{
        var options = { method: 'POST',
        url: 'http://api.hackerrank.com/checker/submission.json',
        headers: 
        { 'postman-token': 'dcb84d5c-a241-9336-31d7-5ce2c2d23bc9',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
        formData: 
        { source: '<?php echo "Hello";',
            lang: langId,
            testcases: '[""]',
            api_key: 'hackerrank|333238-561|67894c1077f4a2d59e1fb03e03dd8f4cacba0451' } 
        };
        
        request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
        res.send(body);
        });
    }
    
})
router.post('/exec/lang/code/:langCode', function(req, res){
    var request = require("request");
    var langIdOf = {"c":1,"cpp":2,"java":3,"python":5,"perl":6,"php":7,"ruby":8,"csharp":9,"mysql":10,"oracle":11,"haskell":12,"clojure":13,"bash":14,"scala":15,"erlang":16,"lua":18,"javascript":20,"go":21,"d":22,"ocaml":23,"r":24,"pascal":25,"sbcl":26,"python3":30,"groovy":31,"objectivec":32,"fsharp":33,"cobol":36,"visualbasic":37,"lolcode":38,"smalltalk":39,"tcl":40,"whitespace":41,"tsql":42,"java8":43,"db2":44,"octave":46,"xquery":48,"racket":49,"rust":50,"swift":51,"fortran":54};
    var langId = langIdOf[req.params.langCode];
    if(! langId){
        res.send('<h1>NO SUCH LANGUAGE</h1>');
    }
    else{
        var options = { method: 'POST',
        url: 'http://api.hackerrank.com/checker/submission.json',
        headers: 
        { 'postman-token': 'dcb84d5c-a241-9336-31d7-5ce2c2d23bc9',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
        formData: 
        { source: req.body.source_code,
            lang: langId,
            testcases: '[""]',
            api_key: 'hackerrank|333238-561|67894c1077f4a2d59e1fb03e03dd8f4cacba0451' } 
        };
        
        request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
        res.send(body);
        });
    }
    
})

module.exports = router;
