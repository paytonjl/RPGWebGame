const apiLink = "http://localhost:8000/api/v1/accounts/";
class AccountButtonCreator {
    constructor(element) {
        this.accountButton = null;
        this.isUserLoggedIn = null;
    }

    async createAccountButton() {
        const accountButtons = document.getElementsByClassName("AccountButton");

        if (accountButtons.length > 0 && accountButtons[0]) {
            try {
                const isUserValid = await fetch(apiLink + "get_user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain",
                    },
                    body: JSON.stringify({}),
                }).then((response) => response.text());

                if (isUserValid == "true") {
                    this.isUserLoggedIn = true;
                } else {
                    this.isUserLoggedIn = false;
                }
            } catch (e) {
                console.log(e);
            }

            this.accountButton = accountButtons[0];
            this.createAndInsertButton();
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

        this.accountButton.innerHTML = "";
        this.accountButton.appendChild(newButton);
        
        newButton.addEventListener("click", this.handleClick.bind(this));
    }

    async handleClick(event) {
      // Remove the default button behavior
      event.preventDefault();

      if(this.isUserLoggedIn == true) {
        try {
          const isUserValid = await fetch(apiLink + "log_out", {
              method: "POST",
              headers: {
                  "Content-Type": "text/plain",
              },
              body: JSON.stringify({}),
          });
      } catch (e) {
          console.log(e);
      }
        window.location.href = '/';
      } else {
          window.location.href = '/login';
      }
  }
}
