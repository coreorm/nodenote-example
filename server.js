// quick app
var express = require('express');
var path = require('path');

var app = express();

app.set('port', 8080);

app.get('/', function(req, res) {
    res.send({
        status:200,
        message:'Hello World!'
    });
});

app.get('/2', function(req, res) {
    setTimeout(function() {
        res.send({
            status:200,
            message:'Hello World! Again...delayed for 1.5 seconds'
        });
    }, 1500);
});

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
