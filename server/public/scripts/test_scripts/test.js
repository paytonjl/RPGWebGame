const adventureApiLink = "http://localhost:8000/api/v1/adventure/";

const adventure_menu = document.getElementById("adventure_menu");

async function parseDialog() {
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

parseDialog().then((data) => console.log(data));
