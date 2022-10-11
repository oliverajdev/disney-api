const { Router } = require('express');
const {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie} = require('../controllers/movies');

const router = Router();

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/create', createMovie);
router.put('/update/:id', updateMovie);
router.delete('/delete/:id', deleteMovie);


module.exports = router;