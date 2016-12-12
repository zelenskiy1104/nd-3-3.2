const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/nd-332';

exports.list = function(done) {
    callList((err, result) => {
        // TODO: обработать ошибку
        done(result);
    });
}

exports.search = function(string, done) {
    callSearch(string, (err, result) => {
        // TODO: обработать ошибку
        done(result);
    });
}

function callSearch(string, callback) {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.log('Проблема с соединением с базой данных: ', err);
            return;
        }

        let collection = db.collection('phonebook');
        let regex = string;

        collection.find(
            {$or:[
                {"lastname":{$regex: regex, $options:"iu"}},
                {"firstname":{$regex: regex, $options:"iu"}},
                {"phone":{$regex: regex, $options:"iu"}},
            ]}
        )
        .toArray((err, result) => {
            if (err) {
                // TODO: обработать ошибку
                return;
            }
            db.close();
            console.log(result);
            callback(err, result);
        });
    });
}

exports.get = function(id, done) {
    callItem(id, function(err, result) {
        // TODO: обработать ошибку
        done(result);
    });
}

function callItem(id, callback) {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.log('Проблема с соединением с базой данных: ', err);
            return;
        }

        let collection = db.collection('phonebook');

        collection.find({_id: new mongodb.ObjectId(id)}).toArray((err, result) => {
            if (err) {
                // TODO: обработать ошибку
                return;
            }

            db.close();
            callback(err, result);
        });
    });
}

function callList(callback) {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.log('Проблема с соединением с базой данных: ', err);
            return;
        }

        let collection = db.collection('phonebook');

        collection.find({}).toArray((err, result) => {
            if (err) {
                // TODO: обработать ошибку
                return;
            }

            db.close();
            callback(err, result);
        });
    });
}

exports.create = function(lastname, firstname, phone, done) {
    var data = {
        lastname: lastname,
        firstname: firstname,
        phone: phone
    }

    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.log('Проблема с соединением с базой данных: ', err);
            return;
        }

        let collection = db.collection('phonebook');

        collection.insert(data, (err, result) => {
            if (err) {
                // TODO: обработать ошибку
                console.log(err);
            }

            db.close();
            done(err, result);
        });

    });
}

exports.update = function(id, lastname, firstname, phone, callback) {
    var data = {
        lastname: lastname,
        firstname: firstname,
        phone: phone
    }

    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.log('Проблема с соединением с базой данных: ', err);
            return;
        }

        let collection = db.collection('phonebook');

        collection.update({_id: new mongodb.ObjectId(id)}, data, (err, result) => {
            if (err) {
                // TODO: обработать ошибку
                console.log(err);
            }

            db.close();
            callback(err, result);
        });

    });
}

exports.delete = function(id, done) {
    callDel(id, function(err, result) {
        done(err, result);
    });
}

function callDel(id, callback) {

    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.log('Проблема с соединением с базой данных: ', err);
            return;
        }

        let collection = db.collection('phonebook');

        collection.remove({_id: new mongodb.ObjectId(id)}, (err, result) => {
            if (err) {
                // TODO: обработать ошибку
                console.log(err);
            }

            db.close();
            callback(err, result);
        });

    });
}
