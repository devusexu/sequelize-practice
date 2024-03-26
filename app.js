const express = require('express');
const app = express();
const port = 3000;
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const db = require('./models');
const errorHandler = require('./middlewares/errorHandler');

testDatabaseConnection();

// set up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up routes 
app.use('/users', userRouter);
app.use('/books', bookRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

async function testDatabaseConnection() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        // terminate the application
        process.exit(1);
    }
}