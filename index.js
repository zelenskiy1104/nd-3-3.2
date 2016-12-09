const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

mainDir = __dirname;

const Phonebook = require(mainDir+'/models/phonebook');

app.get('/list', function(req, res) {
    Phonebook.list(function(collection) {
        res.status(200).send(collection);
    });
});

app.post('/create', function(req, res) {
    let lastname = req.body.lastname || false;
    let firstname = req.body.firstname || false;
    let phone = req.body.phone || false;

    if (lastname && firstname && phone) {
        Phonebook.create(lastname, firstname, phone, function(err, result) {
            if (err) {
                //TODO: отправить ошибку
            }
            else {
                // TODO: вернуть нормальные данные
                res.status(200).send(1);
            }
        });
    } else {
        // TODO: отправить ошибку
    }

});
