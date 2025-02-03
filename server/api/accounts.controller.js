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
                    sessionId,
                    clientIpAddress,
                );

                if (accountResponse && accountResponse.error) {
                    throw new Error(accountResponse.error);
                } else {
                    res.json({
                        status: "success",
                        message: "1st session created successfully",
                    });
                }
            } else {
                res.json({
                    status: "success",
                        message: "account session already exist",
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

            const accountResponse = await this.accountsDAO.loginAccount(
                emailOrUsername,
                password,
                ipAddress,
                sessionId
            );

            if (accountResponse && accountResponse.error) {
                throw new Error(accountResponse.error);
            } else {
                res.json({ status: "success" });
            }
        } catch (e) {
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

    async apiGetUser(req, res, next) {
        try {
            if (!req.sessionID || !await this.accountsDAO.validateSessionId(req.sessionID, req.clientIp)) {
                throw new Error("Invalid session");
            }
            
            const username = await this.accountsDAO.getUsername(req.sessionID);
            if (!username) {
                throw new Error("User not found");
            }

            if ( username === "Guest") {
                //We found the guest account!
                res.send(false);
            } else {
                //user with their own username
                res.send(true);
            }
        } catch (e) {
            console.log("account not found"); // test
            res.status(401).json({ status: "failure", error: e.message });
        } // could add an if statment to make sure the error has a string
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

    async apiGetMenus(req, res, next) {
        try {
            if (!req.sessionID || !await this.accountsDAO.validateSessionId(req.sessionID, req.clientIp)) {
                throw new Error("Invalid session");
            }
            
            const menus = await this.accountsDAO.getMenus(req.sessionID);
            if (!menus) {
                throw new Error("menus not found");
            }
            
            res.json({ status: "success", menus });
        } catch (e) {
            console.log("account menus could not be found");
            res.status(401).json({ status: "failure", error: e.message });
        }
    }
}
