let userModels = require('../models/user');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken')

const userRegister = async (req, res, next) => {
    // console.log(req.body);
    const { fname, lname, email, password, role } = req.body

    const emailExist = await userModels.findOne({ email: email })
    console.log("emailExist", emailExist);
    try {
        // when the user alreay register
        if (emailExist) {
            res.json({
                error: true,
                message: 'Already exist',
                data: null
            })
        } else {
            let saltRound = 10;
            let salt = await bcrypt.genSalt(saltRound);
            console.log(salt);
            let hashedPassword = await bcrypt.hash(password, salt)
            console.log(hashedPassword);

            // inserting the data
            await userModels.insertMany({
                fname,
                lname,
                email,
                password: hashedPassword,
                role
            })

            let userObj = {
                fname,
                lname,
                email,
                password,
                role
            }

            res.status(200).json({
                error: false,
                message: 'Register Successfilly',
                data: [userObj]
            })
        }
    } catch (err) {
        next(err)
    }

}

const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(req.body);
    try {
        let userData = await userModels.findOne({ email })
        // console.log(userData);
        if (userData) {
            const { fname, lname, email, password, role } = userData;
            // console.log(password);

            let isPasswordValid = await bcrypt.compare(
                req.body.password,
                userData.password
            );
            console.log(isPasswordValid);
            if (isPasswordValid) {
                // jwt
                const payload = { fname, email, role };
                const token = jwt.sign(payload, "thisissecreateKey", { expiresIn: "24hr" });
                console.log("token", token);
                res.status(200).json({
                    error: false,
                    message: 'Login Successfull',
                    token: token,
                    data: [{
                        fname,
                        lname,
                        email,
                        password,
                        role,

                    }]
                })
            } else {
                res.status(403).json({
                    error: true,
                    message: 'Invalid Password',
                    data: null

                })
            }

        } else {
            res.status(401).json({
                error: true,
                message: 'Invalid Email',
                data: null
            })
        }

    } catch (err) {
        next(err)
    }

}

module.exports = {
    userRegister,
    userLogin
}