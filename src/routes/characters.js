const {Router} = require('express')
const router = Router();
const { 
    getCharacters, 
    getCharactersById, 
    findCharacter, 
    createCharacter, 
    deleteCharacter, 
    updateCharacter } = require('../controllers/characters');

router.get('/',findCharacter,getCharacters);
router.get('/:id',getCharactersById);
router.put('/update/:id',updateCharacter)
router.post('/create',createCharacter)
router.delete('/delete/:id',deleteCharacter)

module.exports = router