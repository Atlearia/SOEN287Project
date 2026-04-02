const id = sessionStorage.getItem('id');
const role = sessionStorage.getItem('role');

async function loadStudent() {
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
}

function updateProfile() {
    const form = document.getElementById("updateProfileForm");
    form.addEventListener("submit", async(e) => {
        e.preventDefault();

        const firstName = document.getElementById("inputFirstName").value;
        const lastName = document.getElementById("inputLastName").value;
        const email = document.getElementById("inputEmail").value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            document.getElementById("inputEmail").style.borderColor = 'red';
            alert("Please enter a valid email address.");
            return;
        }

        if (!firstName || !lastName || !email) {
            alert('All fields are required.');
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

const settingsBackBtn = document.getElementById('setting-backbtn');
settingsBackBtn.addEventListener('click', () => {
    window.location.href = "./student-dashboard.html";
})

load();