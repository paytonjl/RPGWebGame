import accountsDAO from "../dao/accountsDAO.js"

export default class AccountsController {

    static async apiCreateAccount(req, res, next) {
        try {
            const email = req.body.email
            const username = req.body.username
            const password = req.body.password

            const accountResponse = await accountsDAO.createAccount( // Probs not here but this needs to have possible erros like username taken or email taken
                email,
                username,
                password
            )
            res.json({ status: "success", message: "Account created successfully" })
        } catch (e) {
            res.status(500).json({ error: e.message })
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
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}