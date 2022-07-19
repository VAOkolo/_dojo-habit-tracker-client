const { init } = require('../dbconfig')
const { ObjectId } = require('mongodb')

class Habit {
    constructor(data){
        this.id = data.id,
        this.content = data.content,
        this.email = data.email,
        this.dates = data.dates
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                console.log(db)
                const habitData = await db.collection('habits').find().toArray()
                const habits = habitData.map(h => new Habit({...h, id: h._id}))
                resolve(habits);
            } catch (err) {
                console.log(err)
                reject("Error retrieving habit")
            }
        })
    }

    static create (content, email) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let habitData = await db.collection('habits').insertOne({content, email})
                let newHabit = new Habit(habitData.ops[0])
                resolve(newHabit)
            } catch(err) {
                reject('Error creating habit')
            }
        })
    }

    static findByEmail (email) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let habitData = await db.collection('habits').find({"email": email }).toArray()
                let habits = new Habit({...habitData[0], email: habitData[0].email});
                resolve (habits);
            } catch (err) {
                reject('Habits not found');
            }
        });
    }

    update(dateId) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                await db.collection('habits').updateOne({ dates: {dateid: datesId }},
                                                            { $set: { "complete": dates.complete }})
                resolve("habit was updated");
            } catch (err) {
                console.log(err)
                reject(err, 'Error updating post');
            }
        });
    }

    

}

module.exports = Habit
