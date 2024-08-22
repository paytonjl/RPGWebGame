import mongodb from "mongodb"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
//const ObjectID = mongodb.ObjectID not using it i think this will allow us to work with object ids that are auto created in the object

let accounts
const saltRounds = process.env["saltRounds"]

export default class AccountsDAO {
    static async injectDB(conn) {
        if (accounts) {
            return
        }
        try { 
            accounts = await conn.db("MyRPG").collection("accounts")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async createAccount(email, username, password1, password2){
        try {
            if (password1 != password2) {
                throw new Error("passwords do not match")
            }

            // insures an account with this email does not exist 
            const existingEmailFilter = {email: email}
            const existingEmail = await accounts.findOne(existingEmailFilter)
            if (existingEmail) {
                throw new Error("An account with that email already exists")
            }
            // insures account with same username does not exist
            const existingUsernameFilter = {username: username}
            const existingUsername = await accounts.findOne(existingUsernameFilter)
            if (existingUsername) {
                throw new Error("An account with that username already exists")
            }

            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password1, salt);

            const accountDoc = {
                email: email,
                username: username,
                password: hashedPassword,
            }
            return await accounts.insertOne(accountDoc)
        } catch (e) {
            console.error(`unable to create account: ${e}`) //test
            return { error: e }
        }
    }
    
    static async loginAccount(emailOrUsername, password){
        try {
            let match
            let loginAccountFilter = {email: emailOrUsername}
            let account = await accounts.findOne(loginAccountFilter)
            if (!account){
                loginAccountFilter = {username: emailOrUsername}
                account = await accounts.findOne(loginAccountFilter)
                if (account) {
                    match = await bcrypt.compare(password, account.password)
                }
            } else {
                match = await bcrypt.compare(password, account.password)
            }
            if (account){
                if (match) {
                    console.log("Found the Account") // test
                    return account
                } else {
                    throw new Error("incorrect password")
                }
            } else {
                //console.log("Unable to find the Account") // test
                throw new Error("Unable to find account matching")
            }
        } catch (e) {
            console.log("Unable to find the Account") // test 
            console.error(`unable to login to account: ${e}`) //test
            return { error: e }
        }
        
    }
}
