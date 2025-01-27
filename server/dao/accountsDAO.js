import mongodb from "mongodb"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import BasicDAO from "./basicDAO.js"

const saltRounds = process.env["saltRounds"]

export default class AccountsDAO extends BasicDAO {
    constructor() {
        super()
    }
    
    async createAccount(email, username, password1, password2){
        try {
            if (password1 != password2) {
                throw new Error("passwords do not match")
            }

            // insures an account with this email does not exist 
            const existingEmailFilter = {email: email}
            const existingEmail = await this.mongoDatabase.findOne(existingEmailFilter)
            if (existingEmail) {
                throw new Error("An account with that email already exists")
            }
            // insures account with same username does not exist
            const existingUsernameFilter = {username: username}
            const existingUsername = await this.mongoDatabase.findOne(existingUsernameFilter)
            if (existingUsername) {
                throw new Error("An account with that username already exists")
            }

            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password1, salt);

            const accountDoc = {
                email: email,
                username: username,
                password: hashedPassword,
                currentSessionId: null,
                currentSessionIpAddress: null,
            }
            return await this.mongoDatabase.insertOne(accountDoc)
        } catch (e) {
            console.error(`unable to create account: ${e}`) //test
            return { error: e }
        }
    }

    async loginAccount(emailOrUsername, password, currentIpAddress, sessionId) {
        try {
            let match
            let loginAccountFilter = {email: emailOrUsername}
            let account = await this.mongoDatabase.findOne(loginAccountFilter)

            if (!account){
                loginAccountFilter = {username: emailOrUsername}
                account = await this.mongoDatabase.findOne(loginAccountFilter)
                if (account) {
                    match = await bcrypt.compare(password, account.password)
                }
            } else {
                match = await bcrypt.compare(password, account.password)
            }

            if (account){
                if (match) {
                    console.log("Found the Account") // test

                    if(currentIpAddress != null)
                    {
                        // Set the user's account to recognize the previously created session and IP address combo    
                        try {
                                await this.mongoDatabase.updateOne(loginAccountFilter, 
                                    { $set: { currentSessionId: sessionId } },
                                    (err, result) => {
                                        if (err) {
                                            console.error("Account Not found " + err);
                                        }
                                    });
                                await this.mongoDatabase.updateOne(loginAccountFilter, 
                                    { $set: { currentSessionIpAddress: currentIpAddress } },
                                    (err, result) => {
                                        if (err) {
                                            console.error("Account Not found " + err);
                                        }
                                    });
                        } catch (e) {
                            console.log(e.message)
                        }
                    }
                    else
                    {
                        console.log("No ip address to log");
                    }

                    return account;
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

    async getUsername(sessionID) {
        try {
            let sessionFillter = {currentSessionId: sessionID}
            let account = await this.mongoDatabase.findOne(sessionFillter)
            return account.username

        } catch (e) {
            console.log("Unable to find the Username") // test 
            console.error(`unable to find the username: ${e}`) //test
            return { error: e }
        }
    }
}