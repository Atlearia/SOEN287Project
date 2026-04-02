
async function loadStudent() {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'student') {
        window.location.href = '/';
        return;
    }
    const res = await fetch(`/settings/student/${id}`);
    if (!res.ok) {
        alert('Profile not working!');
        return
    }

    const student = await res.json();
    
    return student;
}

async function load() {
    const student = await loadStudent();
    if (student) {
        document.getElementById("inputFirstName").value = student.firstName;
        document.getElementById("inputLastName").value = student.lastName;
        document.getElementById("inputEmail").value = student.email;
    }
    updateProfile(student);
    updatePassword(student);
}

function updateProfile(student) {
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
                    studentId: sessionStorage.getItem("id"),
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                })
            })

            if (res.status === 404) {
                alert("Student not found!");
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

function updatePassword(student) {
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
        passwordMatchError.style.display = "none";

        try {
            const res = await fetch("/settings/updatepassword", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId: sessionStorage.getItem("id"),
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
    window.location.href = "./student-dashboard.html";
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

load();