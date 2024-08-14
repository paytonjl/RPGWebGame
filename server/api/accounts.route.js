import express from "express"
import AccountsCtrl from "./accounts.controller.js"

const router = express.Router()

router.route("/login").post(AccountsCtrl.apiLoginAccount)
router.route("/create_account").post(AccountsCtrl.apiCreateAccount)

export default router