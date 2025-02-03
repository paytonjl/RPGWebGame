const accountDoc = {
    email: "",
    username: "Guest",
    password: "",
    currentSessionId: null,
    currentSessionIpAddress: null,
    homepage: {
        adventure: {
            visible: true,
            href: "adventure_menu",
            currentAdventures: {
                mainAdventure: {
                    progress: 0,
                },
            },
        },
        party: {
            visible: false,
            href: "#",
        },
        quest: {
            visible: false,
            href: "#",
        },
        shop: {
            visible: false,
            href: "#",
        },
    },


};

export default accountDoc;