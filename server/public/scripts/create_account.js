const apiLink = "http://localhost:8000/api/v1/accounts/"

document.getElementById("create_accountForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    document.getElementById('test1').innerText = "do I work at all!"; // test

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;

    fetch((apiLink + "create_account"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password1: password1,
            password2: password2
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // Handle successful login here
            document.getElementById('test1').innerText = "Account created successful!";
        } else {
            // Handle error
            document.getElementById('test1').innerText = data.error || "An error occurred.";  // is this needed here or just need to throw a new error
        }
    })
    .catch((error) => {
        console.error('Error:', error); //test
        document.getElementById('test1').innerText = "An error occurred.";
    });
});