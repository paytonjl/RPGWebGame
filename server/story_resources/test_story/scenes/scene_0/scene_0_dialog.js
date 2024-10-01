// Holds all dialog sequences for test_story scene_0
import DialogSequence from "../../../../backend_gameplay/dialog/dialog_sequence";

const testSceneDialog = [
    {
        name: "ShyAnne",
        text: ["hi my name is ShyAnne."],
    },
    {
        name: "BraveAnne",
        textBoxColor: "Green",
        text: [
            "Hi cool name my name is BraveAnne.",
            "This is the next text box text",
        ],
    },
];

const testDialogSequences = [
    new DialogSequence(sequenceId.testScene, testSceneDialog),
];
