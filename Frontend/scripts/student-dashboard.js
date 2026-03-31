
// Query data
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
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent from reloading the page in case nothing save for the user

        const code = document.getElementById('addCourseCode').value.trim(); // grab the code from the input box and remove spaces on the side

        // check if user entered the code or leave it empty
        if (!code) {
            document.getElementById('addCourseCode').style.borderColor = 'red';
            return;
        }

        // check if the course exist
        if(checkCourseExist(code)) {
            enrollStudent(student.id, code);
        }else{
            alert("Course doesn't exist!");
        }

        // render dashboard again once the course is added
        renderCourse();
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
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent reloading page (e is an event)
        const code = document.getElementById('removeCourseCode').value.trim();

        // if code is undefined
        if (!code) {
            document.getElementById('removeCourseCode').style.borderColor = 'red';
            return;
        }

        // check if course is existed for remvoe
        if(checkCourseExist(code)) {
            unenrollStudent(student.id, code);
        }else{
            alert("Course doesn't exist!");
        }

        // render dashboard
        renderCourse();
        removeAssessment(code); // remove course from the assessment dashboard
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
    console.log(student.courses)
    for (const course of student.courses) {
            const container = document.createElement('a')
            container.classList.add('course-item', 'col', 'text-center');   // bootstrap classes
            //container.setAttribute('href', (`../Courses/${course.code.replace(' ', '')}.html`)) // set href to each course page (Hardcoded initially)
            
            // create like a template for each course card
            container.innerHTML = `
                                <h3>${course.code}</h3>
                                <p>${course.title}</p>
                                
                                `;
            //<span class="average">Average: ${course.students[student.id].average}</span>
            coursesDashboard.appendChild(container);    // append it to the main dashboard
        }
    
}

/**
 * Render assessments to the dashboard of the assessment
 */
function renderAssesments(student) {
    assessmentDashboard.innerHTML = ''; // clean up and reset the dashboard everytime call (EXPENSIVE on backend)
    // loop through all assessments
    const assessments = student.courses.flatMap( course => course.assessments.map( a => ( {
        ...a,
        code : course.code
    } )))
    for (let assessment of assessments) {
        let container = document.createElement('tr');   // create a table row for each assessment
        let StatusClass;    // css handling
        let StatusText;     // text handling
        const DueDateComp = new Date(assessment.dueDate);
        // check the status of each assessment and update text and styling
        if (assessment.grade) {
            StatusText = "Complete";
            StatusClass = "complete";
        } else if (!assessment.grade && DueDateComp< new Date()) {
            StatusText = "Late";
            StatusClass = "late";
        } else {
            StatusText = "Pending";
            StatusClass = "pending";
        }
        container.innerHTML = `
                        <td>${assessment.code}</td>
                        <td>${assessment.name}</td>
                        <td>${assessment.dueDate}</td>
                        <td><span class="assessment-status ${StatusClass}" id="assessment-status">${StatusText}</span></td>
        `;
        assessmentDashboard.appendChild(container); // append it to the dashboard
    }
}

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

logout();
addCourse();
removeCourse();
loadStudent();

