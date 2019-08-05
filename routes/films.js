const express = require('express');
const router = express.Router();
const FilmData = require('../model/modelFilms');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const Film = require('../filmsClass/films');

router.get('/', function(req, res, next) {
  FilmData.find().then(function(doc) {
      res.render('films', { items: doc, error: ""});
  });
});

router.post('/', upload.single('file'), [ ], function(req, res, next) {
  if(req.body.deleteSubmit) {
     FilmData.findOneAndRemove({"Title": req.body.deleteSubmit}, function(err, offer) {
       res.redirect('/');
     });
  }
  else if(req.body.sort){
      FilmData.find({}).sort({Title: 1}).then(function(doc) {
          res.render('films', { items: doc, error: ""});
      });
   } else if(req.body.backHome) {
      res.redirect('/');
   } else if(req.file) {
      if(!req.file.originalname.includes("txt")) {
        FilmData.find().then(function(doc) {
            res.render('films', {items: doc, error: `${req.file.originalname} has unsupported format, use txt file`})
        });
      }
      const movies = Film.getMovies(req.file.buffer);
      if(Film.check(movies)) {
        for (let movie of movies) {
            const data = new FilmData(movie);
            data.save();
        }
        res.redirect('/');
      } else {
        FilmData.find().then(function(doc) {
            res.render('films', {items: doc, error: "something wrong with your file"})
        });
      }
   }
});

router.get('/add', function(req, res, next) {
    res.render('addFilm', {error: ""});
});
router.post('/add', function(req, res, next) {
  if(Film.checkStars(req.body.stars) && req.body.title != "" &&
    req.body.year != "" && req.body.format != "" && req.body.stars != "") {
      const item = {
        Title: req.body.title,
        "Release Year": req.body.year,
        Format: req.body.format,
        Stars: req.body.stars
      }
      const data = new FilmData(item);
      data.save();
      res.redirect('/');
  } else {
      res.render('addFilm', {error: "input is invalid or field is empty"});
      res.redirect('/add');
  }
});


router.get('/info/:id', function(req, res, next) {
    FilmData.findById(req.params.id).then(function(result) {
        res.render('info', { film: result });
    });
});

module.exports = router;
