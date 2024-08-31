import express from "express"
import AccountsCtrl from "./accounts.controller.js"

const router = express.Router()

router.route("/login").post(AccountsCtrl.apiLoginAccount)
router.route("/create_account").post(AccountsCtrl.apiCreateAccount)
router.route("/get_user").post(AccountsCtrl.apiGetUser)
router.route("/log_out").post(AccountsCtrl.apiLogOut)

export default router