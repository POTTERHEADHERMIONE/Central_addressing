var isAdmin;
adminButton.style.backgroundColor = "#f5210c";
studentButton.addEventListener("click", function () {
    isAdmin = 0;
    studentButton.style.backgroundColor = "#f5210c";
    adminButton.style.backgroundColor = "#ff6f61";
});
adminButton.addEventListener("click" , function (){
isAdmin = 1;
studentButton.style.backgroundColor = "#ff6f61";
 adminButton.style.backgroundColor = "#f5210c" ;
});

document.getElementById("login-button").addEventListener("click", function () {
    event.preventDefault();
    var mailID = document.getElementById("mailID").value;
    var password = document.getElementById("password").value;
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
            console.log("Here..");
        } else {
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
