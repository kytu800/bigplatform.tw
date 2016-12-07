var express = require('express');
var app = express();
var _ = require('lodash');
var punycode = require('punycode');

var d = require('./data.json');

d = d.map(function(a) {
	a.encode = punycode.toASCII(a.origin + '.大平台.tw');
	return a;
});

var m = _.keyBy(d, 'encode');

app.get('/', function(req, res) {
	var h = req.hostname;
	var r = m[h];

	if (!r) {
		return res.redirect('http://加入.大平台.tw');
	}

	res.redirect(r.url);
})

app.listen(5700);
