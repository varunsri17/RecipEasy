const user_data = require('data-store')({ path: process.cwd() + '/data/user.json' });

class user {
    constructor(id, firstName, lastName, favorites, diet) {
        this.id = id;
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

let u1 = new user(0, "Emily", "Junior", [1,2], 0);
user_data.set(u1.id.toString(), u1);

//return an array of all user ids
user.getAllIDs = () => {
    return Object.keys(user_data.data).map((id => {return parseInt(id);}));
}

//return user information by id
user.findByID = (id) => {
    let udata =  user_data.get(id);
    if (udata == null) return null;
    return new user(udata.id, udata.firstName, udata.lastName, udata.favorites, udata.diet);
}

user.next_id = user.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;

//create a user given parameters
user.create = (firstName, lastName, favorites, diet) => {
    let id = user.next_id;
    user.next_id +=1;
    let u = new user(id, firstName, lastName, favorites, diet);
    user_data.set(u.id.toString(), u);
    return u;
}

module.exports = user;