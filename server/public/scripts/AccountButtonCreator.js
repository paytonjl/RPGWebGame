import { apiLink } from "./constants.js";
class AccountButtonCreator {
    constructor(element) {
        this.accountButton = null;
    }

    createAccountButton() {
        const accountButtons = document.getElementsByClassName("AccountButton");

        if (accountButtons.length > 0 && accountButtons[0]) {
            fetch(apiLink + "login", {
                method: "POST",
                //mode: "cors",
                //credentials: 'include', // this causes error
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emailOrUsername: emailOrUsername,
                    password: password,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    document.getElementById("test2").innerText = data.error; //test
                    if (data.status === "success") {
                        // Handle successful login here
                        document.getElementById("test").innerText =
                            "Login successful!";
                        window.location.href = "/";
                    } else {
                        // Handle error
                        document.getElementById("test").innerText =
                            data.error || "An error occurred."; // is this needed here or just need to throw a new error
                    }
                })
                .catch((error) => {
                    console.error("Error:", error); //test
                    document.getElementById("test").innerText =
                        "An error occurred.";
                });

            this.accountButton = accountButtons[0];
            this.createAndInsertButton();
        } else {
            console.log("No account button to create");
            return;
        }
    }

    createAndInsertButton() {
        const newButton = document.createElement("button");
        newButton.textContent = "Account";

        // Add any desired styles or attributes to the new button
        newButton.style.backgroundColor = "#007bff"; // Example color
        newButton.style.color = "white";
        newButton.style.padding = "5px 10px";
        newButton.style.borderRadius = "5px";

        this.accountButton.innerHTML = "";
        this.accountButton.appendChild(newButton);
    }
}
