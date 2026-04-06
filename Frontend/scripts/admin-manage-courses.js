
const courseSelect = document.getElementById('selectedCourse');
const assessmentList = document.getElementById('assessmentList');
const addAssessmentButton = document.getElementById('addAssessmentButton');
const removeAssessmentButton = document.getElementById('removeAssessmentButton');
const manageCourseForm = document.getElementById('manageCourseForm');

let coursesData = [];
let currentCourse = null;

function loadCourses() {
    fetch('/get/courses').then(function(res) {
        return res.json();
    }).then(function(data) {
        coursesData = data.courses;
        
        courseSelect.innerHTML = '<option value=\"\" disabled selected>Select Course</option>';
        for (let i = 0; i < coursesData.length; i++) {
            const course = coursesData[i];
            if(String(course.AdminId) === sessionStorage.getItem('id')){
                const opt = document.createElement('option');
                opt.value = course.courseCode;
                opt.textContent = course.courseCode + ' - ' + course.courseName;
                courseSelect.appendChild(opt);
            }
        }
    });
}

courseSelect.addEventListener('change', function(e) {
    const selectedCode = e.target.value;
    currentCourse = null;
    for (let i = 0; i < coursesData.length; i++) {
        if (coursesData[i].courseCode === selectedCode) {
            currentCourse = coursesData[i];
            break;
        }
    }

    if (!currentCourse) {
        assessmentList.innerHTML = '';
        return;
    }

    renderAssessments();
});

function renderAssessments() {
    assessmentList.innerHTML = '';
    
    if (!currentCourse.assessments) {
        currentCourse.assessments = [];
    }

    for (let i = 0; i < currentCourse.assessments.length; i++) {
        const assessment = currentCourse.assessments[i];
        const YMD = assessment.DueDateComp.split('T')[0];
        const outerDiv = document.createElement('div');
        outerDiv.className = 'assessment-item';
        
        outerDiv.innerHTML = '<div class=\"assessmentrow1\">' +
            '<div class=\"assessmentnamecol1\">' +
                '<label>Assessment Name</label>' +
                '<input name=\"assessmentName[]\" type=\"text\" class=\"manage-name\" value=\"' + assessment.name + '\">' +
            '</div>' +
            '<div class=\"assessmentweightcol1\">' +
                '<label>Weight (%)</label>' +
                '<input name=\"assessmentPercent[]\" type=\"number\" min=\"0\" max=\"100\" class=\"manage-weight\" value=\"' + assessment.weight + '\">' +
            '</div>' +
            '<div class=\"assessmentDatecol1\">' +
                '<label>Due Date</label>' +
                '<input name=\"assessmentDate[]\" type=\"date\" class=\"manage-Date\" value=\"' + YMD + '\" required>' +
            '</div>' +
        '</div><br>';

        assessmentList.appendChild(outerDiv);
    }
}

addAssessmentButton.addEventListener('click', function() {
    
    const outerDiv = document.createElement('div');
    outerDiv.className = 'assessment-item';
    
    outerDiv.innerHTML = '<div class=\"assessmentrow1\">' +
        '<div class=\"assessmentnamecol1\">' +
            '<label>Assessment Name</label>' +
            '<input name=\"assessmentName[]\" type=\"text\" class=\"manage-name\" value=\"\">' +
        '</div>' +
        '<div class=\"assessmentweightcol1\">' +
            '<label>Weight (%)</label>' +
            '<input name=\"assessmentPercent[]\" type=\"number\" min=\"0\" max=\"100\" class=\"manage-weight\" value=\"0\">' +
        '</div>' +
        '<div class=\"assessmentDatecol1\">' +
            '<label>Due Date</label>' +
            '<input name=\"assessmentDate[]\" type=\"date\" class=\"manage-Date\" value=\"2026-01-01\" required>' +
        '</div>' +
    '</div><br>';

    assessmentList.appendChild(outerDiv);
});

removeAssessmentButton.addEventListener('click', function() {
    if (assessmentList.lastElementChild) {
        assessmentList.removeChild(assessmentList.lastElementChild);
    }
});

manageCourseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const items = assessmentList.getElementsByClassName('assessment-item');
    const updatedAssessments = [];

    for (let i = 0; i < items.length; i++) {
        const old = currentCourse.assessments[i];
        const nameInput = items[i].querySelector('.manage-name');
        const weightInput = items[i].querySelector('.manage-weight');
        const dateInput = items[i].querySelector('.manage-Date');

        updatedAssessments.push({
            name: nameInput.value,
            weight: parseInt(weightInput.value, 10),
            DueDateComp: new Date (dateInput.value).toISOString(),
            DueDate: new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date (dateInput.value)),
            grades: old?.grades || {}
        });
    }

    fetch('/update/course/assessments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            courseCode: currentCourse.courseCode,
            assessments: updatedAssessments
        })
    }).then(function(response) {
        currentCourse.assessments = updatedAssessments;
        alert('Assessments updated.');
        renderAssessments();
    });
});

loadCourses();
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
}