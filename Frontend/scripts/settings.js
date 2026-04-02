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
        document.getElementById("inputFirstName").placeholder = student.firstName;
        document.getElementById("inputLastName").placeholder = student.lastName;
        document.getElementById("inputEmail").placeholder = student.email;
    }
}

const settingsBackBtn = document.getElementById('setting-backbtn');
settingsBackBtn.addEventListener('click', () => {
    window.location.href = "./student-dashboard.html";
})

load();