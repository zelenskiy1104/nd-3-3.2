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

app.post('/search', function(req, res) {
    let string = req.body.string || false;

    Phonebook.search(string, function(collection) {
        res.status(200).send(collection);
    });
});

app.get('/:id', function(req, res) {
    let id = req.params.id || false;

    Phonebook.get(id, function(item) {
        res.status(200).send(item[0]);
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
                console.log(err);
            }
            else {
                res.status(200).send(result);
            }
        });
    } else {
        // TODO: отправить ошибку
    }
});

app.post('/:id/update', function(req, res) {
    let id = req.params.id || false;
    let lastname = req.body.lastname || false;
    let firstname = req.body.firstname || false;
    let phone = req.body.phone || false;

    if (id) {
        Phonebook.update(id, lastname, firstname, phone, function(err, result) {
            if (err) {
                //TODO: отправить ошибку
                console.log(err);
            }
            else {
                res.status(200).send(result);
            }
        });
    }
    else {
        res.status(400).send('Bad request');
    }
});

app.delete('/:id/delete', function(req, res) {
    let id = req.params.id || false;

    if (id) {
        Phonebook.delete(id, function(err, result) {
            if (err) {
                //TODO: отправить ошибку
                console.log(err);
            }
            else {
                res.status(200).send(result);
            }
        });
    }
    else {
        res.status(400).send('Bad request');
    }

});
