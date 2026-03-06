// global dummy variables
let courses = [    
    {
        code: "SOEN 287",
        title: "Web Programming",
        students: {
            12345: {
            average: 88.24
            }
        },
        assessments: []
    },
    {
        code: "COMP 249",
        title: "Introduction to OOP II",
        students: {
            12345: {
            average: 93.33
            }
        },
        assessments: []
    },
    {
        code: "SOEN 228",
        title: "System Hardware",
        students: {
            12345: {
            average: 88.00
            }
        },
        assessments: []
    },
    {
        code: "COMP 232",
        title: "Mathematic for Computer Science",
        students: {
        },
        assessments: []
    }
]

let assessments = [
    {course: "COMP 249", Name: "Assignment 1", DueDate: "January 1st 2026", DueDateComp: new Date('2026-01-1'), weight: 10, completed: false, grade: 0},
    {course: "COMP 249", Name: "Assignment 2", DueDate: "January 11th 2026", DueDateComp: new Date('2026-01-11'), weight: 5, completed: true, grade: 100},
    {course: "COMP 249", Name: "Test 2", DueDate: "Febuary 22nd 2026", DueDateComp: new Date('2026-02-22'), weight: 20, completed: false, grade: 0},
    {course: "COMP 249", Name: "Test 1", DueDate: "Febuary 2nd 2026", DueDateComp: new Date('2026-02-2'), weight: 10, completed: true, grade: 80},
    {course: "COMP 249", Name: "Test 3", DueDate: "March 4th 2026", DueDateComp: new Date('2026-03-4'), weight: 15, completed: true, grade: 100},
    {course: "COMP 249", Name: "Final", DueDate: "June 24th 2026", DueDateComp: new Date('2026-06-24'), weight: 40, completed: false, grade: 10} ,
    {course: "SOEN 287", Name: "Assignment 1", DueDate: "January 2nd 2026", DueDateComp: new Date('2026-01-2'), weight: 13, completed: false, grade: 90},
    {course: "SOEN 287", Name: "Quiz 1", DueDate: "January 29th 2026", DueDateComp: new Date('2026-01-29'), weight: 7, completed: true, grade: 100},
    {course: "SOEN 287", Name: "Test 2", DueDate: "Febuary 13th 2026", DueDateComp: new Date('2026-02-13'), weight: 8, completed: false, grade: 7},
    {course: "SOEN 287", Name: "Test 1", DueDate: "Febuary 3rd 2026", DueDateComp: new Date('2026-02-3'), weight: 10, completed: true, grade: 80},
    {course: "SOEN 287", Name: "Test 3", DueDate: "March 3rd 2026", DueDateComp: new Date('2026-03-3'), weight: 12, completed: false, grade: 60},
    {course: "SOEN 287", Name: "Final", DueDate: "May 24th 2026", DueDateComp: new Date('2026-05-24'), weight: 30, completed: false, grade: 27} ,
    {course: "SOEN 287", Name: "Project", DueDate: "May 12th 2026", DueDateComp: new Date('2026-05-12'), weight: 20, completed: false, grade: 63}, 
    {course: "SOEN 228", Name: "Assignment 1", DueDate: "January 3rd 2026", DueDateComp: new Date('2026-01-3'), weight: 15, completed: false, grade: 40},
    {course: "SOEN 228", Name: "Quiz 1", DueDate: "January 21st 2026", DueDateComp: new Date('2026-01-21'), weight: 5, completed: true, grade: 100},
    {course: "SOEN 228", Name: "Lab 1", DueDate: "Febuary 26th 2026", DueDateComp: new Date('2026-02-26'), weight: 10, completed: true, grade: 90},
    {course: "SOEN 228", Name: "Test 1", DueDate: "Febuary 7th 2026", DueDateComp: new Date('2026-02-7'), weight: 8, completed: true, grade: 78},
    {course: "SOEN 228", Name: "Test 2", DueDate: "March 2nd 2026", DueDateComp: new Date('2026-03-2'), weight: 14, completed: false, grade: 57},
    {course: "SOEN 228", Name: "Final", DueDate: "May 2nd 2026", DueDateComp: new Date('2026-05-2'), weight: 30, completed: false, grade: 95} ,
    {course: "SOEN 228", Name: "Project", DueDate: "April 29th 2026", DueDateComp: new Date('2026-04-29'), weight: 18, completed: false, grade: 32}, 
]

assessments.sort((a,b)=>a.DueDateComp - b.DueDateComp); //order the assesments based on date

// add dummy student
const student = {
    id: "12345",
    name: "Hero Kong",
    courses: {},
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
        if (course.code.toUpperCase().replace(' ', '').trim() === code.toUpperCase().replace(' ', '').trim()) {
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
        window.location.href = "../Authentication/SignIn.html";
    })
}

// rendering functions =========================================================================================================
/**
 * Render course to the dashbaord
 */
function renderCourse() {
    // reset each time this function call
    coursesDashboard.innerHTML = '';

    // loop through all the courses
    for (const course of courses) {
        if (student.id in course.students) {
            // create a new html tag archor
            const container = document.createElement('a')
            container.classList.add('course-item', 'col', 'text-center');   // bootstrap classes
            container.setAttribute('href', (`../${course.code.replace(' ', '')}.html`)) // set href to each course page (Hardcoded initially)
            
            // create like a template for each course card
            container.innerHTML = `
                                <h3>${course.code}</h3>
                                <p>${course.title}</p>
                                <span class="average">Average: ${course.students[student.id].average}</span>
                                `;
            coursesDashboard.appendChild(container);    // append it to the main dashboard
        }
    }
}

/**
 * Render assessments to the dashboard of the assessment
 */
function renderAssesments() {
    assessmentDashboard.innerHTML = ''; // clean up and reset the dashboard everytime call (EXPENSIVE on backend)
    // loop through all assessments
    for (let assessment of assessments) {
        let container = document.createElement('tr');   // create a table row for each assessment
        let StatusClass;    // css handling
        let StatusText;     // text handling

        // check the status of each assessment and update text and styling
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
        assessmentDashboard.appendChild(container); // append it to the dashboard
    }
}

// render all on load
function render() {
    logout();
    renderCourse();
    renderAssesments()
    addCourse();
    removeCourse();
}

render();

