const { query } = require('express');
const { Characters,Movies } = require('../db');


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
        let {id} = req.params
        id = Number(id)
        if(isNaN(id)) return res.status(401).json({msg: 'invalid id'});
        const detailCharacter = await Characters.findByPk(id);
        if(!detailCharacter) res.status(401).json({msg: 'id not match'})
        else res.status(200).json(detailCharacter)
    }catch(err){
        next(err)
    }
};

const findCharacter = async (req,res,next) => {
    try{
        const detailCharacter = undefined
        const {name,size,age,movies} = req.query
        if(!Object.keys(req.query).length) return next()
        detailCharacter = await Characters.findAll({
            where: {
                name,
                size,
                age,
            },
            includes: {
                Movies,
                where: {
                    id: movies
                }
            } 
        });
       if(!detailCharacter) return res.status(401).json({msg: 'not match'})
       res.status(200).json(detailCharacter)   
    }catch(err){
        next(err)
    }
};

const createCharacter = async (req,res,next) => {
    try{
        const {img,name,age,size,story,movies} = req.body
        const [character,created] =  await Characters.findOrCreate({
            where:{
                name:{
                      [Op.iLike]: ` ${name}`
                    }

            },
                defaults:{
                    img,
                    name,
                    age,
                    size,
                    story
                }
            });
        if(created) return res.status(401).json({msg:'character already exist'});
        if(movies) character.addMovies(movies)
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
        if(!character) return res.status(401).json({msg: 'character not exist'})
        if(img || name || age || size || story){
            const updateCharacter = await character.update({
                img,
                name,
                age,
                size,
                story 
            })
        if(!updateCharacter) return res.status(401).json('invalid values')
        if(movies){
            if(action === 'add'){
                character.addMovies(movies)
            }
            if(action === 'remove'){
                character.removeMovies(movies)
            }
            else res.status(401).json({msg: 'invalid action'})
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