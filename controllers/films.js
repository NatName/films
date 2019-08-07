const FilmData = require('../model/modelFilms');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const Film = require('../filmsClass/films');
const { check, validationResult } = require('express-validator');
module.exports = {
  getFilms(req, res, next) {
    FilmData.find().then(function(doc) {
        res.render('films', { items: doc, error: ""});
    });
  },

  postFilms(req, res, next) {
    if(req.body.yes) {
       FilmData.findOneAndRemove({"Title": req.body.yes}, function(err, offer) {
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
              res.render('films', {items: doc, error: "format of file doesn\'t match the appropriate format, file should consist 4 items: title, release year, format and stars with correct data"});
          });
        }
     } else {
       FilmData.find().then(function(doc) {
           res.render('films', {items: doc, error: "file is'nt loaded"});
       });
     }
  },
  getAdd(req, res, next) {
      res.render('addFilm', {errors: []});
  },

  postAdd(req, res, next) {
    let errors = validationResult(req);
    let stars = Film.checkStars(req.body.stars);
    if(!stars) {
      errors.errors.push({
            value: req.body.stars,
            msg: ' should consist name and surname, written through commas',
            param: 'stars',
            location: 'body'
      });
    }
    if(!errors.isEmpty()) {
      res.render('addFilm', {errors: errors.errors});
    } else {
      const item = {
        Title: req.body.title,
        "Release Year": req.body.year,
        Format: req.body.format,
        Stars: req.body.stars
      }
      const data = new FilmData(item);
      data.save();
      res.redirect('/');
    }
  },

  getInfo(req, res, next) {
      FilmData.findById(req.params.id).then(function(result) {
          res.render('info', { film: result });
      });
  }
}
