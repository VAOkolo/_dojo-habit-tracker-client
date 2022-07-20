const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    console.log("CONSOLELOG HEADER")
    const header = req.headers['authorization'];
    const header_string = JSON.stringify(header)
    console.log(!header_string)
    if (header !== "null" && !header_string == false) {
        const token = header.split(' ')[1];
        console.log(token)
        console.log(process.env.SECRET,)
        jwt.verify(token, process.env.SECRET, async (err, data) => {
            console.log(data);
            if(err){
                res.status(403).json({ err: 'Invalid token' })
            } else {
                res.status(200).json({ pass: 'Success' })
                next();
            }
        })
    } else {
        res.status(403).json({ err: 'Missing token' })
    }
}
module.exports = {
    verifyToken
}
