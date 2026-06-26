// ================================
// REGISTER USER
// ================================

function registerUser() {

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const error = document.getElementById("registerError");

    error.innerHTML = "";

    // Empty validation

    if (name == "" || email == "" || mobile == "" || password == "" || confirmPassword == "") {

        error.innerHTML = "Please fill all fields.";

        return;
    }

    // Email validation

    if (!email.includes("@") || !email.includes(".")) {

        error.innerHTML = "Enter a valid email.";

        return;
    }

    // Mobile validation

    if (mobile.length != 10 || isNaN(mobile)) {

        error.innerHTML = "Enter a valid 10-digit mobile number.";

        return;
    }

    // Password length

    if (password.length < 6) {

        error.innerHTML = "Password must be at least 6 characters.";

        return;
    }

    // Password match

    if (password != confirmPassword) {

        error.innerHTML = "Passwords do not match.";

        return;
    }

    // Get users

    let users = localStorage.getItem("users");

    if (users == null) {

        users = [];

    }
    else {

        users = JSON.parse(users);

    }

    // Check duplicate email

    for (let i = 0; i < users.length; i++) {

        if (users[i].email == email) {

            error.innerHTML = "Email already registered.";

            return;

        }

    }

    // Create object

    const user = {

        name: name,
        email: email,
        mobile: mobile,
        password: password

    };

    // Store

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    window.location.href = "index.html";

}


// ================================
// LOGIN USER
// ================================

function loginUser() {

    const email = document.getElementById("loginEmail").value.trim();

    const password = document.getElementById("loginPassword").value;

    const error = document.getElementById("loginError");

    error.innerHTML = "";

    if (email == "" || password == "") {

        error.innerHTML = "Please enter Email and Password.";

        return;

    }

    let users = localStorage.getItem("users");

    if (users == null) {

        error.innerHTML = "No registered users found.";

        return;

    }

    users = JSON.parse(users);

    let loginSuccess = false;

    for (let i = 0; i < users.length; i++) {

        if (users[i].email == email && users[i].password == password) {

            loginSuccess = true;

            localStorage.setItem("currentUser", users[i].name);

            break;

        }

    }

    if (loginSuccess) {

        alert("Login Successful!");

        window.location.href = "home.html";

    }
    else {

        error.innerHTML = "Invalid Email or Password.";

    }

}



// ================================
// LOGOUT
// ================================

function logout() {

    localStorage.removeItem("currentUser");

    alert("Logged Out Successfully!");

    window.location.href = "index.html";

}


// ================================
// HOME PAGE INITIALIZATION
// ================================

function initHomePage() {

    const currentUser = localStorage.getItem("currentUser");

    if (currentUser == null) {

        window.location.href = "index.html";

        return;

    }

    document.getElementById("userName").innerHTML = currentUser;
    document.getElementById("currentUser").innerHTML = currentUser;

    let users = JSON.parse(localStorage.getItem("users"));

    if (users == null) {

        users = [];

    }

    document.getElementById("totalUsers").innerHTML = users.length;

    const today = new Date();

    const date =
        today.getDate() + "/" +
        (today.getMonth() + 1) + "/" +
        today.getFullYear();

    document.getElementById("todayDate").innerHTML = date;

}

window.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("userName") !== null) {
        initHomePage();
    }
});