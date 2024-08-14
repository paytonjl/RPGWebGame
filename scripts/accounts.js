const apiLink = "http://localhost:8000/api/v1/accounts/"

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const emailOrUsername = document.getElementById("emailOrUsername").value;
    const password = document.getElementById("password").value;
    console.log(emailOrUsername+" "+password);

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
        if (data.status === "success") {
            // Handle successful login here
            document.getElementById('test').innerText = "Login successful!";
        } else {
            // Handle error
            document.getElementById('test').innerText = data.error || "An error occurred.";
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('message').innerText = "An error occurred.";
    });
});