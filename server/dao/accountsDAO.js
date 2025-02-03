import mongodb from "mongodb"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import BasicDAO from "./basicDAO.js"
import accountDoc from "../data/accountDoc.js"

const saltRounds = process.env["saltRounds"]

export default class AccountsDAO extends BasicDAO {
    constructor() {
        super()
    }
    
    async createAccount(email, username, password1, password2, sessionId) {
        try {
            //!!!!!!posibly vailidate guest account before allowing the rest of this
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

            const sessionIdFilter = {currentSessionId: sessionId}

            const newAccount = await this.mongoDatabase.updateOne(sessionIdFilter, 
                {$set:{ email: email,
                    username: username,
                    password: hashedPassword,}},
                (err, result) => {
                    if (err) {
                        console.error("Account Not found " + err);
                    }
                }
            );
                return {newAccount}
            
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

    async beginningSession(sessionId, clientIpAddress) {
        try {
            const newAccountDoc = {
                ...accountDoc,
                currentSessionId: sessionId,
                currentSessionIpAddress: clientIpAddress,
            }

            const newestAccountDoc = await this.mongoDatabase.insertOne(newAccountDoc);
            return newestAccountDoc
            
        } catch (e) {
            console.error(`unable to create guest account: ${e}`) //test
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

    async getMenus(sessionID) {
        try {
            let sessionFillter = {currentSessionId: sessionID}
            let account = await this.mongoDatabase.findOne(sessionFillter)

            // looking to grab a list of object names, there visibilty boolean, and there href link with from account
            if (!account || !account.homepage) {
                return { error: 'Account not found or missing homepage'}
            }

            const menuItems = [];
            for (const [sectionName, sectionData] of Object.entries(account.homepage)) {
                menuItems.push({
                    name: sectionName,
                    visible: sectionData.visible,
                    href: sectionData.href
                });
            }

            return menuItems;

        } catch (e) {
            console.log("Unable to find the account menus") // test 
            console.error(`unable to find the menus: ${e}`) //test
            return { error: e }
        }
    }
}