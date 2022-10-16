const { Users } = require('../db');
const { compare } = require('./bcrypt');
const { signToken } = require('./jwt');
const { Op } = require('sequelize');
const { userValidator } = require('./validator');
const sendEmail = require('./email');



const LoginUser = async (req,res,next) => {
    try{
        const {userName=null,email=null,password} = req.body
        if(!((userName || email) && password)) return res.status(400).json({msg:'missing parameters'})
        const user = await Users.findOne({
            where: {
                [Op.or]:[{userName:userName},{email:email}]
            }
        });
        if(!user) return res.status(400).json({msg:'Incorrect user or password'})
        const hashPassword = user.password
        const auth = await compare(password,hashPassword)
        if(auth){
            const token =  signToken(user.id,user.userName) 
            res.status(200).json({token})
        }else return res.status(400).json({msg:'Incorrect user or password'})
    }catch(err){
        next(err)
    }
};


const registerUser =async  (req,res,next) =>{
    try{
        const {userName, password, email} = req.body;
        if(!(userName && password && email)) return res.status(400).json({msg:'missing parameters'})
        const validator = userValidator(userName,password,email);
        if(validator.switch){
            return res.status(400).json({msg:validator.msg})
        }
        const user = await Users.findOne({
            where: {
                [Op.or]:[{userName},{email}]
            }
        })
        if(user){ 
          if(userName === user.userName) return res.status(400).json({msg:'user already exist'})
          if(email === user.email) return res.status(400).json({msg:'email already exist'})
        }
        await Users.create({
            userName,
            password,
            email,
        }) 
        sendEmail(email,next)
        res.status(201).json({msg:'Created user'})
        
    }catch(err){
        
        next(err)
    }
};

module.exports ={
    LoginUser,
    registerUser
};