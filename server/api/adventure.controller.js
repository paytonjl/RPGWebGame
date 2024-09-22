import storyDAO from "../dao/gameDAO.js";
import mainStoryManager from "../backend_gameplay/adventure_manager.js"

export default class AdventureController {
    static async apiInitializeNewMainStory(req, res, next)
    {
        try {
            if (!req.sessionID) {
                console.log("Fatal there is no session id");
                res.json({ status: "failure" });
            }

            const sessionId = req.sessionID;
            const ipAddress = req.clientIp;

            let mainStoryState = await mainStoryManager.initializeNewMainStoryJson()

            const username = await storyDAO.updateUserAccount(
                sessionId,
                ipAddress,
                mainStoryState
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


    static async apiGetStoryProgress(req, res, next) {
        try {
            if (!req.sessionID) {
                console.log("Fatal there is no session id");
                res.json({ status: "failure" });
            }

            const sessionId = req.sessionID;
            const ipAddress = req.clientIp;

            const username = await storyDAO.fetchFromAccount(
                sessionId,
                ipAddress,
                "currentLevel"
            );
            if (username && username.error) {
                throw new Error(username.error);
            } else {
                console.log(username)
                res.json(username);
            }
        } catch (e) {
            res.status(500).json({ status: "failure", error: e.message });
        }
    }

    // Will eventually return a collection of stories along with their progress
    // Stubbed for now to give front end some data
    static async apiGetActiveStories(req, res, next) {
        let stubbedStoryProgress = await mainStoryManager.initializeNewMainStoryJson()
        const stubbedReturn = {
            "MainAdventureProgress" : stubbedStoryProgress
        }

        res.json(stubbedReturn)
    }

}
