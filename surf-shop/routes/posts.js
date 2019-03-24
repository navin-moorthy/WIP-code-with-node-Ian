const express   = require('express');
const router    = express.Router();
const multer    = require('multer');
const upload    = multer({ dest: 'uploads/' });
const { asyncErrorHandler } = require("../middleware");
const { 
    postIndex,
    postNew,
    postCreate,
    postShow,
    postEdit,
    postUpdate,
    postDestroy
} = require('../controllers/posts');

// GET posts page "/posts/"
router.get('/', asyncErrorHandler(postIndex));

// GET new posts page "/posts/new"
router.get('/new', postNew);

// POST new posts page "/posts/"
router.post('/', upload.array('images', 4), asyncErrorHandler(postCreate));

// GET posts show page "/posts/:id/edit"
router.get('/:id', asyncErrorHandler(postShow));

// GET posts show edit page "/posts/:id/edit"
router.get('/:id/edit', asyncErrorHandler(postEdit));

// PUT new posts page "/posts/:id/"
router.put('/:id', upload.array('images', 4), asyncErrorHandler(postUpdate));

// DELETE new posts page "/posts/:id/"
router.delete('/:id', asyncErrorHandler(postDestroy));

module.exports = router;


/*  GET     index     /posts/
    GET     new       /posts/new
    POST    create    /posts/
    GET     show      /posts/:id
    GET     show-edit /posts/:id/edit
    PUT     update    /posts/:id/
    DELETE  destroy    /posts/:id/
*/