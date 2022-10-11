const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const users = require('./models/users');

const  basename = path.basename(__filename);
const modelDefiners = [];
const  DATABASE = 'mssql://jerobd:Pediter17@localhost:1433/disneybd'

const sequelize = new Sequelize(
    DATABASE,
    {
        logging: false,
        native:false,
        dialectOptions:{
            ssl:{
                require:true,
                rejectUnauthorized: false,
            },
        },
    },
);

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);

let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);


sequelize.models = Object.fromEntries(capsEntries);

const { Characters, Genres, Movies, Users } = sequelize.models




Movies.belongsToMany(Characters,{through: 'CharactersMovies'});
Characters.belongsToMany(Movies,{through: 'CharactersMovies'});
Genres.hasMany(Movies);
Movies.belongsTo(Genres);


module.exports = {
    ...sequelize.models,
    conn: sequelize,
}