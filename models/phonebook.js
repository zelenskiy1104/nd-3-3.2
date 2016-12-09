const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/nd-332';

exports.list = function(done) {
    callList((err, result) => {
        // TODO: обработать ошибку
        done(result);
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
            return;
        }

    });


}
