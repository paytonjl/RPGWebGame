const apiLink = "http://localhost:8000/api/v1/adventure/"

const text = document.getElementById("text");
const background= document.getElementById("background");

//need the backend to have the right apilink and fucntion named possible_adventures
fetch((apiLink + "get_storytext"),{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then(res => res.json())
.then(data => { 
    let i = 0;
    let allDone = false;
    text.textContent = data[i];

    function nextText(){
        if (!allDone){
            i++;
            if (i === data.length){
                allDone = true;
            }
            else {
                text.textContent = data[i];
            }
        }
    }
    
    background.addEventListener("click", nextText);
})
.catch((error) => {
    console.error('Error:', error); //test
});