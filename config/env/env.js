var db_path = '';

if(process.env.NODE_ENV == 'development') {
    db_path = './config/env/development';
}

else if(process.env.NODE_ENV == 'production') {
    db_path = './config/env/production';
}

module.exports = {
    path: db_path
};