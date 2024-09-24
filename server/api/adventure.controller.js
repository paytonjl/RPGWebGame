import GameDAO from "../dao/gameDAO.js";
import mainStoryManager from "../backend_gameplay/adventure_manager.js"

export default class AdventureController {
    // Must be given a data access object used for accessing the game state
    // in the user's account in the database
    constructor(gameDAO) {
        this.gameDAO = gameDAO;
    }

    async apiInitializeNewMainStory(req, res, next)
    {
        try {
            if (!req.sessionID) {
                console.log("Fatal there is no session id");
                res.json({ status: "failure" });
            }

            const sessionId = req.sessionID;
            const ipAddress = req.clientIp;

            let mainStoryState = await mainStoryManager.initializeNewMainStoryJson()

            const username = await this.gameDAO.updateUserAccount(
                sessionId,
                ipAddress,
                ({ $set: { mainStoryState } })
            );
            if (username && username.error) {
                throw new Error(username.error);
            } else {
                res.json({ status: "success" });
            }
        } catch (e) {
            res.status(500).json({ status: "failure", error: e.message });
        }
    }


    async apiGetStoryProgress(req, res, next) {
        try {
            if (!req.sessionID) {
                console.log("Fatal there is no session id");
                res.json({ status: "failure" });
            }

            const sessionId = req.sessionID;
            const ipAddress = req.clientIp;

            const username = await this.gameDAO.fetchFromAccount(
                sessionId,
                ipAddress,
                "mainStoryState.currentLevel"
            );
            if (username && username.error) {
                throw new Error(username.error);
            } else {
                console.log(username);
                res.json(username);
            }
        } catch (e) {
            res.status(500).json({ status: "failure", error: e.message });
        }
    }

    // Will eventually return a collection of stories along with their progress
    // Stubbed for now to give front end some data
    async apiGetActiveStories(req, res, next) {
        let stubbedStoryProgress = await mainStoryManager.initializeNewMainStoryJson();
        const stubbedReturn = {
            "MainAdventureProgress" : stubbedStoryProgress
        }

        res.json(stubbedReturn);
    }

    async apiPossibleAdventures(req, res, next){
        res.json([{
            title: "Begin Main Adventure",
            link: "#"
        },
        {
            title: "Begin Greg's Adventure",
            link: "#"
        }])
    }

}
