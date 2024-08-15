import mongodb from "mongodb"
//const ObjectID = mongodb.ObjectID not using it i think this will allow us to work with object ids that are auto created in the object

let accounts

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

            const accountDoc = {
                email: email,
                username: username,
                password: password1,
            }
            return await accounts.insertOne(accountDoc)
        } catch (e) {
            console.error(`unable to create account: ${e}`) //test
            return { error: e }
        }
    }
    
    static async loginAccount(emailOrUsername, password){
        try {
            let loginAccountFilter = {email: emailOrUsername, password: password}
            let account = await accounts.findOne(loginAccountFilter)
            if (!account){
                loginAccountFilter = {username: emailOrUsername, password: password}
                account = await accounts.findOne(loginAccountFilter)
            }
            if (account){
                console.log("Found the Account") // test
                return account
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
