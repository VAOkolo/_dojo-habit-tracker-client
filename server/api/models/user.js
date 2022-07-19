const { init } = require("../dbConfig");


class User {
    constructor(data){
        this.username = data.username
        this.email = data.email
        this.passwordDigest = data.password_digest
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
                } catch (err) {
                    reject('Error creating user');
                }
            });
        
    }

    static findByName(input_email) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const userData = await db.collection("users").find( { email: input_email} )
                const user = new User(userData.ops[0])        
                if( !user ) { throw new Error('No users here!')}
                resolve(user);
            } catch (err){
                reject(`Error retrieving users: ${err.message}`)
            }
        })
    }
}

module.exports = User
