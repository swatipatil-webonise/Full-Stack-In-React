'use strict';
const fs = require('fs');
const jwt = require('jsonwebtoken');

var express = require("express");
var _ = require("lodash");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

var payload = { id: 0, username: null, email: null };
var privateKEY = fs.readFileSync('./private.key', 'utf8');
var publicKEY = fs.readFileSync('./public.key', 'utf8');
var issuer = 'Webonise corp';
var audience = 'webonise.com';

var signOptions = {
    issuer: issuer,
    audience: audience,
    expiresIn: "12h",
    algorithm: "RS256"
};

var todos = [
    {
        id: 1,
        desc: "learn node"
    }
];

var users = [
    {
        id: 1,
        name: "Swati",
        username: "swati",
        password: "swati",
        email: "swati@gmail.com"
    }, {
        id: 2,
        name: "Sneha",
        username: "sneha",
        password: "sneha",
        email: "sneha@gmail.com"
    }
];

var id = 1;
var userID = 2;

//Server will execute at 5000
app.listen(5000, function () {
    console.log("listing on localhost:5000");
});

//For direct api call
app.get("/alltodos", function (req, res) {
    return res.json(todos);
})

app.get("/users", function (req, res) {
    res.json(users);
});

app.post("/login", function (req, res) {
    let isSuccess = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === req.body.username) {
            if (users[i].password !== req.body.password) {
                res.status(206).json('You entered wrong password.');
                return;
            } else {
                payload = {
                    id: users[i].id,
                    username: users[i].username,
                    email: users[i].email,
                }
                var token = jwt.sign(payload, privateKEY, signOptions);
                isSuccess = true;
            }
        }
    }
    if (isSuccess)
        res.status(200).json({ token: token });
    else
        res.status(404).json('You need to register yourself first.');
});

app.post('/register', function (req, res) {
    let isSuccess = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === req.body.username) {
            res.status(205).json('Username already exist.');
            return;
        } else if (users[i].email === req.body.email) {
            res.status(206).json('Email already exist.');
            return;
        } else {
            isSuccess = true;
            var user = {
                id: userID++,
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            }
        }
    }
    if (isSuccess) {
        users.push(user);
        res.status(200).json({ user: user });
    }
});

app.get("/todos", function (req, res) {
    let success = false, bearerToken = req.header('Authorization');
    if (bearerToken === undefined) {
        return res.json({
            success: false,
            status: 403
        })
    }
    jwt.verify(bearerToken.slice(7, bearerToken.length), publicKEY, (err) => {
        if (err) {
            success = false;
        } else {
            success = true;
        }
    })
    if (success) {
        return res.json({
            success: true,
            todos: todos
        });
    } else {
        return res.json({
            success: false,
            status: 203
        });
    }
});


app.post("/todos", function (req, res) {
    let success = false, todo = {}, bearerToken = req.header('Authorization');
    if (bearerToken === undefined) {
        return res.json({
            success: false,
            status: 403
        })
    }
    jwt.verify(bearerToken.slice(7, bearerToken.length), publicKEY, (err) => {
        if (err) {
            success = false;
        } else {
            todo = {
                id: ++id,
                desc: req.body.desc
            };
            todos.push(todo);
            success = true;
        }
    })
    if (success) {
        return res.json({
            success: true,
            todo: todo
        });
    } else {
        return res.json({
            success: false,
            status: 203
        });
    }
});

app.delete("/todos/:id", function (req, res) {
    let success = false, bearerToken = req.header('Authorization');
    if (bearerToken === undefined) {
        return res.json({
            success: false,
            status: 403
        })
    }
    jwt.verify(bearerToken.slice(7, bearerToken.length), publicKEY, (err) => {
        if (err) {
            success = false;
        } else {
            todos = todos.filter((todo) => todo.id !== parseInt(req.params.id))
            success = true;
        }
    })
    if (success) {
        return res.json({
            success: true,
        });
    } else {
        return res.json({
            success: false,
            status: 203
        });
    }
});

app.put("/todos/:id", function (req, res) {
    let success = false, bearerToken = req.header('Authorization');
    if (bearerToken === undefined) {
        return res.json({
            success: false,
            status: 403
        })
    }
    jwt.verify(bearerToken.slice(7, bearerToken.length), publicKEY, (err) => {
        if (err) {
            success = false;
        } else {
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id === parseInt(req.params.id)) {
                    todos[i].desc = req.body.desc;
                }
            }
            success = true;
        }
    })
    if (success) {
        return res.json({
            success: true,
        });
    } else {
        return res.json({
            success: false,
            status: 203
        });
    }
});
