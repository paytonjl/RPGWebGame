
// Holds the array of json objects (arrayOfDialog) which can be processed 
// into a dialog sequence.
// For example, a json object in the sequence may have a name, text, and a 
// picture resource URI. When processed this will draw a name tag, dialog text,
// and a picture portrait all in a text box.
// sequenceId is the id that corresponds to what scene the user is experiencing.
class DialogSequence {
    constructor(sequenceId, arrayOfDialog) {
        this.sequenceId = sequenceId;
        this.dialogArray = arrayOfDialog;
    }
}

const sequenceId = {
    testScene: 0,
    testSceneChoice0: 1,
    testSceneChoice1: 2,
};

const testSceneDialog = [{
    "name": "ShyAnne",
    "text": ["hi my name is ShyAnne."]
}, {
    "name": "BraveAnne",
    "textBoxColor" : "Green",
    "text": ["Hi cool name my name is BraveAnne.", "This is the next text box text"]
}];

const testDialogSequences = [new DialogSequence(sequenceId.testScene, testSceneDialog)];

// Retrieves a scene's DialogSequences and sends it to the frontend where it
// will be rendered 
export default class DialogManager {
    static loadSequence(seqId) {
        const diagSeq = testDialogSequences.find(diag => diag.sequenceId === seqId);

        if(diagSeq) {
            return diagSeq;
        }

        console.log("No matching seq Id found");
        return false;
    }
}