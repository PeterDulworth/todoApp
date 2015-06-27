var express = require('express'),
    app = express(),
    router = express.Router(),
    TodoModel = require('./models/todo.model.js');

module.exports = function (app) {
    router.use(function (req, res, next) {
        next();
    });

    router.route('/todos')
        .get(function (req, res) {
            TodoModel.find(function (err, todos) {
                if (err)
                    res.send(err);

                res.json(todos);
            });
        })
        .post(function (req, res) {
            // create a todo, information comes from AJAX request from Angular
            TodoModel.create({
                text : req.body.text,
                done : false
            }, function(err, todo) {
                if (err)
                    res.send(err);

                // get and return all the todos after you create another
                TodoModel.find(function(err, todos) {
                    if (err)
                        res.send(err);
                    res.json(todos);
                });
            });
        });
    router.route('/todos/:todo_id')
        .delete(function(req, res) {
            if(req.params.todo_id == 'reset') {
                TodoModel.remove({}, function(err, todo) {
                    if (err)
                        res.send(err);

                    // get and return all the todos after you create another
                    TodoModel.find(function(err, todos) {
                        if (err)
                            res.send(err);
                        res.json(todos);
                    });
                });
            } else {
                TodoModel.remove({
                    _id : req.params.todo_id
                }, function(err, todo) {
                    if (err)
                        res.send(err);

                    // get and return all the todos after you create another
                    TodoModel.find(function(err, todos) {
                        if (err)
                            res.send(err);
                        res.json(todos);
                    });
                });
            }
        });

    app.use('/api', router);

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.get('/api/users', function(req, res) {
      var user_id = req.param('id');
      var token = req.param('token');
      var geo = req.param('geo');

      res.send(user_id + ' ' + token + ' ' + geo);
    });

    app.get('*', function (req, res) {
        res.redirect('/');
    });
};

