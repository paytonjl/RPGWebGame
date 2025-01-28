const accountDoc = {
    email: "",
    username: "Guest",
    password: "",
    currentSessionId: null,
    currentSessionIpAddress: null,
    homepage: {
        adventure: {
            visable: true,
            href: "adventure_menu",
            currentAdventures: {
                mainAdventure: {
                    progress: 0,
                },
            },
        },
        party: {
            visable: false,
            href: "#",
        },
        quest: {
            visable: false,
            href: "#",
        },
        shop: {
            visable: false,
            href: "#",
        },
    },


};

export default accountDoc;