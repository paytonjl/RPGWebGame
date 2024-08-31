let xp = 0;
let coin = 0;

let inventory = ["stick"];
let health = 100;

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
            secondary_menu.style.width = "70%";
            secondary_menu.style.marginLeft = "31%";
        } else {
            player_menu.style.display = "none";
            secondary_menu.style.width = "100%";
            secondary_menu.style.marginLeft = "1%";
        }

    });
    } else {
        console.error("one or more required elements not found")
    }

})