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
            const opt = document.createElement('option');
            opt.value = course.courseCode;
            opt.textContent = course.courseCode + ' - ' + course.courseTitle;
            courseSelect.appendChild(opt);
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
        const nameInput = items[i].querySelector('.manage-name');
        const weightInput = items[i].querySelector('.manage-weight');

        updatedAssessments.push({
            name: nameInput.value,
            weight: parseInt(weightInput.value, 10)
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
