const jwt = require('jsonwebtoken')

// AUTHENTICATION
const authentication = async (req, res, next) => {
    try {

        let token = req.headers['authorization']
        if (!token) {
            return res.status(401).send({ status: false, msg: "Authentication token is required" })
        
            
            let decodedToken = jwt.verify(token, "Nikita")
            if (decodedToken) {
                req.userId = decodedToken.userId
                next()}
            
            }
            }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
};


module.exports = { authentication }