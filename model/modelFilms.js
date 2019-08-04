const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let filmDataSchema = new Schema({
  Title: String,
  Year: Number,
  Format: String,
  Stars: String
}, {collection: 'film-data'});

module.exports = mongoose.model('FilmData', filmDataSchema);
