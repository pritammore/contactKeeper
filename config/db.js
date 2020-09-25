const mongoose = require('mongoose');
const config = require('config');
db = config.get("mongoURI");

const connectDB = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Mongo db connect')
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    });
}

module.exports = connectDB;