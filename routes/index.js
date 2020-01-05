var fs = require('fs');
const cors = require('cors');
var express = require('express');
var router = express.Router();

function getDb() {
    return JSON.parse(fs.readFileSync('Database.json', 'utf-8'));
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/*POST*/
router.post('/reviews/add', function (req, res, next) {
    if (req.body.name && req.body.data && req.body.parola && req.body.mesaj) {
        const review = {
            name: req.body.name,
            data: req.body.data,
            parola: req.body.parola,
            mesaj: req.body.mesaj
        };
        console.log(review);
        addReview(review);
        res.status(200).send();
    } else res.status(403).send();
})

function addReview(review) {
    var db = getDb();
    db.review.push(review);
    var json = JSON.stringify(db);
    fs.writeFileSync('Database.json', json, 'utf8');
}

router.get('/reviews', function (req, res, next) {
    var db = getDb();
    res.status(200).send(db.review);
})

router.put('/reviews/put', (req, res) => {
    if (req.body.parola && req.body.mesaj) {

        editReview(req.body.parola, req.body.mesaj);

        res.status(200).send();
    } else res.status(403).send();
});

function editReview(parola, mesaj) {
    var db = getDb();
    var isOk = false;
    for (var i = 0; i < db.review.length; i++) {
        if (db.review[i].parola == parola) {
            db.review[i].mesaj = mesaj;
            isOk = true;
        }
    }
    var json = JSON.stringify(db);
    fs.writeFileSync('Database.json', json, 'utf8');

}

router.delete('/reviews/delete', (req, res) =>  {
    var password = req.query.parola;
    if(password){

        deleteReview(password);

        res.status(200).send();
    }
    else res.status(403).send();
});

function deleteReview(password){
    var db = getDb();

    db.review = db.review.filter(function (it){
        return it.parola != password;
    });

    var json = JSON.stringify(db);
    fs.writeFileSync('Database.json', json, 'utf8');
}

module.exports = router;


