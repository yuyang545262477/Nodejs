const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/conFusion';
const dboper = require('./operations');


// noinspection JSIgnoredPromiseFromCall
MongoClient.connect(url).then((db) => {
    console.log('Connected correctly to server');

    dboper.insertDocument(db, {name: 'Vadonut', description: 'Test'}, "dishes")
        .then((result) => {
            console.log(`Insert Document:\n,${result.ops}`);
            return dboper.findDocuments(db, 'dishes');
        })
        .then((docs) => {
            console.log(`Found Documents:\n,${docs}`);
            return dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'Update Test'}, 'dishes');
        })
        .then((result) => {
            console.log(`Update Documents:\n ${result.result}`);
            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log(`Found Updated Documents:\n ${docs}`);
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log(`Dropped Collection: ${result}`);
            return db.close();
        })
        .catch((err) => console.log(err));
})
    .catch((err) => console.log(err));