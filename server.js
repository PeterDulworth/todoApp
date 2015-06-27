var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    env = require('./config/env/env'),
    db = require(env.path),
    port = process.env.PORT || 8080;

mongoose.connect(db.url);
console.log(chalk.bgGreen('Connected to mongodb with url: ' + db.url));

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

require('./app/routes')(app);

app.listen(port);
console.log(chalk.bgMagenta('App started on port ' + port));
