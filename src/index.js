const app = require('./app');
const { conn } = require('./db');

conn.sync().then(async () => {
    app.listen(3001, async () => {
        console.log('listen on port 3001')
    });
});

