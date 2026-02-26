
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
    {
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
        status: "Pending"
    },
]

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
    container.innerHTML = `
                    <td>${assessment.course}</td>
                    <td>${assessment.assessment}</td>
                    <td>${assessment.dueDate}</td>
                    <td><span class="assessment-status ${assessment.status == "Pending" ? "pending" : "complete"}" id="assessment-status">${assessment.status}</span></td>
    `;
    assessmentDashboard.appendChild(container);
}

