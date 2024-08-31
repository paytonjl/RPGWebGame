import accountsDAO from "../dao/accountsDAO.js";
import requestIp from "request-ip";

export default class AccountsController {
    static async apiCreateAccount(req, res, next) {
        try {
            const email = req.body.email;
            const username = req.body.username;
            const password1 = req.body.password1;
            const password2 = req.body.password2;

            const accountResponse = await accountsDAO.createAccount(
                email,
                username,
                password1,
                password2
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

    static async apiLoginAccount(req, res, next) {
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
            const accountResponse = await accountsDAO.loginAccount(
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

    static async apiGetUser(req, res, next) {
        try {
            if (
                await accountsDAO.validateSessionId(req.sessionID, req.clientIp)
            ) {
                //console.log("We found the user account!");
                res.send(true);
            } else {
                res.send(false);
            }
        } catch (e) {
            console.log("account not found"); // test
            res.status(401).json({ status: "failure", error: e.message });
        } // could add an if statment to make sure the error has a string
    }

    static async apiLogOut(req, res, next) {
        accountsDAO.updateUserAccount(req.sessionID, req.clientIp, {
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
