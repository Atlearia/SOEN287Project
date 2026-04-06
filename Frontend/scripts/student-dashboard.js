
// Query data
let currentStudentData = null; // global exportation

async function loadStudent() {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'student') {
        window.location.href = '/';
        return;
    }

    const res = await fetch(`/dashboard/student/${id}`);
    if (!res.ok) {
        alert('Profile not working!');
        return
    }

    const student = await res.json();
    currentStudentData = student; //
    
    render(student);
}


// get 2 mains document 
const coursesDashboard = document.getElementById('courses');    // courses dashboard
const assessmentDashboard = document.getElementById('assessments');     // assessments dashboard

// helper methods ===============================================================================

/**
 * Enroll student in the course
 * @param {String} courseCode
 * @param {String} studentId
 */
function enrollStudent(studentId, courseCode) {
    for (const course of courses) {
        if (course.code === courseCode) {
            if (!(studentId in course.students)) {
                course.students[studentId] = {average: 0};
                return;
            }
            // TODO: exception handle later for handling if the student exist in the course
        }
    }
}

// check if course exist or not
/**
 * Check if course exist or created
 * @param {String} code - course code that is unique 
 * @returns boolean
 */
function checkCourseExist(code) {
    if (!code) return false;    // if the course pass in empty
    for (const course of courses) {
        // check if the course enter is existed
        if (course.code.toUpperCase().replace(/\s+/g, '').trim() === code.toUpperCase().replace(/\s+/g, '').trim()) {
            return true;
        }
    }
    return false;
}

/**
 * remove student from the course
 * @param {String} studentId - Student unique id
 * @param {String} courseCode - course unique code
 */
function unenrollStudent(studentId, courseCode) {
    // cannot remove the course if the course not existed
    if (!courses) {
        alert("There is no course existed");
    }else{
        for (const course of courses) {
            if (course.code === courseCode) {
                if (studentId in course.students) {
                    delete course.students[studentId]
                }
                // TODO: Problem handling later for else
            }
        }
    }
    
}

// add course for student
/**
 * add course pop up handler
 */
function addCourse() {
    // grabs all the html tag
    const overlay   = document.getElementById('addCourseOverlay');
    const openBtn   = document.getElementById('add-course');
    const closeBtn  = document.getElementById('closeAddPopup');
    const cancelBtn = document.getElementById('cancelAddPopup');
    const form      = document.getElementById('addCourseForm');

    // opening a form function
    function openForm() { 
        // closing the canvas when clicking on the button for bootstrap for responsiveness
        const offcanvas = document.getElementById('navbarScroll');
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
        if (bsOffcanvas) bsOffcanvas.hide();

        // display the popup card
        overlay.classList.add('active'); 
    }

    // closing a form function
    function closeForm() {
        // remove active class and hide it from the main page and reset states for form
        overlay.classList.remove('active');
        form.reset();
    }

    // add event listen to each button of the form and dashboard
    openBtn.addEventListener('click', openForm);    // dashboard add course
    closeBtn.addEventListener('click', closeForm);  // form card close X button
    cancelBtn.addEventListener('click', closeForm); // form card cancel button

    // check if the user submit the form
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // prevent from reloading the page in case nothing save for the user

        const code = document.getElementById('addCourseCode').value.trim(); // grab the code from the input box and remove spaces on the side
        const studentId = sessionStorage.getItem('id');

        // check if user entered the code or leave it empty
        if (!code) {
            document.getElementById('addCourseCode').style.borderColor = 'red';
            return;
        }

        try {
            const res = await fetch('/enroll', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    studentId: studentId,
                    courseCode: code
                })
            })

            if (res.status === 404) {
                alert("Course doesn't exist!");
                closeForm();
                return;
            }

            if (res.status === 405) {
                alert("Course is disabled");
                closeForm();
                return
            }

            if (!res.ok) {
                alert("Something went wrong!")
                closeForm();
                return;
            }
            await loadStudent();
        }catch(err) {
            console.error('Enroll error', err);
        }
        closeForm();    // remove the form card
    });
    
}

/**
 * remove course pop handler
 */
