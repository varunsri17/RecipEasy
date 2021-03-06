# RecipEasy
Authors: Nuran Golbasi, Hisham Masood, Prasiddhi Jain, Varun Srivastava

COMP 426 Final Project – RecipEasy Tool

This GitHub contains the code for the BackEnd of the RecipEasy tool.

User Object using data-store to create and store information about user.
Username used to search for information, and required upon login.
Array used to track favorites. 
Express used to connect front end and back end. Host of API calls used.

Languages: JavaScript and HTML
Tools and Frameworks: Node.js, Express.js

The github repository for our frontend is as following: https://github.com/Hmasood97/RecipEasyFrontEnd/new/master
FrontEnd Link: https://recipeazy426.herokuapp.com/index.html

# API Documentation

Login with Username and Password\
Method: Post\
Endpoint: https://recipeasy426.herokuapp.com/login \
Request Body: {username, password}\
JSON Response: {username, password, firstname, lastname, favorites}

Logout\
Method: Get\
Endpoint: https://recipeasy426.herokuapp.com/logout

Get All Usernames\
Method: Get\
Endpoint: https://recipeasy426.herokuapp.com/usernames \
JSON Response: array of all usernames

Get User Information\
Method: Get\
Endpoint: https://recipeasy426.herokuapp.com/usernames/:username \
Path Parameter: username\
JSON Response: {username, password, firstname, lastname, favorites}

Create User\
Method: Post\
Endpoint: https://recipeasy426.herokuapp.com/user \
Request Body: {username, password, firstname, lastname, favorites}

Update User Information\
Method: Put\
Endpoint: https://recipeasy426.herokuapp.com/user/:username \
Path Parameter: username\
Request Body: {username, password, firstname, lastname, favorites}

Delete User\
Method: Delete\
Endpoint: https://recipeasy426.herokuapp.com/user/:username \
Path Parameter: username

# Description Of Our Web App

What is RecipEasy?
Well, imagine this scenario: it’s been a busy week, and you haven’t had much time to meal prep or go grocery shopping. 
You don’t have enough money to afford UberEats for a third time this week.
But, you have a potpourri of leftover ingredients that you don’t know what to do with. 
Moreso, you don’t know what you can really make with those ingredients. 
RecipEasy will solve this problem by allowing users to easily find recipes with whatever ingredients that you have. 
We would like to empower YOU to be more effective and efficient home cooks!

What features are contained in the website?

Search By The Ingredients You Have right at Home! (Ingredient Search)
For ingredient search all you need to do is just type the ingredients you have at home and our magical search engine will find a recipe for you! 
We will return recipes and then let you know what main ingredients you might need to go get. 
We also let you know about some main dietry facts about the recipes as well as a link to the full instructions.

Smart Search
Type In anything!
Our smart search is able to take in any combination of words and find recipes related to what you just searched. 
Want to eat something chocolate, but your dietary restriction is vegan? 
Well then just type in vegan chocolate and we can find you vegan chocolate recipes!

Creat your own account and save your favorite recipes!
