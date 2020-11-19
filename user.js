const user_data = require('data-store')({ path: process.cwd() + '/data/cooks.json' });

class user {
    constructor( id, username, firstName, lastName, favorites, diet) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.favorites = favorites;
        this.diet = diet;
    }

    update() {
        user_data.set(this.id.toString(), this);
    }

    delete() {
        user_data.del(this.id.toString());
    }
}

//let u1 = new user(0, "emily1", "Emily", "Junior", [1,2], 0);
//user_data.set(u1.id.toString(), u1);

//return an array of all user ids
user.getAllIDs = () => {
    return Object.keys(user_data.data).map((id => {return parseInt(id);}));
}

//return user information by id
user.findByID = (id) => {
    let udata =  user_data.get(id);
    if (udata == null) { 
    console.log("no user with this ID"); 
    return null;
    }
    return new user( udata.id, udata.username, udata.firstName, udata.lastName, udata.favorites, udata.diet);
}

user.next_id = user.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;

//create a user given parameters
user.create = (username, firstName, lastName, favorites, diet) => {
    let id = user.next_id;
    user.next_id +=1;
    let u = new user(id, username, firstName, lastName, favorites, diet);
    user_data.set(u.id.toString(), u);
    return u;
}

//get all usernames so we can make sure no username is taken 
const username_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

// get all usernames
user.getAllUserNames = () => {
    console.log('in the all userNames function')
    return Object.keys(username_data.data).map((username => {return username;}));
}


user.findByUsername = (username) => {
    let namedata = username_data.get(username);
    if (namedata == null) { 
        console.log("no user with this username, creation good to go"); 
        return null;
    }
    console.log("USER WITH THIS NAME EXISTS")
    return namedata;
}





module.exports = user;