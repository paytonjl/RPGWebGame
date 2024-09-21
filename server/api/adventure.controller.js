import storyDAO from "../dao/storyDAO.js";

export default class AdventureController {
    

    static initializeMainStory()
    {

    }


    static async initializeNewPlayerStory()
    {
        
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
                "username"
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

        console.log("Breakpoint")
    }
}
