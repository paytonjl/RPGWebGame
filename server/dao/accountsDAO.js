import mongodb from "mongodb"
const ObjectID = mongodb.ObjectID

let accounts

export default class AccountsDAO {
    static async injectDB(conn) {
        if (accounts) {
            return
        }
        try { accounts = await conn.db("accounts").collection("accounts")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async createAccount(email, username, password){
        try {
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

    static async loginAccount(email, username, password){
        try {
            return await accounts.findOne()
        } catch (e) {
            console.error(`unable to login to account: ${e}`)
            return { error: e }
        }
        
    }
}
