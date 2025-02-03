async function grabMenus() {
    try {

        let menuList = await fetch("http://localhost:8000/api/v1/accounts/" + "get_menus", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            
        }).then((response) => response.json())
        .then(data => {
            if (data.menus && data.status === "success") {
                const myrpg_menu = document.getElementById("myrpg_menu");

                for (let i = 0; i < data.menus.length; i++) {
                    var a = document.createElement("a");
                    if (data.menus[i].visible) {
                        a.innerHTML = data.menus[i].name;
                    } else {
                        let newName = ""
                        for (let i2 = 0; i2 < data.menus[i].name.length; i2++) {
                            newName += "?";
                        }
                        a.innerHTML = newName;
                    }
                    a.href = data.menus[i].href;
                    myrpg_menu.appendChild(a);
                }
            } else {
                console.log('nay could not find the menus to load from acocunt')
            }
        })

    } catch (e) {
        console.log(e);
    }
}

grabMenus().then(() => {
    console.log("grab menus completed")
}).catch(err => {
    console.error("Error in grabMenus", err);
})