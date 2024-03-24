const express = require('express');
const app = express();
const port = 3000;

const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/connection', async (req, res) => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        res.send('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

app.post('/users', (req, res) => {
    res.status(201).json(req.body);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});