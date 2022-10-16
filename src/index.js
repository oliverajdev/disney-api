const app = require('./app');
const { conn } = require('./db');
const {Genres} = require('./db');


const {PORT} = process.env
conn.sync({force:true}).then(async () => {
    await Genres.create({
        name: 'Accion',
        img: 'https://www.nyfa.edu/student-resources/wp-content/uploads/2015/03/action-movie-1024x640.jpg'
      })
    app.listen(PORT, async () => {
        console.log(`listen on port ${PORT}`)
    });
});

