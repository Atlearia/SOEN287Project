// import { courses, assessments, enrollStudent, checkCourseExist, unenrollStudent} from "./data.js";

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

function enrollStudent(studentId, courseCode) {
  for (const course of courses) {
    if (course.code === courseCode) {
      if (!(studentId in course.students)) {
        course.students[studentId] = {average: 0};
        return;
      }
    }
  }
}

function checkCourseExist(code) {
  if (!code) return false;
  for (const course of courses) {
    if (course.code.toUpperCase().replace(' ', '').trim() === code.toUpperCase().replace(' ', '').trim()) {
      return true;
    }
  }
  return false;
}

function unenrollStudent(studentId, courseCode) {
  for (const course of courses) {
    if (course.code === courseCode) {
      if (studentId in course.students) {
        delete course.students[studentId]
      }
    }
  }
}

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

