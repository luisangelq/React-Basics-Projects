const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
        });
        console.log('MongoDB Connected...');
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;