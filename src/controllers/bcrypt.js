const bcrypt = require("bcrypt")


const hash =  (password) => {
    const hash =  bcrypt.hashSync(password, 10);
    return hash;  
};

const  compare = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword);
    return match
};



module.exports =
{
    hash,
    compare,
};