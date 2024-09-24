const apiLink = "http://localhost:8000/api/v1/adventure/"

const adventure_menu = document.getElementById("adventure_menu");

//need the backend to have the right apilink and fucntion named possible_adventures
fetch((apiLink + "possible_adventures"),{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then(res => res.json())
.then(data => { //testing will need to create a loop to go through an array of these
    const linkElement = document.createElement('a');
    linkElement.href = data.link;// needs the backend to have the same object name link
    linkElement.textContent = data.title; // need the backend to have the same object name title

    adventure_menu.appendChild(linkElement);

})
.catch((error) => {
    console.error('Error:', error); //test
});