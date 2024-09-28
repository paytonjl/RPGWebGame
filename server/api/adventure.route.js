import express from "express"
import AdventureCtrl from "./adventure.controller.js"

// This class handles initializing the adventure router as well as binding the
// adventure controller to it. 
export default class adventureRouterInitializer {
    constructor(adventureController) {
        this.adventureController = adventureController;
        this.adventureRouter = express.Router();

        // Bind controller methods to router routes
        this.bindRoutes();
    }

    // In order for the router to actually call the method function of 
    // this.adventureController, you need to bind the actual instance of the 
    // object to it. If you don't do that it will call the apiGetStoryProgress
    // method as if it was static and then the function wouldn't have access
    // to the gameDAO it was given. Javascript is weird.
    bindRoutes() {
        this.adventureRouter.route("/get_adventure_progress").post(this.adventureController.apiGetStoryProgress.bind(this.adventureController));
        this.adventureRouter.route("/initialize_new_user_stories").post(this.adventureController.apiInitializeNewUserStories.bind(this.adventureController));
        this.adventureRouter.route("/get_active_stories").post(this.adventureController.apiGetActiveStories.bind(this.adventureController));
        this.adventureRouter.route("/possible_adventures").get(this.adventureController.apiPossibleAdventures.bind(this.adventureController));
        this.adventureRouter.route("/get_storytext").get(this.adventureController.apiGetStoryText.bind(this.adventureController));
    }

    getAdventureRouter() {
        return this.adventureRouter;
    }
} 