function removeCourse() {
    // grabs all html tag
    const card = document.getElementById('removeCourse');
    const openBtn = document.getElementById('remove-course');
    const closeBtn = document.getElementById('closeRemovePopup');
    const cancelBtn = document.getElementById('cancelRemovePopup');
    const form = document.getElementById('removeCourseForm');

    // opening remove form card
    function openForm() {
        // handling off canvas on click should close the canvas
        const offcanvas = document.getElementById('navbarScroll');
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
        if (bsOffcanvas) bsOffcanvas.hide();
        card.classList.add('active');
    }

    // closing the form card
    function closeForm() {
        card.classList.remove('active');
        form.reset();
    }

    // add event listener to form on submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // prevent reloading page (e is an event)
        const code = document.getElementById('removeCourseCode').value.trim();
        const studentId = sessionStorage.getItem("id");
        // if code is undefined
        if (!code) {
            document.getElementById('removeCourseCode').style.borderColor = 'red';
            return;
        }

        try {
            const res = await fetch('/unenroll', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId:  studentId,
                    courseCode: code
                })
            })

            if (res.status === 404) {
                alert("Course not found");
                closeForm();
                return;
            }

            if (!res.ok) {
                alert("Something went wrong. Please try again.");
                closeForm();
                return;
            }
            await loadStudent();

        }catch (err) {
            console.error("Unenroll err: ", err);
        }
        closeForm();    // remove form from dashboard
    })

    // add event listener to all the buttons
    openBtn.addEventListener('click', openForm);    // remove course button on dashboard
    closeBtn.addEventListener('click', closeForm);  // X button for closing the form
    cancelBtn.addEventListener('click', closeForm); //  cancel button in the form
}

/**
 * remove assessment as the course removed
 * @param {String} courseCode - unique course code for remove
 */
function removeAssessment(courseCode) {
    // filter only the assessment that are not related to course that are being remove
    assessments = assessments.filter(assessment => assessment.course != courseCode);
    renderAssesments(); // re-render to show only stuffs that ain't remove
}


function exportGrades() {
    const exportBtn = document.getElementById('export-grades');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const offcanvas = document.getElementById('navbarScroll');
            if (offcanvas) {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                if (bsOffcanvas) bsOffcanvas.hide();
            }








            if (!currentStudentData) return;
            const container = document.createElement('div');
            container.style.padding = '20px';
            container.style.fontFamily = 'monospace';
            container.style.color = '#000000'; 
            container.style.backgroundColor = '#ffffff';
            
            let html = `<h2>Student Grades: ${currentStudentData.email}</h2>`;
            
            for (const course of currentStudentData.courses) {
                html += `<h3>${course.code} - ${course.title} | Average: ${course.average.toFixed(2)}%</h3>`;
                html += `<ul>`;
                if (!course.assessments || course.assessments.length === 0) {
                    html += `<li>No assessments</li>`;
                } else {
                    for (const assessment of course.assessments) {
                        const gradeVal = assessment.grade !== null ? assessment.grade + '%' : 'N/A';
                        html += `<li>${assessment.name} (Weight: ${assessment.weight}%): ${gradeVal}</li>`;
                    }
                }
                html += `</ul><hr>`;
            }
            container.innerHTML = html;
            
            //2pdf
            const opt = {
                margin:       10,
                filename:     'Student_Grades.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            html2pdf().set(opt).from(container).save();
        });
    } ///pdf stuff 👉👈 pls work
}

const GRADE_SCALE = [
    { min: 90, gp: 4.30 },
    { min: 85, gp: 4.00 },
    { min: 80, gp: 3.70 },
    { min: 77, gp: 3.30 },
    { min: 73, gp: 3.00 },
    { min: 70, gp: 2.70 },
    { min: 67, gp: 2.30 },
    { min: 63, gp: 2.00 },
    { min: 60, gp: 1.70 },
    { min: 57, gp: 1.30 },
    { min: 53, gp: 1.00 },
    { min: 50, gp: 0.70 },
    { min: 0,  gp: 0.00 }
];

function getGradePoint(average) {
    if (average == null || isNaN(average)) return 0.00;
    for (const grade of GRADE_SCALE) {
        if (average >= grade.min) return grade.gp;
    }
    return 0.00;
}

