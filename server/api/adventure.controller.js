import gameDAO from "../dao/gameDAO.js";
import mainStoryManager from "../backend_gameplay/adventure_manager.js";
import dialogManager from "../backend_gameplay/dialog/dialog_manager.js";

export default class AdventureController {
    // Must be given a data access object used for accessing the game state
    // in the user's account in the database
    constructor(gameDAO) {
        this.gameDAO = gameDAO;
    }

    async apiInitializeNewUserStories(req, res, next) {
        try {
            if (!req.sessionID) {
                console.log("Fatal there is no session id");
                res.json({ status: "failure" });
            }

            const sessionId = req.sessionID;
            const ipAddress = req.clientIp;

            const storyStates = mainStoryManager.initializeNewUserStories();

            const username = await this.gameDAO.updateUserAccount(
                sessionId,
                ipAddress,
                { $set: { storyStates } }
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
        let storyStates;

        const sessionId = req.sessionID;
        const ipAddress = req.clientIp;

        // Get user account filtered on what is in "projection"
        storyStates = await this.gameDAO.fetchFromAccount(
            sessionId,
            ipAddress,
            { projection: { storyStates: 1 } }
        );

        // Get story states from filtered user account object
        storyStates = storyStates.storyStates;

        let storyProgress = mainStoryManager.getStoriesAndProgress(storyStates);

        res.json(storyProgress);
    }

    async apiGetDialogSequence(req, res, next) {
        try {
            const { sequenceId } = req.body;

            if (!sequenceId || !req.sessionID || !req.clientIp) {
                console.log("Null in request apiGetDialogSequence");
                res.status(500).json({ status: "failure", error: e.message });
            }

            const sessionId = req.sessionID;
            const ipAddress = req.clientIp;
            // Ensure that the players account can transition into the new
            // sequenceId here by checking the state machine

            const dialogSequence = dialogManager.loadSequence(sequenceId);
            res.dialogSequence = dialogSequence;
            console.log(dialogSequence);
        } catch (e) {
            res.status(500).json({ status: "failure", error: e.message });
        }
    }
    async apiPossibleAdventures(req, res, next) {
        res.json([
            {
                title: "Begin Main Adventure",
                link: "#",
            },
            {
                title: "Begin Greg's Adventure",
                link: "#",
            },
        ]);
    }

    //new for steven showing what its getting
    async apiGetStoryText(req, res, next) {
        res.json([
            "the first thing to happen",
            "quite a wonderful second thing",
            "do we have a third yes we do",
        ]);
    }
}
