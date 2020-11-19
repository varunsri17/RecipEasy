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

    let user = req.body.user;
    let password = req.body.password;

    let user_info = login_info.get(user);
    if (user_info == null) {
        res.status(404).send("Not found")
        return;
    }

    if (user_info.password == password) {
        console.log("VALID CREDENTIALS" + ' ' + user)
        req.session.user = user;
        res.json(true);
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
app.get('/user', async(req, res, next) => {
    res.json(user.getAllIDs());

});
// get user data by id
app.get('/user/:id', (req,res) => {
    if(req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }
    let u = user.findByID(req.params.id);
    if (u == null) {
        res.status(404).send("User not found using user.findbyId");
        return;
    }
    if(u.username!= req.session.user) {
        res.status(403).send("Unauthorized")
        return;
    }
    res.json(u);
});

// create user information
app.post('/user', cors(), (req, res) => {
    let {firstName, lastName, favorites, diet } = req.body;
    let u = user.create(username,firstName, lastName, favorites, diet);
    if (u == null) {
        res.status(404).send("Bad Request");
    }
    return res.json(u);
});

// update user information
app.put('/user/:id', cors(), (req, res) => {
    if(req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }
    let u = user.findByID(req.params.id);
    if (u == null) {
        res.status(404).send("User not found using user.findbyId");
        return;
    }
    if(u.username!= req.session.user) {
        res.status(403).send("Unauthorized")
        return;
    }
    let {firstName, lastName, favorites, diet,} = req.body;
    u.firstName = firstName;
    u.lastName = lastName;
    u.favorites = favorites;
    u.diet = diet;
    u.update();
    res.json(u);
});

// delete user information
app.delete('/user/:id', cors(), (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }
    let u = user.findByID(req.params.id);
    if (u == null) {
        res.status(404).send("User not found");
        return;
    }
    if(u.username!= req.session.user) {
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