function showGpaPopup() {
    const overlay = document.getElementById('gpagrades');
    const closeBtn = document.getElementById('closeGpaPopup');
    const cancelBtn = document.getElementById('cancelGpaPopup');
    const gpaContent = document.getElementById('gpaContent');

    // Calculate GPA
    if (!currentStudentData) return;

    let sum = 0;
    let count = 0;

    for (const course of currentStudentData.courses) {
        sum += getGradePoint(course.average);
        count++;
    }

    const gpa = count > 0 ? (sum / count) : 0;
    gpaContent.innerHTML = `<p>Your GPA is: <strong>${gpa.toFixed(2)} / 4.30</strong></p>`;

    //make pop up appear
    overlay.classList.add('active');

    // Close the pop up
    function closePopup() {
        overlay.classList.remove('active');
    }

    closeBtn.addEventListener('click', closePopup);
    cancelBtn.addEventListener('click', closePopup);
}

/**
 * Just return to the main sign in page.
 * TODO: To be implemented in backend
 */
function logout() {
    const logoutBtn = document.getElementById('logout-btn');
    // add event listener to the button on click go to sign in page
    logoutBtn.addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = "../Authentication/SignIn.html";
    })
}

// rendering functions =========================================================================================================
/**
 * Render course to the dashbaord
 */
function renderCourse(student) {
    // reset each time this function call
    coursesDashboard.innerHTML = '';
    // loop through all the courses
    for (const course of student.courses) {
            const container = document.createElement('a')
            container.classList.add('course-item', 'col', 'text-center');   // bootstrap classes
            container.addEventListener('click', () => Go(course.code));
            
            // create like a template for each course card
            container.innerHTML = `
                                <h3>${course.code}</h3>
                                <p>${course.title}</p>
                                <span class="average">Average: ${course.average.toFixed(2)}</span>
                                `;
            coursesDashboard.appendChild(container);    // append it to the main dashboard
        }
    
}
function Go(a){
sessionStorage.setItem("courseCode",a);
window.location.href=`../Courses/COMP249.html`;
}
/**
 * Render assessments to the dashboard of the assessment
 */
function renderAssesments(student) {
    assessmentDashboard.innerHTML = ''; // clean up and reset the dashboard everytime call (EXPENSIVE on backend)
    
    const studentId = sessionStorage.getItem('id');//get student id
    // loop through all assessments
    const assessments = student.courses.flatMap( course => course.assessments.map( a => ( {
        ...a,
        code : course.code
    } )))

    assessments.sort((a,b)=> new Date(a.DueDateComp) - new Date(b.DueDateComp));
    
    for (let assessment of assessments) {
        console.log(assessment);
        console.log("DueDateComp:", assessment.DueDateComp);

        let container = document.createElement('tr');   // create a table row for each assessment
        let StatusClass;    // css handling
        let StatusText;     // text handling

        const grade = assessment.grades ? assessment.grades[studentId] : null;
        const dueDate = new Date(assessment.DueDateComp);
        const displayDate = dueDate.toLocaleDateString('en-US', { timeZone:'UTC',month: 'long', day: 'numeric', year: 'numeric' });
        // check the status of each assessment and update text and styling
        if (grade != null) {
            StatusText = "Complete";
            StatusClass = "complete";
        } else if (!grade && dueDate< new Date()) {
            StatusText = "Late";
            StatusClass = "late";
        } else if(!dueDate) {
            StatusText = "No Date";
            StatusClass = "pending";
        } 
        else {
            StatusText = "Pending";
            StatusClass = "pending";
        }
        container.innerHTML = `
                        <td>${assessment.code}</td>
                        <td>${assessment.name}</td>
                        <td>${displayDate}</td>
                        <td><span class="assessment-status ${StatusClass}" id="assessment-status">${StatusText}</span></td>
        `;
        assessmentDashboard.appendChild(container); // append it to the dashboard
    }
}

//dark mode
const darkModeBtn  = document.getElementById('darkModeBtn');
const darkModeIcon = document.getElementById('darkModeIcon');

// load saved preference on page load
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
}

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// settings page js
const settingBtn = document.getElementById("settings-btn");
if (settingBtn != null) {
    settingBtn.addEventListener("click", () => {
        window.location.href = "./settings.html";
    });
}


// render all on load
function render(student) {
    renderCourse(student);
    renderAssesments(student)
}

function setupUI() {
    addCourse();
    removeCourse();
    exportGrades();
    
    // buton
    const gpaBtn = document.getElementById('GPA');
    if (gpaBtn) {
        gpaBtn.addEventListener('click', showGpaPopup);
    }
}

logout();
setupUI();
loadStudent();

