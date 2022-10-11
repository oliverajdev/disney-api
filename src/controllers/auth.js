const { Users } = require('../db')
const { compare } = require('./bcrypt')
const { signToken } = require('./jwt')



const LoginUser = async (req,res,next) => {
    try{
        const {userName, password} = req.body

        const user = await Users.findOne({
            where: {
                userName
            }
        });

        if(!user) return res.status(401).json({msg:'Incorrect user or password'})

        const hashPassword = user.password

        const auth = await compare(password,hashPassword)
        

        if(auth){
            const token =  signToken(user.id,user.userName) 
            res.json({token})
        }else return res.status(401).json({msg:'Incorrect user or password'})

        


    }catch(err){
        next(err)
    }
}


const registerUser =async  (req,res,next) =>{
    try{

        const {userName, password, email} = req.body;
        
        const createUser = await Users.create({
            userName,
            password,
            email,
        })

        
        res.status(200)
    

    }catch(err){
        
        next(err)
    }
}

module.exports ={
    LoginUser,
    registerUser
}