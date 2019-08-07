const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const validator = require('validator');
const { check, validationResult } = require('express-validator');
const {
	getFilms,
	postFilms,
  getAdd,
  postAdd,
  getInfo
} = require('../controllers/films');

router.get('/', getFilms);

router.post('/', upload.single('file'), [], postFilms);

router.get('/add', getAdd);

router.post('/add',[
  check('title', ' must be 2 symbols and more').isLength({ min: 2 }).not().isEmpty().withMessage(' is empty').matches(/(\w|\s|\.|:)+/).withMessage(' use unsupported symbols'),
  check('year', ' must be in range 1900-2019').isLength({ max: 4 }).not().isEmpty().withMessage(' is empty').matches(/(19\d\d)|(20[01]\d)/),
  check('format').matches(/(DVD|VHS|Blu-Ray)/).withMessage("doesn't have a specific option"),
  check('stars').not().isEmpty().withMessage(' is empty'),
], postAdd);

router.get('/info/:id', getInfo);

module.exports = router;
