var express = require('express');
var app = express();
var diaper = require('./src/diaper');

app.post('/diaper', function (req, res) {
	diaper('bm').then(function() {
		res.status(200).json({});
	}).catch(function (error) {
		console.log(error);
		res.status(500).json({ error: 'message' });
	});
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});