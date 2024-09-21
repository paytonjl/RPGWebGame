import mongodb from "mongodb"
import BasicDAO from "./basicDAO.js"

let mongoDatabase

// For storing information in the user's mongo database for the following:
// Player
// Inventory
// Progress in the story
export default class StoryDAO extends BasicDAO {
    // User must already be logged in
    static async fetchFromAccount(sessionId, currentIpAddress, dataToFetch)
    {
        try{
            let userAccount = await mongoDatabase.findOne({currentSessionId: sessionId});

            if(!userAccount)
            {
                console.log("Couldn't find user account associated with id " + sessionId);
                return false;
            }

            if(!userAccount.currentSessionId || !userAccount.currentSessionIpAddress)
            {
                console.log("currentSessionId or currentSessionIpAddress missing for " + sessionId);
                return false;
            }

            if( currentIpAddress != userAccount.currentSessionIpAddress ||
                sessionId != userAccount.currentSessionId) {
                console.log("Credentials don't match up");
                return false;
            }

            const response = await mongoDatabase.findOne({currentSessionId: sessionId},
                { projection: {"username": 1} },
                (err, result) => {
                    if (err) {
                        console.error("!!! Not found " + err);
                    } else {
                        console.log("username is " + response)
                    }
                });

            return response 
        } catch (e) {
            console.log(e.message)
        }
    }
}
