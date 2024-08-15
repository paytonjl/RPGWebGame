const apiLink = "http://localhost:8000/api/v1/accounts/"

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const emailOrUsername = document.getElementById("emailOrUsername").value;
    const password = document.getElementById("password").value;
    //console.log(emailOrUsername+" "+password); should not be needed

    fetch((apiLink + "login"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            emailOrUsername: emailOrUsername,
            password: password
        }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('test2').innerText = data.error//test
        if (data.status === "success") {
            // Handle successful login here
            document.getElementById('test').innerText = "Login successful!";
        } else {
            // Handle error
            document.getElementById('test').innerText = data.error || "An error occurred."; // is this needed here or just need to throw a new error
        }
    })
    .catch((error) => {
        console.error('Error:', error); //test
        document.getElementById('test').innerText = "An error occurred.";
    });
});
