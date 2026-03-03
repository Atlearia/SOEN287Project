
let courses = [    
    {
        title: "SOEN 287",
        description: "Web Programming",
        average: 53.28
    },
    {
        title: "COMP 249",
        description: "Introduction to OOP II",
        average: 30.91
    },
    {
        title: "SOEN 228",
        description: "System Hardware",
        average: 74.59
    }
]

let assessments = [
    /*{
        course: "COMP 249",
        assessment: "Assignment 1",
        dueDate: "21-02-2026",
        status: "Pending"
    },
    {
        course: "SOEN 287",
        assessment: "Project",
        dueDate: "27-02-2026",
        status: "Pending"
    },
    {
        course: "SOEN 228",
        assessment: "Midterm",
        dueDate: "25-02-2026",
        status: "Pending"
    },
    {
        course: "SOEN 228",
        assessment: "Final",
        dueDate: "25-04-2026",
        status: "Complete"
    },*/
    {course: "COMP 249", Name: "Assignment 1", DueDate: "January 1st 2026", DueDateComp: new Date('2026-01-1'), weight: 10, completed: false, grade: 0},
    {course: "COMP 249", Name: "Assignment 2", DueDate: "January 11th 2026", DueDateComp: new Date('2026-01-11'), weight: 5, completed: true, grade: 100},
    {course: "COMP 249", Name: "Test 2", DueDate: "Febuary 22nd 2026", DueDateComp: new Date('2026-02-22'), weight: 20, completed: false, grade: 0},
    {course: "COMP 249", Name: "Test 1", DueDate: "Febuary 2nd 2026", DueDateComp: new Date('2026-02-2'), weight: 10, completed: true, grade: 80},
    {course: "COMP 249", Name: "Test 3", DueDate: "March 22nd 2026", DueDateComp: new Date('2026-03-22'), weight: 15, completed: false, grade: 100},
    {course: "COMP 249", Name: "Final", DueDate: "June 24th 2026", DueDateComp: new Date('2026-06-24'), weight: 40, completed: true, grade: 10} ,
    {course: "SOEN 287", Name: "Assignment 1", DueDate: "January 2nd 2026", DueDateComp: new Date('2026-01-2'), weight: 13, completed: false, grade: 90},
    {course: "SOEN 287", Name: "Quiz 1", DueDate: "January 29th 2026", DueDateComp: new Date('2026-01-29'), weight: 7, completed: true, grade: 100},
    {course: "SOEN 287", Name: "Test 2", DueDate: "Febuary 13th 2026", DueDateComp: new Date('2026-02-13'), weight: 8, completed: false, grade: 7},
    {course: "SOEN 287", Name: "Test 1", DueDate: "Febuary 3rd 2026", DueDateComp: new Date('2026-02-3'), weight: 10, completed: true, grade: 80},
    {course: "SOEN 287", Name: "Test 3", DueDate: "March 27th 2026", DueDateComp: new Date('2026-03-27'), weight: 12, completed: false, grade: 60},
    {course: "SOEN 287", Name: "Final", DueDate: "May 24th 2026", DueDateComp: new Date('2026-05-24'), weight: 30, completed: true, grade: 27} ,
    {course: "SOEN 287", Name: "Project", DueDate: "April 15th 2026", DueDateComp: new Date('2026-04-15'), weight: 20, completed: true, grade: 63}, 
    {course: "SOEN 228", Name: "Assignment 1", DueDate: "January 3rd 2026", DueDateComp: new Date('2026-01-3'), weight: 15, completed: false, grade: 40},
    {course: "SOEN 228", Name: "Quiz 1", DueDate: "January 21st 2026", DueDateComp: new Date('2026-01-21'), weight: 5, completed: true, grade: 100},
    {course: "SOEN 228", Name: "Lab 1", DueDate: "Febuary 26th 2026", DueDateComp: new Date('2026-02-26'), weight: 10, completed: false, grade: 90},
    {course: "SOEN 228", Name: "Test 1", DueDate: "Febuary 7th 2026", DueDateComp: new Date('2026-02-7'), weight: 8, completed: true, grade: 78},
    {course: "SOEN 228", Name: "Test 2", DueDate: "March 12th 2026", DueDateComp: new Date('2026-03-12'), weight: 14, completed: false, grade: 57},
    {course: "SOEN 228", Name: "Final", DueDate: "May 2nd 2026", DueDateComp: new Date('2026-05-2'), weight: 30, completed: true, grade: 95} ,
    {course: "SOEN 228", Name: "Project", DueDate: "April 25th 2026", DueDateComp: new Date('2026-04-25'), weight: 18, completed: true, grade: 32}, 
    
]
assessments.sort((a,b)=>a.DueDateComp - b.DueDateComp); //order the assesments based on date

const coursesDashboard = document.getElementById('courses');
const assessmentDashboard = document.getElementById('assessments');


for (let course of courses) {
    let container = document.createElement('a')
    container.classList.add('course-item', 'col', 'text-center');
    container.setAttribute('href', (`../${course.title}.html`).replace(' ', ''))
    container.innerHTML = `
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                        <span class="average">Average: ${course.average}</span>
                        `;
    coursesDashboard.appendChild(container);
}

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

