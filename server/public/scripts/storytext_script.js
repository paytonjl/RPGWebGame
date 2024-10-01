const adventureApiLink = "http://localhost:8000/api/v1/adventure/";

const text = document.getElementById("text");
const background = document.getElementById("background");

async function fetchDialog() {
    const params = {
        sequenceId: "0",
    };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    };
    try {
        const response = await fetch(
            adventureApiLink + "get_dialog_sequence",
            options
        );
        const data = response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// TODO: Define where you can go to see the dialog sequence JSON structure
function parseText(dialogSequences) {
    let textSequences = [];
    dialogSequences.dialogArray.forEach((sequence) => {
        sequence.text.forEach((text) => {
            textSequences.push(text);
        });
    });

    return textSequences;
}

function renderText(textToRender) {
    let i = 0;
    let allDone = false;
    text.textContent = data[i];
}

fetchDialog().then((data) => {
    let textToRender = parseText(data);

    let i = 0;
    let allDone = false;
    text.textContent = textToRender[i];

    function nextText() {
        if (!allDone) {
            i++;
            if (i === textToRender.length) {
                allDone = true;
            } else {
                text.textContent = textToRender[i];
            }
        }
    }

    background.addEventListener("click", nextText);
});
