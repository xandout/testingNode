var express = require('express');
var multer  = require('multer');
var fs      = require('fs');
var csv     = require('./csvParse');
var app     = express();
app.set('view engine', 'ejs');
app.use(multer({ 
    dest: './uploads/', 
    rename: function (fieldname, filename) {
        return filename+'_'+Date.now();
    },
    onFileUploadComplete: function (file) {
        console.log('File upload complete ' + Date.now());
    }
}));

app.get('/', function(req, res){
    var form = '<form method="post" enctype="multipart/form-data"> \
    <label for="file">Filename:</label> \
    <input type="file" name="file" id="file"> \
    <br> \
    <input type="submit" name="submit" value="Submit"> \
    </form>' + (req.query.count ? req.query.count : '');
    res.send(form);
})

app.post('/', function(req, res){
    fs.readFile(req.files.file.path, 'utf-8', function (err, content) {
        if(err) console.log(err);
        csv.parse(content, 1, function(content){
            res.redirect('/?count=' + JSON.stringify(content.length));
            console.log(content.length + '\n');
        });
    });
    fs.unlink(req.files.file.path, function(err){
        if(err) throw err;
    });
})

app.listen(8080);
