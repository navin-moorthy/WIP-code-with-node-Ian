const express    = require('express');
const router     = express.Router( {mergeParams: true} );

// GET reviews page "/posts/:id/reviews/"
router.get('/', (req, res, next) => {
    res.send('GET index /posts/:id/reviews/');
});

// POST new reviews page "/posts/:id/reviews/"
router.post('/', (req, res, next) => {
    res.send('POST create /posts/:id/reviews/');
});

// GET reviews edit page "/posts/:id/reviews/:review_id/edit"
router.get('/:review_id/edit', (req, res, next) => {
    res.send('GET edit /posts/:id/reviews/:review_id/edit');
});

// PUT new reviews page "/posts/:id/reviews/:review_id"
router.put('/:review_id', (req, res, next) => {
    res.send('PUT update /posts/:id/reviews/:review_id');
});

// DELETE new reviews page "/posts/:id/reviews/:id"
router.delete('/:review_id', (req, res, next) => {
    res.send('DELETE destroy /posts/:id/reviews/:review_id');
});

module.exports = router;


/*  GET     index     /posts/:id/reviews/
    GET     new       /posts/:id/reviews/new
    POST    create    /posts/:id/reviews/
    GET     show      /posts/:id/reviews/:id
    GET     show-edit /posts/:id/reviews/:id/edit
    PUT     update    /posts/:id/reviews/:id/
    DELETE  destroy   /posts/:id/reviews/:id/
*/