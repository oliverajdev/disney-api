const { DataTypes } = require('sequelize');
const { hash } = require('../controllers/bcrypt');

module.exports = (sequelize) => {
    sequelize.define(
        'Users',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            userName: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    is: /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/,
                 
                    
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/,
                },
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                }
            },

    },{
        hooks: {
            afterValidate: (users,options) => {
                users.password = hash(users.password)
            }
        }
    })

}