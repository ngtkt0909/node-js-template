'use strict'

var express = require('express');
var multer = require('multer');

var app = express();
var router = express.Router();
var upload = multer({dest: './uploads'});

var server = app.listen(8080, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Listening at http://%s:%s', host, port);
});

router.use(function (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post('/api/upload', upload.single('impFile'), function (req, res, next) {
	console.log('post /api/upload');
	console.log(req.file);
	res.redirect('/scratch.html')
});

router.post('/api/upload_multi', upload.array('impFileMulti'), function (req, res, next) {
	console.log('post /api/upload');
	console.log(req.files);
	res.redirect('/scratch.html')
});

app.use(express.static('public'));
app.use('/', router);
