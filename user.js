const user_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

class user {
    constructor(username, password, firstName, lastName, favorites) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.favorites = favorites;
    }

    update() {
        user_data.set(this.username.toString(), this);
    }

    delete() {
        user_data.del(this.username.toString());
    }
}

let u1 = new user("emily1", "pass", "Emily", "Junior", [1,2]);
user_data.set(u1.username.toString(), u1);

//return an array of all user ids
// get all usernames
// user.getAllUserNames = () => {
//     console.log('in the all userNames function')
//     return Object.keys(user_data.data).map((username => {return username;}));
// }


// //return user information by id
// user.findByID = (id) => {
//     let udata =  user_data.get(id);
//     if (udata == null) { 
//     console.log("no user with this ID"); 
//     return null;
//     }
//     return new user( udata.id, udata.username, udata.firstName, udata.lastName, udata.favorites, udata.diet);
// }

// user.next_id = user.getAllIDs().reduce((max, next_id) => {
//     if (max < next_id) {
//         return next_id;
//     }
//     return max;
// }, -1) + 1;

//create a user given parameters
user.create = (username, password, firstName, lastName, favorites) => {
    // let id = user.next_id;
    // user.next_id +=1;
    let u = new user(username, password, firstName, lastName, favorites);
    user_data.set(u.username.toString(), u);
    return u;
}

user.getFavorites = (username) => {
    let user = user_data.get(username);
    return user.favorites;
} 

//get all usernames so we can make sure no username is taken 
//const username_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

// get all usernames
user.getAllUserNames = () => {
    console.log('in the all userNames function')
    return Object.keys(user_data.data).map((username => {return username;}));
}


user.findByUsername = (username) => {
    let namedata = user_data.get(username);
    if (namedata == null) { 
        console.log("no user with this username, creation good to go"); 
        return null;
    }
    console.log("USER WITH THIS NAME EXISTS")
    return namedata;
}

module.exports = user;