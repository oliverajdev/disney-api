const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        'Genres',
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
                unique: true
            },
            img: {
                type: DataTypes.STRING,
                allowNull: false,
            },
    });

}