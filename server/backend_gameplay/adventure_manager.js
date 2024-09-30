const mainAdventureLevels = ["Prison"]

const StoryId = {
    MainAdventure: 0,
    GregQuest: 1,
};

// levelNames should be an array of strings
// TODO make adventure manager into a class that organizes stories with story 
// classes 
class Story {
    constructor(storyId, name, levelNames) {
        this.storyId = storyId;
        this.name = name;
        this.levelNames = levelNames;
    }
}

// Manages the player's adventure state using JSON objects
export default class AdventureManager {

    // Created for the player when creating a new main story
    static initializeNewStory(story)
    {
        const storyState = {
            "storyId": StoryId.MainAdventure,
            "name": story,
            "currentLevel": mainAdventureLevels[0],
            "party": ["ShyAnne", "BraveAnne"],
        };

        return storyState;
    }

    // Stubbed until we get some real links
    static getStoryStartLinkById(storyId) {
        if(storyId == StoryId.MainAdventure) {
            return "/mainAdventure";
        }
        else if(storyId == StoryId.GregQuest) {
            return "/gregQuest";
        }
    }

    static initializeNewUserStories()
    {
        //const mainAdventure = AdventureManager.initializeNewStory("Main Adventure");
        //const gregStory = AdventureManager.initializeNewStory("Greg's Story");

        const storyStates = {
            "mainAdventure": AdventureManager.initializeNewStory("Main Adventure"),
            "gregStory": AdventureManager.initializeNewStory("Greg's Story"),
        };

        return storyStates;
    }

    // Returns an array of stories with their titles and the link to their
    // respective start screens
    static getStoriesAndProgress(storyStates) {
        let storyProg = [];

        for(let key in storyStates) {

            if(storyStates.hasOwnProperty(key)) {
                console.log(`${key}: ${storyStates[key]}`);
                const storyName = storyStates[key].name;
                const storyLink = AdventureManager.getStoryStartLinkById(storyStates[key].storyId);
                const story = {"title" : storyName, "link" : storyLink};
                storyProg.push(story);
            }
        }

        return storyProg;
    }

    static getDialog(sequenceId) {
        let dialogSequence = [];


    }

}