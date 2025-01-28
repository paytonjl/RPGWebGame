import accountsDAO from "../dao/accountsDAO.js";
import requestIp from "request-ip";

export default class AccountsController {
    // Must be given a data access object used for accessing the user accounts
    // in the database
    constructor(accountsDAO) {
        this.accountsDAO = accountsDAO;
    }

    async apiBeginningSession(req, res, next) {
        try {
            const sessionId = req.sessionID;
            const clientIpAddress = req.clientIp;
            
            if (!await this.accountsDAO.validateSessionId(sessionId, clientIpAddress)) { 
                const accountResponse = await this.accountsDAO.beginningSession(
                    clientIpAddress,
                    sessionId
                );

                if (accountResponse && accountResponse.error) {
                    throw new Error(accountResponse.error);
                } else {
                    console.log("did we get here")
                    res.json({
                        status: "success",
                        message: "1st session created successfully",
                    });
                }
            } else {
                res.json({
                    status: "failure",
                        message: "1st session has gone wrong in the controller",
                });
            }

        } catch (e) {
            console.log("Could not start session"); // test
            res.status(401).json({ status: "failure", error: e.message });
        } 
        
    }

    async apiCreateAccount(req, res, next) {
        try {
            const email = req.body.email;
            const username = req.body.username;
            const password1 = req.body.password1;
            const password2 = req.body.password2;
            const sessionId = req.sessionID;

            const accountResponse = await this.accountsDAO.createAccount(
                email,
                username,
                password1,
                password2,
                sessionId
            );
            if (accountResponse && accountResponse.error) {
                throw new Error(accountResponse.error);
            } else {
                res.json({
                    status: "success",
                    message: "Account created successfully",
                });
            }
        } catch (e) {
            res.status(500).json({ status: "failure", error: e.message });
        }
    }

    async apiLoginAccount(req, res, next) {
        try {
            if (!req.sessionID) {
                console.log("Fatal there is no session id");
                res.json({ status: "failure" });
            }

            const emailOrUsername = req.body.emailOrUsername;
            const password = req.body.password;
            const ipAddress = req.clientIp;
            const sessionId = req.sessionID;

            console.log("ip address: " + ipAddress);
            const accountResponse = await this.accountsDAO.loginAccount(
                emailOrUsername,
                password,
                ipAddress,
                sessionId
            );

            console.log(emailOrUsername); // test
            console.log(accountResponse.error); // test
            if (accountResponse && accountResponse.error) {
                throw new Error(accountResponse.error);
            } else {
                res.json({ status: "success" });
            }
        } catch (e) {
            console.log("account not found"); // test
            res.status(401).json({ status: "failure", error: e.message });
        } // could add an if statment to make sure the error has a string
    }

    async apiGetUser(req, res, next) {
        try {
            if (
                await this.accountsDAO.validateSessionId(req.sessionID, req.clientIp)
            ) {
                //We found the user account!
                res.send(true);
            } else {
                res.send(false);
            }
        } catch (e) {
            console.log("account not found"); // test
            res.status(401).json({ status: "failure", error: e.message });
        } // could add an if statment to make sure the error has a string
    }


    async apiGetUsername(req, res, next) {
        try {
            if (!req.sessionID || !await this.accountsDAO.validateSessionId(req.sessionID, req.clientIp)) {
                throw new Error("Invalid session");
            }
            
            const username = await this.accountsDAO.getUsername(req.sessionID);
            if (!username) {
                throw new Error("User not found");
            }
            
            res.json({ status: "success", username });
        } catch (e) {
            console.log("username can not be found");
            res.status(401).json({ status: "failure", error: e.message });
        }
    }

    async apiLogOut(req, res, next) {
        this.accountsDAO.updateUserAccount(req.sessionID, req.clientIp, {
            currentSessionId: null,
        });
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                res.status(500).send("Error logging out");
            } else {
                res.clearCookie("connect.sid"); // Clear the session cookie
                res.redirect("/");
            }
        });
    }
}
