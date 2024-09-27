
// Displays the users current progress through the main story of the adventure
// When clicked, will bring the user to the part of the adventure that they last
// left off
const apiLink = "http://localhost:8000/api/v1/adventure/";

class AdventureProgressButtonCreator {
    constructor(element) {
        this.storyStage = "Beginning";
    }

    async createProgressButton() {
        const progressButton = document.getElementsByClassName("AdventureProgressButton");
        if (progressButton.length > 0 && progressButton[0]) {
            try {
                const storyProgress = await fetch(apiLink + "get_active_stories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}),
                }).then((response) => response.json());

                console.log(storyProgress)
            } catch (e) {
                console.log(e);
            }

            this.progressButton = progressButton[0];
            //this.createAndInsertButton();
        } else {
            console.log("No account button to create");
            return;
        }
    }

    async createAndInsertButton() {
        const newButton = document.createElement("button");
        if (this.isUserLoggedIn == true) {
            newButton.textContent = "Log Out";
        } else {
            newButton.textContent = "Log In";
        }

        // Add any desired styles or attributes to the new button
        newButton.style.backgroundColor = "#007bff"; // Example color
        newButton.style.color = "white";
        newButton.style.padding = "5px 10px";
        newButton.style.borderRadius = "5px";

        //this.accountButton.innerHTML = "";
        //this.accountButton.appendChild(newButton);
        
        //newButton.addEventListener("click", this.handleClick.bind(this));
    }

    async handleClick(event) {
      // Remove the default button behavior
        event.preventDefault();

        try {
            let storyProgress = await fetch(apiLink + "get_active_stories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });
        } catch (e) {
                console.log(e);
        }


    }

}
