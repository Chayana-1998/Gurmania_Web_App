const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/gurmania', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB запущен');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;