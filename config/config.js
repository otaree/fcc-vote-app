const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.MONGO_URI = 'mongodb://localhost/vote-app';
} else if (env === 'test') {
    process.env.MONGO_URI = 'mongodb://localhost/vote-app-test';
}