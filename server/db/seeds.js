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
        complete: "incomplete",
        note: {
            createdAt: "",
            editedAt: "",
            text: ""
        }
    },{
        date: "7/16/2022",
        complete: "complete",
        note: {
            createdAt: "",
            editedAt: "",
            text: ""
        }
    },{
        date: "7/17/2022",
        complete: "complete",
        note: {
            createdAt: "",
            editedAt: "",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    }]},
        {content: "swimming", email: "vincent@gmail.com", dates: [{
            date: "7/15/2022",
            complete: "incomplete",
            note: {
                createdAt: "",
                editedAt: "",
                text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
            }
        },{
            date: "7/16/2022",
            complete: "complete",
            note: {
                createdAt: "",
                editedAt: "",
                text: ""
            }
        },{
            date: "7/17/2022",
            complete: "complete",
            note: {
                createdAt: "",
                editedAt: "",
                text: ""
            }
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
