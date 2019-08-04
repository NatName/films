const express = require('express');
const router = express.Router();
const FilmData = require('../model/modelFilms');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const Film = require('../filmsClass/films');

router.get('/', function(req, res, next) {
  FilmData.find().then(function(doc) {
      res.render('films', { items: doc });
  });
});

router.post('/', upload.single('file'), [ ], function(req, res, next) {
  if(req.body.deleteSubmit) {
     FilmData.findOneAndRemove({"Title": req.body.delete}, function(err, offer) {
       res.redirect('/');
     });
  }
  else if(req.body.sort){
      FilmData.find({}).sort({Title: 1}).then(function(doc) {
          res.render('films', { items: doc });
      });
   } else if(req.body.backHome) {
      res.redirect('/');
   } else if(req.file) {
      const movies = Film.getMovies(req.file.buffer);
      for (let movie of movies) {
          const data = new FilmData(movie);
          data.save();
      }
      res.redirect('/');
   }
});

router.get('/add', function(req, res, next) {
    res.render('addFilm');
});
router.post('/add', function(req, res, next) {
  const item = {
    Title: req.body.title,
    Year: req.body.year,
    Format: req.body.format,
    Stars: req.body.stars
  }
  const data = new FilmData(item);
  data.save();
  res.redirect('/');
});


router.get('/info/:id', function(req, res, next) {
    FilmData.findById(req.params.id).then(function(result) {
        res.render('info', { film: result });
    });
});

module.exports = router;
