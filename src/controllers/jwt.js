
const jwt = require("jsonwebtoken");

const JWT_SECRET = '12345678';


const signToken =  ({userId,userName}) =>
{
    return jwt.sign(
        {
            userId,
            userName
        
        },
        JWT_SECRET,
        {
            // expiresIn: "24h",
        },
    );
};





const  verifyToken = async (req,res,next) =>{
    try{
       const {authorization} = req.headers;
       if(!authorization) return res.status(401).json({msg:'Required authrorization'})
       const token = authorization.split(" ").pop()
       const verify = await jwt.verify(token, JWT_SECRET)
       if(verify){
        next()
       }else{
        return res.status(401).json({msg:'Unauthorized'})
       }
    }catch(err){
       next(err)
    };
};


module.exports =
{
    signToken,
    verifyToken,
};
