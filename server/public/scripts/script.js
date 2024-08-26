let xp = 0;
let coin = 0;

let inventory = ["stick"];
let health = 100;



// initialize buttons
const player_menu_button = document.getElementById("player_menu_button");
const player_menu = document.getElementById("player_menu");
const secondary_menu = document.getElementById("secondary_menu");

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
