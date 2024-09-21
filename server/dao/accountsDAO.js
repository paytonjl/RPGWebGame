import mongodb from "mongodb"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import BasicDAO from "./basicDAO.js"

let accounts
const saltRounds = process.env["saltRounds"]

export default class AccountsDAO extends BasicDAO {
    // User must have already logged in and have a session whose sessionId matches the currentSessionId field of their mongodb account
    // currentSessionIpAddress must also match
    static async updateUserAccount(sessionId, currentIpAddress, dataToUpdate)
    {
        try{

            let userAccount = await accounts.findOne({currentSessionId: sessionId});
            if(!userAccount)
            {
                console.log("Couldn't find user account associated with id " + sessionId);
                return false;
            }

            if(!userAccount.currentSessionId || !userAccount.currentSessionIpAddress)
            {
                console.log("currentSessionId or currentSessionIpAddress missing for " + sessionId);
                return false;
            }

            if( currentIpAddress != userAccount.currentSessionIpAddress ||
                sessionId != userAccount.currentSessionId) {
                console.log("Credentials don't match up");
                return false;
            }

            const response = await accounts.updateOne({currentSessionId: sessionId }, 
                { $set: { dataToUpdate } },
                (err, result) => {
                    if (err) {
                        console.error("!!! Not found " + err);
                    } else {
                        console.log("Update success!")
                    }
                });
        } catch (e) {
            console.log(e.message)
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
                currentSessionId: null,
                currentSessionIpAddress: null,
            }
            return await accounts.insertOne(accountDoc)
        } catch (e) {
            console.error(`unable to create account: ${e}`) //test
            return { error: e }
        }
    }

    static async loginAccount(emailOrUsername, password, currentIpAddress, sessionId) {
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

                    if(currentIpAddress != null)
                    {
                        // Set the user's account to recognize the previously created session and IP address combo    
                        try {
                                await accounts.updateOne(loginAccountFilter, 
                                    { $set: { currentSessionId: sessionId } },
                                    (err, result) => {
                                        if (err) {
                                            console.error("Account Not found " + err);
                                        }
                                    });
                                await accounts.updateOne(loginAccountFilter, 
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
}