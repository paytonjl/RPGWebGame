// Holds the array of json objects (arrayOfDialog) which can be processed
// into a dialog sequence.
// For example, a json object in the sequence may have a name, text, and a
// picture resource URI. When processed this will draw a name tag, dialog text,
// and a picture portrait all in a text box.
// sequenceId is the id that corresponds to what scene the user is experiencing.
export default class DialogSequence {
    constructor(sequenceId, arrayOfDialog) {
        this.sequenceId = sequenceId;
        this.dialogArray = arrayOfDialog;
    }
}
