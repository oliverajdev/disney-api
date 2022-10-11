const { Movies, Characters } = require('../db');
const {Op} = require('sequelize')


const getMovies = async (req,res,next) => {
    try{
        const movies = await Movies.findAll({
            attributes: ['img','release','title']
        });
        res.status(201).json(movies)
    }catch(err){
        next(err)
    }
}

const getMovieById = async (req,res,next) => {
    try{
        const { id } = req.params 
        const movies = await Movies.findOne({
            where:{
                id
            }
        });
        if(!movies) return res.status(401).json({msg:'not match id'})
        res.status(201).json(movies)
    }catch(err){
        next(err)
    }
}

const createMovie = async (req,res,next) => {
    try{
        const {img,release,title,score,characters} = req.body
       
        const [movie,created] =  await Movies.findOrCreate({
            where:{
                title:{
                      [Op.like]: `%${title}`
                    } 

            },
                defaults:{
                    img,
                    release,
                    title,
                    score
                }
            });
        if(!created) return res.status(401).json({msg:'movie already exist'});
        if(characters) movie.addCharacters(characters)
        res.status(200).json('Movie created')
    }catch(err){
        next(err)
    }
};

const updateMovie = async (req,res,next) => {
    try{
        const { id } = req.params
        const {img,release,title,score,characters,action} = req.body
        const Movie = await Movie.findOne({
            where: {
                id
            }
        })
        if(!character) return res.status(401).json({msg: 'Movie not exist'})
        if( img || release || title || score ){
            const updateMovie = await character.update({
                img,
                release,
                title,
                score
            })
        if(!updateMovie) return res.status(401).json('invalid values')
        if(characters){
            if(action === 'add'){
                updateMovie.addCharacters(characters)
            }
            if(action === 'remove'){
                updateMovie.removeCharacters(characters)
            }
            else res.status(401).json({msg: 'invalid action'})
            }
        }
        res.status(201).json({msg:'movie updated'})
    }catch(err){
        next(err)
    }
};

const deleteMovie = async (req,res,next) => {
    const {id} = req.params
    const deleteMovie = await Movies.delete({
        where: {
            id
        }
    })
    if(!deleteMovie) return res.status(401).json({msg:'not match id'})
    res.status(201).json({msg:'movie deleted'})
};

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
}