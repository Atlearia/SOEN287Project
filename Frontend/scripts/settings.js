
async function loadUser() {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || !role) {
        window.location.href = '/';
        return;
    }
    const res = await fetch(`/settings/${role}/${id}`);
    if (!res.ok) {
        alert('Profile not working!');
        return
    }

    const user = await res.json();
    
    return user;
}

async function load() {
    const user = await loadUser();
    if (user) {
        document.getElementById("inputFirstName").value = user.firstName;
        document.getElementById("inputLastName").value = user.lastName;
        document.getElementById("inputEmail").value = user.email;
    }
    updateProfile();
    updatePassword();
}

function updateProfile() {
    const form = document.getElementById("updateProfileForm");
    form.addEventListener("submit", async(e) => {
        e.preventDefault();

        const firstName = document.getElementById("inputFirstName").value;
        const lastName = document.getElementById("inputLastName").value;
        const email = document.getElementById("inputEmail").value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstName || !lastName || !email) {
            alert('All fields are required.');
            return;
        }

        if (!emailRegex.test(email)) {
            document.getElementById("inputEmail").style.borderColor = 'red';
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const res = await fetch('/settings/updateprofile', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: sessionStorage.getItem("id"),
                    role: sessionStorage.getItem("role"),
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                })
            })

            if (res.status === 404) {
                alert("User not found!");
                return;
            }

            if (!res.ok) {
                alert("Something went wrong!");
                return;
            }
            alert("Successfully updated!");
        }catch (err) {
            console.log(err);
        }
    })
}

function updatePassword() {
    const form = document.getElementById("changePasswordForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const passwordMatchError = document.getElementById("passwordMatchError");

        if (newPassword !== confirmPassword) {
            passwordMatchError.style.display = "block";
            return;
        }

        const errors = validatePassword(newPassword);
        if (errors.length > 0) {
            alert("Password must have:\n" + errors.join("\n"));
            return;
        }


        passwordMatchError.style.display = "none";

        try {
            const res = await fetch("/settings/updatepassword", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: sessionStorage.getItem("id"),
                    role: sessionStorage.getItem("role"),
                    currentPassword,
                    newPassword
                })
            })

            if (res.status === 401) {
                alert("Current password is incorrect!");
                return;
            }

            if(!res.ok) {
                alert("Something went wrong!")
                return;
            }

            form.reset();
            alert("Password updated!");

        }catch(err) {
            console.error(err);
        }
    })
}

const settingsBackBtn = document.getElementById('setting-backbtn');
settingsBackBtn.addEventListener('click', () => {
    if (sessionStorage.getItem('role') === 'student'){
        window.location.href = "./student-dashboard.html";
    }

    if (sessionStorage.getItem('role') === 'admin') {
        window.location.href = "../admin/admin-dashboard.html";
    }

})

const darkModeIcon = document.getElementById('darkModeIcon');

// load saved preference on page load
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
}
darkModeIcon.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

function validatePassword(password) {
    const errors = [];

    if (password.length < 8) {
        errors.push("At least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("At least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("At least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("At least one number");
    }
    if (!/[!@#$%^&*]/.test(password)) {
        errors.push("At least one special character (!@#$%^&*)");
    }

    return errors;
}


load();