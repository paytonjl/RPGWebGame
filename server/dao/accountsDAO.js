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

    static async createAccount(email, username, password){
        try {
            const existingEmailFilter = {email: email}
            const existingEmail = await accounts.findOne(existingEmailFilter)
            if (existingEmail) {
                throw new Error("An account with that email already exists")
            }
            const existingUsernameFilter = {username: username}
            const existingUsername = await accounts.findOne(existingUsernameFilter)
            if (existingUsername) {
                throw new Error("An account with that username already exists")
            }

            const accountDoc = {
                email: email,
                username: username,
                password: password,
            }
            return await accounts.insertOne(accountDoc)
        } catch (e) {
            console.error(`unable to create account: ${e}`)
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
                return {error: "Unable to find account matching" }
            }
        } catch (e) {
            console.error(`unable to login to account: ${e}`)
            return { error: e }
        }
        
    }
}
