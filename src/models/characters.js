const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        'Characters',
        {
            id: {
                type: DataTypes.INTEGER,
                defaultValue: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            img: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.DATE,
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