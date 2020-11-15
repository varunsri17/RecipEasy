const express = require('express');

const app = express();

const user = require('./user.js')

const bodyParser = require('body-parser');

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

// get all user
app.get('/user', async(req, res, next) => {
    res.json(user.getAllIDs());

});

// get user by id
app.get('/user/:id', (req,res) => {
    let u = user.findByID(req.params.id);
    if (u == null) {
        res.status(404).send("User not found");
        return;
    }
    res.json(u);
});

// create user information
app.post('/user', cors(), (req, res) => {
    let {firstName, lastName, favorites, diet} = req.body;
    let u = user.create(firstName, lastName, favorites, diet);
    if (u == null) {
        res.status(404).send("Bad Request");
    }
    return res.json(u);
});

// update user information
app.put('/user/:id', cors(), (req, res) => {
    let u = user.findByID(req.params.id);
    if (u == null) {
        res.status(404).send("User not found");
        return;
    }
    let {firstName, lastName, favorites, diet} = req.body;
    u.firstName = firstName;
    u.lastName = lastName;
    u.favorites = favorites;
    u.diet = diet;
    u.update();
    res.json(u);
});

// delete user information
app.delete('/user/:id', cors(), (req, res) => {
    let u = user.findByID(req.params.id);
    if (u == null) {
        res.status(404).send("User not found");
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