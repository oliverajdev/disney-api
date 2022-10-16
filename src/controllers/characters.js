const { Characters,Movies } = require('../db');
const { characterValidator } = require('./validator');
const { Op } = require('sequelize')

const getCharacters = async (req,res,next) => {
    try{
        const allCharacters = await Characters.findAll({
            attributes: ['img','name']
        });
        res.status(200).json(allCharacters)
    }catch(err){
        next(err)
    }
};

const getCharactersById = async (req,res,next) => {
    try{
        const {id} = req.params
        const detailCharacter = await Characters.findOne({
            attributes: ['name','size','age','story','img'],
            where:{
                id
            },
            include: {
                model: Movies,
                attributes:['title','img'],
                through: {
                    attributes: [],
                  },
            }
        });
        if(!detailCharacter) res.status(401).json({msg: 'id not match'})
        else res.status(200).json(detailCharacter)
    }catch(err){
        next(err)
    }
};

const findCharacter = async (req,res,next) => {
    try{
        var detailCharacter = undefined
        var {size,age,size,idMovies} = req.query
        if(!Object.keys(req.query).length) return next()
        if(!(size || age || size ||idMovies)) return res.status(401).json({msg:'invalid query'})
        if(idMovies){
          idMovies = Number(idMovies)
          detailCharacter = await Characters.findAll({
             attributes: ['img','name'],
              include:{
                  model: Movies,
                  where:{
                      id: idMovies
                },
                attributes: []
            }
        });   
       }else{
        if(size || age) {
           age = Number(age)
           size = Number(size)         
        }
        detailCharacter = await Characters.findAll({
            attributes: ['img','name'],
            where: {
                [Op.or]: req.query
            },
        });
       }
       if(!detailCharacter) return res.status(400).json({msg: 'not match'})
       res.status(200).json(detailCharacter)   
    }catch(err){
        next(err)
    }
};

const createCharacter = async (req,res,next) => {
    try{
        const {img,name,age,size,story,movies} = req.body
        const validator = characterValidator(req.body)
        if(!validator) return res.status(400).json({msg: 'invalid values'})
        const findMovies = await Movies.findAll({
            where:{
                id: movies
            }
        })
        if(!findMovies) res.status(400).json({msg:'movies not match'})
        const [character,created] =  await Characters.findOrCreate({
            where:{
                name
            },
                defaults:{
                    img,
                    name,
                    age,
                    size,
                    story
                }
            });
        if(!created) return res.status(400).json({msg:'character already exist'});
        if(movies) await character.addMovies(movies)
        res.status(200).json('character created')
    }catch(err){
        next(err)
    }
};

const updateCharacter = async (req,res,next) => {
    try{
        const { id } = req.params
        const { img,name,age,size,story,movies,action } = req.body
        const character = await Characters.findOne({
            where: {
                id
            }
        })
        if(!character) return res.status(400).json({msg: 'character not exist'})
        if(img || name || age || size || story){
            const updateCharacter = await character.update({
                img,
                name,
                age,
                size,
                story 
            })
        if(!updateCharacter) return res.status(400).json('invalid values')
        if(movies){
            if(action === 'add'){
                character.addMovies(movies)
            }
            if(action === 'remove'){
                character.removeMovies(movies)
            }
            else res.status(400).json({msg: 'invalid action'})
            }
        }
        res.status(201).json(character)
    }catch(err){
        next(err)
    }
};

const deleteCharacter = async (req,res,next) => {
    const {id} = req.params
    const deleteChar = await Characters.delete({
        where: {
            id
        }
    })
    if(!deleteChar) return res.status(401).json({msg:'not match id'})
    res.status(201).json({msg:'char deleted'})
};





module.exports = {
    getCharacters,
    getCharactersById,
    findCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter,
}