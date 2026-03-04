import { courses, assessments, enrollStudent, checkCourseExist, unenrollStudent} from "./data.js";

// add dummy student
const student = {
    id: "12345",
    name: "Hero Kong",
    courses: {},
}

assessments.sort((a,b)=>a.DueDateComp - b.DueDateComp); //order the assesments based on date

const coursesDashboard = document.getElementById('courses');
const assessmentDashboard = document.getElementById('assessments');

function renderCourse() {
    coursesDashboard.innerHTML = '';
    for (const course of courses) {
        if (student.id in course.students) {
            const container = document.createElement('a')
            container.classList.add('course-item', 'col', 'text-center');
            container.setAttribute('href', (`../${course.code.replace(' ', '')}.html`))
            container.innerHTML = `
                                <h3>${course.code}</h3>
                                <p>${course.title}</p>
                                <span class="average">Average: ${course.students[student.id].average}</span>
                                `;
            coursesDashboard.appendChild(container);
        }
    }
}

function renderAssesments() {
    for (let assessment of assessments) {
        let container = document.createElement('tr');
        let StatusClass;
        let StatusText;
        if (assessment.completed) {
            StatusText = "Complete";
            StatusClass = "complete";
        } else if (!assessment.completed && assessment.DueDateComp< new Date()) {
            StatusText = "Late";
            StatusClass = "late";
        } else {
            StatusText = "Pending";
            StatusClass = "pending";
        }
        container.innerHTML = `
                        <td>${assessment.course}</td>
                        <td>${assessment.Name}</td>
                        <td>${assessment.DueDate}</td>
                        <td><span class="assessment-status ${StatusClass}" id="assessment-status">${StatusText}</span></td>
        `;
        assessmentDashboard.appendChild(container);
    }
}

function logout() {
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        window.location.href = "../Authentication/index.html";
    })
}

function addCourse() {
    const overlay   = document.getElementById('addCourseOverlay');
    const openBtn   = document.getElementById('add-course');
    const closeBtn  = document.getElementById('closeAddPopup');
    const cancelBtn = document.getElementById('cancelAddPopup');
    const form      = document.getElementById('addCourseForm');

    function openForm() { 
        const offcanvas = document.getElementById('navbarScroll');
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
        if (bsOffcanvas) bsOffcanvas.hide();
        overlay.classList.add('active'); 
    }

    function closeForm() {
        overlay.classList.remove('active');
        form.reset();
    }

    openBtn.addEventListener('click', openForm);
    closeBtn.addEventListener('click', closeForm);
    cancelBtn.addEventListener('click', closeForm);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const code = document.getElementById('addCourseCode').value.trim();

        if (!code) {
            document.getElementById('addCourseCode').style.borderColor = 'red';
            return;
        }
        if(checkCourseExist(code)) {
            enrollStudent(student.id, code);
        }else{
            alert("Course doesn't exist!");
        }
        renderCourse();
        closeForm();
    });
    
}

function removeCourse() {
    const card = document.getElementById('removeCourse');
    const openBtn = document.getElementById('remove-course');
    const closeBtn = document.getElementById('closeRemovePopup');
    const cancelBtn = document.getElementById('cancelRemovePopup');
    const form = document.getElementById('removeCourseForm');

    function openForm() {
        const offcanvas = document.getElementById('navbarScroll');
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
        if (bsOffcanvas) bsOffcanvas.hide();
        card.classList.add('active');
    }

    function closeForm() {
        card.classList.remove('active');
        form.reset();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent reloading page
        const code = document.getElementById('removeCourseCode').value.trim();
        if (!code) {
            document.getElementById('removeCourseCode').style.borderColor = 'red';
            return;
        }
        if(checkCourseExist(code)) {
            unenrollStudent(student.id, code);
        }else{
            alert("Course doesn't exist!");
        }
        renderCourse();
        closeForm();
    })

    openBtn.addEventListener('click', openForm);
    closeBtn.addEventListener('click', closeForm);
    cancelBtn.addEventListener('click', closeForm);
}


function render() {
    logout();
    renderCourse();
    renderAssesments()
    addCourse();
    removeCourse();
}

render();

