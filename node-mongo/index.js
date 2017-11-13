const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/conFusion';


// noinspection JSIgnoredPromiseFromCall
MongoClient.connect(url, (err, db) => {
    assert.equal(err, null);
    console.log('Connected correctly to server');

    const collection = db.collection('dishes');
    collection.insertOne({'name': 'uthappizza', 'description': 'test'}, (err, result) => {
        assert.equal(err, null);

        console.log('After Insert:\n');
        console.log(result.ops);

        collection.find({}).toArray((err, doc) => {
            assert.equal(err, null);

            console.log("Found:\n");
            console.log(doc);

            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);
                db.close();
            })
        });
    });

});