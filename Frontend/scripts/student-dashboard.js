import { courses, assessments } from "./data.js";    // import data from data file

const coursesDashboard = document.getElementById('courses');
const assessmentDashboard = document.getElementById('assessments');

function renderCourse() {
    for (const course of courses) {
        if (course.enabled === true) {
            const container = document.createElement('a')
            container.classList.add('course-item', 'col', 'text-center');
            container.setAttribute('href', (`../${course.code.replace(' ', '')}.html`))
            container.innerHTML = `
                                <h3>${course.code}</h3>
                                <p>${course.name}</p>
                                <span class="average">Average: ${course.students[0].average}</span>
                                `;
            coursesDashboard.appendChild(container);
        }
    }
}

function renderAssesments() {
    if (assessments.length > 0){
        for (let assessment of assessments) {
            let container = document.createElement('tr');
            container.innerHTML = `
            <td>${assessment.course}</td>
            <td>${assessment.Name}</td>
            <td>${assessment.DueDate}</td>
            <td><span class="assessment-status ${assessment.completed == false ? "pending" : "complete"}" id="assessment-status">${assessment.completed == false? "Pending" : "Completed"}</span></td>
            `;
            
            // TODO: create a link to assessment
            container.addEventListener('click', () => {
                window.location.href = `../${assessment.course.replace(' ', '')}.html`;
            })

            assessmentDashboard.appendChild(container);

        }
    }else{
        let container = document.createElement('tr');
        container.innerHTML = `
                            <td colspan="4" class="text-center">No assessments currently available!</td>
                            `;
        assessmentDashboard.appendChild(container);
    }
}

function render() {
    renderCourse();
    renderAssesments()
}

render();

