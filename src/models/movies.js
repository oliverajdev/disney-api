const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        'Movies',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            img: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: true
                }
    
            },
            release: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    len: [1,5]
                }
            }
    })

}
