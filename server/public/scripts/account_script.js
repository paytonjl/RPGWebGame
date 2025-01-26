async function getUserName() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/accounts/" + "get_username", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            let errorMessage;
            if (response.status >= 400 && response.status < 500) {
                errorMessage = "Bad request";
            } else {
                errorMessage = `HTTP error! status: ${response.status}`;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log(data.username);
        return data.username;

    } catch (e) {
        console.log(e);
    }
}

getUserName().then(() => {
    console.log("getusername completed")
}).catch(err => {
    console.error("Error in getUserName", err);
})