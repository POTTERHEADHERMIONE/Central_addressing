var isAdmin = 1;
adminButton.style.backgroundColor = "#62e9e2";
studentButton.style.backgroundColor = "#03434e";

studentButton.addEventListener("click", function () {
    isAdmin = 0;
    studentButton.style.backgroundColor = "#62e9e2";
    adminButton.style.backgroundColor = "#03434e";
});

adminButton.addEventListener("click" , function (){
    isAdmin = 1;
    studentButton.style.backgroundColor = "#03434e";
    adminButton.style.backgroundColor = "#62e9e2" ;
});

document.getElementById("login-button").addEventListener("click", function () {
    event.preventDefault();
    var mailID = document.getElementById("mailID").value;
    var password = document.getElementById("password").value;
    var statusLabel = document.getElementById("status");

    var data = {
        "mailID": mailID,
        "password": password,
        "isAdmin": isAdmin
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status !== "success") {
            statusLabel.innerText = 'Wrong password entered';
            statusLabel.style.color = 'red';
        } else {
            // Clear any previous error messages
            statusLabel.innerText = '';
            // Proceed with successful login logic
            var subs = data.subs;
            localStorage.setItem("subs", JSON.stringify(subs));

            if (isAdmin === 0) {
                // Navigate to index.html for student login
                window.location.href = "/student";
            } else {
                // Handle the admin login redirect logic here, if needed.
                window.location.href = "/admin";
            }
        }
    });
});
