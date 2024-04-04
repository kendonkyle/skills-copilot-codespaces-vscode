// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentsFile = 'comments.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments.json', function(req, res) {
    fs.readFile(commentsFile, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
    });
});

app.post('/comments.json', function(req, res) {
    fs.readFile(commentsFile, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(commentsFile, JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(comments));
        });
    });
});

app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});