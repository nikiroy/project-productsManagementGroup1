const validator = require('../validations/validator')
const UserModel = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")



const createUser = async function (req, res) {
    try {
        const data = req.body
        const file =req.files


        // Validate body 
        if (!validator.isValidBody(data)) {
            return res.status(400).send({ status: false, msg: "User body should not be empty" });
        }

        let { fname, lname, email, password, phone, address } = data
        // Validate fname
        if (!fname) return res.status(400).send({ status: false, message: "fname must be present" })
        if (!validator.isValidName(fname)) return res.status(400).send({ status: false, msg: "Invalid fname" })


        // Validate lname
        if (!lname) return res.status(400).send({ status: false, message: "lname must be present" })
        if (!validator.isValidName(lname)) return res.status(400).send({ status: false, msg: "Invalid lname" })


        // Validate email
        if (!email) return res.status(400).send({ status: false, message: "email must be present" })
        if (!validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "Invalid email id" })
        const emailExists = await UserModel.findOne({ email: email });
        if (emailExists) return res.status(400).send({ status: true, msg: "Email Already Exists!! Please Check with Another" })


        // Validate password
        if (!password) return res.status(400).send({ status: false, message: "password must be present" })
        if (!validator.isVaildPass(password)) return res.status(400).send({ status: false, message: "Password should be 8-15 characters long and must contain one of 0-9,A-Z,a-z and special characters" })
        const codedPassword = await bcrypt.hash(password, 10)
        data.password = codedPassword

        // Validate phone
        if (!phone) return res.status(400).send({ status: false, message: "phone must be present" })
        if (!validator.isValidPhone(phone)) return res.status(400).send({ status: false, msg: "Invalid phone number" })
        const phoneExists = await UserModel.findOne({ phone: phone });
        if (phoneExists) return res.status(400).send({ status: true, msg: "Phone Number Already Exists!! Please Check with Another" })



        // Validate address
        if (!address) {
            return res.status(400).send({ status: false, message: "Address is required" })
        }

        // Validate shipping address
        if (!validator.isValid(address.shipping)) {
            return res.status(400).send({ status: false, message: "Shipping address is required" })
        }

        // Validate street, city, pincode of shipping
        if (!validator.isEmpty(address.shipping.street && address.shipping.city && address.shipping.pincode)) {
            return res.status(400).send({ status: false, message: "Shipping address details is/are missing" })
        }

        // Validate shipping pincode
        if (!validator.isValidpincode(address.shipping.pincode)) {
            return res.status(400).send({ status: false, msg: "Invalid Shipping pincode" })
        }

        // Validate billing address
        if (!validator.isEmpty(address.billing)) {
            return res.status(400).send({ status: false, message: "Billing address is required" })
        }

        // Validate street, city, pincode of billing
        if (!validator.isEmpty(address.billing.street && address.billing.city && address.billing.pincode)) {
            return res.status(400).send({ status: false, message: "Billing address details is/are missing" })
        }
        if (!address.billing.pincode) return res.status(400).send({ status: false, msg: "Plese enter a pincode" })
        if (!validator.isValidpincode(address.billing.pincode)) {
            return res.status(400).send({ status: false, msg: "Invalid billing pincode" })
        }
        if (files.length === 0) return res.status(400).send({ status: false, message: "Profile Image is mandatory" })
        if (!isVaildfile(files.originalname)) return res.status(400).send({ status: false, message: "profile image file is not valide" })
        let profileImage = await config.uploadFile(files[0]); //upload image to AWS

        
        //object destructuring for response body.
        const userData = { fname, lname, email, profileImage, phone, password: codedPassword, address }
        const saveUserData = await userModel.create(userData);
        return res.status(201).send({ status: true, message: "user created successfully.", data: saveUserData });
        
        

    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
};

const loginUser = async function (req, res)  {
    try {
        const body = req.body;
        //Validate body 
        if (!validator.isValidBody(body)) {
            return res.status(400).send({ status: false, msg: "User body should not be empty" });
        }

        let email = body.email;
        let password = body.password;

        // Validate email
        if (!email) {
            return res.status(400).send({ status: false, message: "email must be present" })
        }

        // Validation of email id
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Invalid email id" })
        }

        // Validate password
        if (!password) {
            return res.status(400).send({ status: false, message: "password must be present" })
        }

        // Validation of password
        if (!validator.isVaildPass(password)) {
            return res.status(400).send({ status: false, message: "Invalid password" })
        }
        if (email && password) {
            let user = await UserModel.findOne({ email })
            if (!user) {
                return res.status(404).send({ status: false, message: "Email does not exist. Kindly create a new user" })
            }

    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
};




module.exports ={createUser,loginUser}








