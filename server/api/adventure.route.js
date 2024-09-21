import express from "express"
import AdventureCtrl from "./adventure.controller.js"

const adventureRouter = express.Router()

adventureRouter.route("/get_adventure_progress").post(AdventureCtrl.apiGetStoryProgress)

adventureRouter.route("/get_adventure_progress").post(AdventureCtrl.apiGetStoryProgress)

export default adventureRouter