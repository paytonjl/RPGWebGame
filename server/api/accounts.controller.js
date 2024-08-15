import accountsDAO from "../dao/accountsDAO.js"

export default class AccountsController {

    static async apiCreateAccount(req, res, next) {
        try {
            const email = req.body.email
            const username = req.body.username
            const password1 = req.body.password1
            const password2 = req.body.password2
            console.log("we are here")//test

            const accountResponse = await accountsDAO.createAccount( 
                email,
                username,
                password1,
                password2
            )
            if(accountResponse && accountResponse.error) {
                throw new Error(accountResponse.error)
            } else {
                res.json({ status: "success", message: "Account created successfully" })
            }
            
        } catch (e) {
            res.status(500).json({ status: "failure", error: e.message })
        }
    }

    static async apiLoginAccount(req, res, next) {
        try {
            const emailOrUsername = req.body.emailOrUsername
            const password = req.body.password

            const accountResponse = await accountsDAO.loginAccount( 
                emailOrUsername,
                password
            )
            console.log(emailOrUsername) //test
            console.log(accountResponse.error)
            if(accountResponse && accountResponse.error) {
                throw new Error(accountResponse.error)
            } else {
                res.json({ status: "success" })
            }
        } catch (e) {
            console.log("account not found")
            res.status(401).json({ status: "failure", error: e.message })
        } // could add an if statment to make sure the error has a string 
    }
}