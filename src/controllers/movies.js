const { Movies, Characters, Genres } = require('../db');
const {  moviesValidator } = require('./validator');



const getMovies = async (req,res,next) => {
    try{
        const movies = await Movies.findAll({
            attributes: ['img','release','title']
        });
        res.status(200).json(movies)
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
            },
            attributes: ['title','img','score','release'],
            include: [
                {
                    model: Genres,
                    attributes: ['name','img']
                },
                {
                    model: Characters,
                    attributes: ['name','img'],
                    through: {
                        attributes: [],
                      },
                }
            ]
        });
        if(!movies) return res.status(400).json({msg:'Not match id'})
        res.status(201).json(movies)
    }catch(err){
        next(err)
    }
}

const findMovies = async (req,res,next) => {
    try{
        var detailMovie = undefined
        var {name,genre,order} = req.query
        if(!Object.keys(req.query).length) return next()
        if(!(name || genre || order )) return res.status(401).json({msg:'invalid query'})
        if(genre){
          genre = Number(genre)
          detailMovie = await Movies.findAll({
              attributes: ['img','release','title'],
              include:{
                  model: Genres,
                  attributes: ['id','name'],
                  where:{
                      id: genre
                }
            }
        });   
       }else if(order){
        if(order !== 'ASC' && order !== 'DESC') return res.status(401).json('invalid order')
        detailMovie = await Movies.findAll({
            attributes: ['img','release','title'],
            order:[
                ['createdAt',order]
            ]
      });

       }else{
        detailMovie = await Movies.findAll({
            attributes: ['img','release','title'],
            where: {
                title:name
            },
        });
       }
       if(!detailMovie) return res.status(400).json({msg: 'not match'})
       res.status(200).json(detailMovie)   
    }catch(err){
        next(err)
    }
};

const createMovie = async (req,res,next) => {
    try{
        const {img,release,title,score,genres,characters} = req.body
        const  validator = moviesValidator(req.body) 
        if(!validator) return res.status(400).json({msg:'incorrect values'})
        if(characters){
            var chars = await Characters.findAll({
                where: {
                    id: characters
                }
            })
            
            if(chars.length === 0) return res.status(400).json({msg:'not match IdCharacters'})
        }
        if(genres){
            var genr = await Genres.findOne({
                where: genres
            })
            if(!genr) return res.status(400).json({msg:'not match IdGenre'})
        }
        const [movie,created] =  await Movies.findOrCreate({
                  where:{
                    title
                  },
                  defaults:{
                    img,
                    release,
                    title,
                    score
                  }
                }
            );
   
        if(!created) return res.status(400).json({msg:'Movie already exist'});
        if(chars) await movie.addCharacters(characters)
        if(genr) await movie.setGenre(genr)
        res.status(201).json('Created movie')
    }catch(err){
        next(err)
    }
};

const updateMovie = async (req,res,next) => {
    try{
        const { id } = req.params
        const {img,release,title,score,characters,action} = req.body
        const  validator = moviesValidator(req.body) 
        if(!validator) return res.status(400).json({msg:'incorrect values'})
        const movie = await Movies.findOne({
            where: {
                id
            }
        })
        if(!movie) return res.status(400).json({msg: 'Movie not exist'})
        const updateMovie = await movie.update({
            img,
            release,
            title,
            score
            })
        if(!updateMovie) return res.status(400).json('invalid values')
        if(characters){
            if(action === 'add'){
                updateMovie.addCharacters(characters)
            }
            if(action === 'remove'){
                updateMovie.removeCharacters(characters)
            }
            else res.status(400).json({msg: 'invalid action'})
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
    if(!deleteMovie) return res.status(400).json({msg:'not match id'})
    res.status(201).json({msg:'movie deleted'})
};

module.exports = {
    getMovies,
    getMovieById,
    findMovies,
    createMovie,
    updateMovie,
    deleteMovie
}