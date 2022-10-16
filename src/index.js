const app = require('./app');
const { conn } = require('./db');
const {Genres} = require('./db')

conn.sync({force:true}).then(async () => {
    await Genres.create({
        name: 'Accion',
        img: 'https://www.nyfa.edu/student-resources/wp-content/uploads/2015/03/action-movie-1024x640.jpg'
      })
    app.listen(3001, async () => {
        console.log('listen on port 3001')
    });
});

