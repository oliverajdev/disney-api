const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        'Characters',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique:true,
            },
            img: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            size: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            story: {
                type: DataTypes.TEXT,
                allowNull: false
            }
    })

}