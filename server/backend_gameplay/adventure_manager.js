const mainAdventureLevels = ["Prison"]

// Manages the player's adventure state using JSON objects
export default class AdventureManager {

    // Created for the player when creating a new main story
    static async initializeNewMainStoryJson()
    {
        const mainStoryState = {
            "currentLevel": mainAdventureLevels[0]
        }

        return mainStoryState
    }

}