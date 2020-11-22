const express = require('express');

const app = express();

const user = require('./user.js')

const bodyParser = require('body-parser');

const expressSession = require('express-session')

app.use(expressSession( {
    name: "eazySessionCookie",
    secret: "express eazy secret",
    resave: false,
    saveUnitialized: false,
    cookie: { secure: false }
}));

app.use(bodyParser.json());
//hello
//apparently this is very unsafe and we need a better way to this
const cors = require('cors');    
app.use(cors({
    origin: function(origin, callback){
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
  }));

const spoonApiKey = process.env.SPOON_API_KEY

// DOCUMENTATION URL https://spoonacular.com/food-api/docs#Search-Recipes-Complex

//Get request URL for complex searches
const complexSearchURL = 'https://api.spoonacular.com/recipes/complexSearch';

// Get request URL for searching by ingredients
const searchByIngredientsURL = 'https://api.spoonacular.com/recipes/findByIngredients';

// Get request URL for getting recipe info
const getRecipeInfoURL = 'https://api.spoonacular.com/recipes/{id}/information'

// Get request URL for autocomplete search to suggest impartial searches
const autoCompleteURL = 'https://api.spoonacular.com/recipes/autocomplete'


//
const login_info = require('data-store')({ path: process.cwd() + '/data/users.json' });
//test
//const login_info = require('data-store')({ path: process.cwd() + '/data/users.json' });


//LOGIN CALLS
app.post('/login', (req,res) => {

    let username = req.body.username;
    let password = req.body.password;

    //let user_info = login_info.get(username);
    let user_info = user.findByUsername(username);
    if (user_info == null) {
        res.status(404).send("Not found")
        return;
    }

    if (user_info.password == password) {
        console.log("VALID CREDENTIALS" + ' ' + username);
        req.session.username = username;
        res.json(user_info);
        return;
    }
    res.status(403).send("UNAUTHORIZED USER THIS IS THE FBI")
    
})

//LOGOUT CALL
app.get('/logout', (req,res) => {
    delete req.session.user;
    res.json(true);
})

//USER CALLS

//get all usernames
app.get('/usernames', async(req, res, next) => {
    res.json(user.getAllUserNames());
    
});

// see if there is someone with this username
app.get('/usernames/:username', async(req, res, next) => {
    let u = user.findByUsername(req.params.username)

    if (u ==null) {
        res.status(200).send("No user with this username: " + req.params.username );
        return;
    }
    res.status(409).send('USER WITH USERNAME: ' + req.params.username + ' FOUND')
    
});


// get all user
// This wont require authentication so we can get all infos sent without password
// or we can add authentication and then use our cookie to get in
// app.get('/user', async(req, res, next) => {
//     res.json(user.getAllIDs());

// });
// get user data by username
app.get('/user/:username', (req,res) => {
    console.log(req.session.username);
    if(req.session.username == undefined) {
        res.status(403).send(" FIRST Unauthorized");
        return;
    }
    let u = user.findByUsername(req.params.username);
    if (u == null) {
        res.status(404).send("User not found using Username");
        return;
    }
    console.log(u);
    console.log(u.username);
    if(u.username!= req.session.username) {
        res.status(403).send(" LAST Unauthorized")
        return;
    }
    res.json(u);
});

// //get the users favorites
// app.get('/user/:id/favorites', (req,res) => {
//     if(req.session.user == undefined) {
//         res.status(403).send("Unauthorized");
//         return;
//     }
//     let u = user.findByID(req.params.id);
//     if (u == null) {
//         res.status(404).send("User not found using user.findbyId");
//         return;
//     }
//     if(u.username!= req.session.user) {
//         res.status(403).send("Unauthorized")
//         return;
//     }
//     res.json(u);
// });

// create user information
app.post('/user', cors(), (req, res) => {
    let {username, password, firstname, lastname, favorites } = req.body;
    let u = user.create(username, password, firstname, lastname, favorites);
    if (u == null) {
        res.status(404).send("Bad Request");
    }
    return res.json(u);
});

// update user information
app.put('/user/:username', cors(), (req, res) => {
    if(req.session.username == undefined) {
        console.log(req.session.username)
        res.status(403).send("Unauthorized");
        return;
    }
    let u = user.findByUsername(req.params.username);
    if (u == null) {
        res.status(404).send("User not found using user.find");
        return;
    }
    if(u.username!= req.session.username) {
        res.status(403).send("Unauthorized")
        return;
    }
    let favorites = req.body.favorites;
    console.log(favorites);
    console.log(u);
    u.favorites = favorites;
    console.log(u);
    u.update();
    res.json(u);
    console.log("successful update of user info!")
});

// delete user information
app.delete('/user/:username', cors(), (req, res) => {
    if (req.session.username == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }
    let u = user.findByUsername(req.params.username);
    console.log("We are trying to figure out whats wrong with you");
    console.log(u);
    console.log("where is the user data");
    if (u == null) {
        res.status(404).send("User not found");
        return;
    }
    if(u.username!= req.session.username) {
        res.status(403).send("Unauthorized")
        return;
    }
    u.delete();
    res.json(true);
});

const port = process.env.PORT ||  3000;

// Listening on the port
app.listen(port, () => {
    console.log('Server listening on port:' + port );
});

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//To try PostMan Request:
/*
{"firstName": "Jared", 
"lastName": "White", 
"favorites": [0, 1, 2],
"diet": "ten"}
*/