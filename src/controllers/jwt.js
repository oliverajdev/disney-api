
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





const  verifyToken = async (req,res,next) =>
{
    try
    {
    const {authorization} = req.headers;



       const token = authorization.split(" ").pop()

       if( await  jwt.verify(token, JWT_SECRET)){
        next()
       }
    }
    catch(err)
    {
       next(err)
    };
};


module.exports =
{
    signToken,
    verifyToken,
};