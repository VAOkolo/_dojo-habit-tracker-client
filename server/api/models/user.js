const { init } = require("../dbConfig");


class User {
    constructor(data){
        this.username = data.username
        this.email = data.email
        this.password = data.password
    }
    
    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const dbData = await db.collection('users').find({}).toArray()
                const users = dbData.map(d => new User(d));
                if( !users.length ) { throw new Error('No users here!')}
                resolve(users);
            } catch (err){
                reject(`Error retrieving users: ${err.message}`)
            }
        })
    }

    static create({username, email, password}){

            return new Promise (async (resolve, reject) => {
                try {
                    console.log("CREATE")
                    const db = await init();
                    console.log("DB CONECTED")
                    console.log(await db.collection('users').find().toArray())
                    console.log("DB")
                    // let userData = await db.collection('users').insertOne({username,  email,password});
                    let userData = await db.collection('users').insertOne({username,  email,password});
                    resolve (userData);
                    console.log('User created')
                } catch (err) {
                    reject('Error creating user');
                }
            });
        
    }

    static findByEmail(input_email) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const userData = await db.collection("users").find( { email: input_email} ).toArray()
                if( !userData ) { throw new Error('No user here!')}
                resolve(userData[userData.length-1]);
            } catch (err){
                reject(`Error retrieving users: ${err.message}`)
            }
        })
    }
}

module.exports = User
