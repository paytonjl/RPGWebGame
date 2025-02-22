const nav = document.querySelector('.navbar')
fetch('../views/navbar.html')
.then(res=>res.text())
.then(data=>{
    nav.innerHTML=data
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, 'text/html')
    const scriptTag = doc.querySelector('script')
    if (scriptTag) {
        eval(scriptTag.textContent)
    } else {
        console.error("Could not loadin nav bar")
    }
    //eval(doc.querySelector('script').textContent)

    // initialize buttons
    const player_menu_button = document.getElementById("player_menu_button");
    const player_menu = document.getElementById("player_menu");
    const secondary_menu = document.getElementById("secondary_menu");

    if (player_menu_button && player_menu && secondary_menu) {
    player_menu_button.addEventListener("click",function(e){
        if (window.getComputedStyle(player_menu).display === "none"){
            player_menu.style.display = "flex";
            secondary_menu.style.width = "69%";
            secondary_menu.style.marginLeft = "31%";
        } else {
            player_menu.style.display = "none";
            secondary_menu.style.width = "99%";
            secondary_menu.style.marginLeft = "1%";
        }

    });
    } else {
        console.error("one or more required elements not found")
    }

})

async function checkUser() {
    try {
        const isUserValid = await fetch("http://localhost:8000/api/v1/accounts/" + "get_user", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
            body: JSON.stringify({}),
        }).then((response) => response.text());

        if (isUserValid == "true") {
            const accountButton = document.getElementById("account_button");
            accountButton.href = "account";
            accountButton.textContent = "Account";
        } 
    } catch (e) {
        console.log(e);
    }
}

checkUser().then(() => {
    console.log("Check completed")
}).catch(err => {
    console.error("Error in checkUser", err);
})

async function beginningSession() {
    try {
        const isFirstSession = await fetch("http://localhost:8000/api/v1/accounts/" + "beginningSession", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            
        }).then((response) => response.json())
        .then(data => {
            if (data.status === "success") {
                console.log('yay beginning sessions is working on frontend')
            } else {
                console.log('nay beginnng sessions is broken on front end')
            }
        })
    } catch (e) {
        console.log(e);
    }
}

beginningSession().then(() => {
    console.log("session begone")
}).catch(err => {
    console.error("Error in beginningSession", err);
})