function login(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const profile = JSON.parse(
        localStorage.getItem("adminProfile")
    ) || {
        email: "admin@gmail.com",
        password: "admin123"
    };

    if(
        email === profile.email &&
        password === profile.password
    ){

        localStorage.setItem("isLoggedIn","true");

        window.location.href = "index.html";

    }else{

        alert("Invalid Email or Password");

    }
}

function togglePassword(){

    const passwordInput =
    document.getElementById("password");

    const eyeIcon =
    document.getElementById("eyeIcon");

    if(passwordInput.type === "password"){

        passwordInput.type = "text";
        eyeIcon.classList.replace("fa-eye","fa-eye-slash");

    }else{

        passwordInput.type = "password";
        eyeIcon.classList.replace("fa-eye-slash","fa-eye");

    }
}