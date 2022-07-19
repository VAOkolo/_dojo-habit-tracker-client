const db = connect("mongodb://localhost:27017/habittracker")

db.userInfo.drop()
db.habits.drop()
db.login.drop()


// db.userInfo.insertMany([
//     { userid: 111, habitid: "running", date: `18 july 2022.`, status: "complete"},
//     { userid: 112, habitid: "drinking water", date: `18 july 2022.`, status: "undone"},
//     { userid: 111, habitid: "running", date: `19 july 2022.`, status: "complete"}])


db.habits.insertMany([
    {content: "running", email: "vincent@gmail.com", dates: [{
        date: "7/15/2022",
        complete: "incomplete"
    },{
        date: "7/16/2022",
        complete: "complete"
    },{
        date: "7/17/2022",
        complete: "complete"
    }]}])


db.users.insertMany([
    {username: "dojo", email: "dojo@getgmail.com", password: "12345"},
    {username: "test1", email: "dojo@getgmail.com", password: "12345"},
    {username: "test2", email: "dojo@getgmail.com", password: "12345"},
    {username: "test3", email: "dojo@getgmail.com", password: "12345"},
    {username: "test4", email: "dojo@getgmail.com", password: "12345"}])


/**
 * requests
 *  - get - get user information by id
 *  - post - post new habit
 *  - post - post habit status and date
 *  - delete - delete habit
 *  - put request - change habit information e.g. shift status
 */
