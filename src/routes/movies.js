const { Router } = require('express');
const {
    getMovies,
    getMovieById,
    findMovies,
    createMovie,
    updateMovie,
    deleteMovie} = require('../controllers/movies');

const router = Router();

router.get('/',findMovies,getMovies);
router.get('/:id', getMovieById);
router.post('/create', createMovie);
router.put('/update/:id', updateMovie);
router.delete('/delete/:id', deleteMovie);


module.exports = router;