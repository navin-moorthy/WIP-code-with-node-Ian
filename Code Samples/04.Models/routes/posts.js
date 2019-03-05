const express   = require('express');
const router    = express.Router();

// GET posts page "/posts/"
router.get('/', (req, res, next) => {
    res.send('GET index     /posts/');
});

// GET new posts page "/posts/new"
router.get('/new', (req, res, next) => {
    res.send('GET     new       /posts/new');
});

// POST new posts page "/posts/"
router.post('/', (req, res, next) => {
    res.send('/POST    create    /posts/');
});

// GET posts show page "/posts/:id/edit"
router.get('/:id', (req, res, next) => {
    res.send('GET     show      /posts/:id');
});

// GET posts show edit page "/posts/:id/edit"
router.get('/:id/edit', (req, res, next) => {
    res.send('GET     show-edit /posts/:id/edit');
});

// PUT new posts page "/posts/:id/"
router.put('/:id', (req, res, next) => {
    res.send('PUT     update    /posts/:id/');
});

// DELETE new posts page "/posts/:id/"
router.delete('/:id', (req, res, next) => {
    res.send('DELETE  destroy    /posts/:id/');
});

module.exports = router;


/*  GET     index     /posts/
    GET     new       /posts/new
    POST    create    /posts/
    GET     show      /posts/:id
    GET     show-edit /posts/:id/edit
    PUT     update    /posts/:id/
    DELETE  destroy    /posts/:id/
*/