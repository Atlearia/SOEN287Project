const templateDropdown = document.getElementById('template');
const form = document.getElementById('createCourseForm');

function loadTemplates() {///ascyn
    fetch('/get/templates').then(function(res) {
        return res.json();
    }).then(function(data) {
        const templates = data.templates;
        templateDropdown.innerHTML = '<option value=\"\" disabled selected>Select an assessment template</option>';
        for (let i = 0; i < templates.length; i++) {
            const template = templates[i];
            const opt = document.createElement('option');
            opt.value = template.templateName;
            opt.textContent = template.templateName;
            templateDropdown.appendChild(opt);
        }
    }).catch(function() {
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const courseCode = document.getElementById('courseCode').value;
    const courseTitle = document.getElementById('courseName').value;
    const courseCredit = document.getElementById('courseCredit').value;
    const term = document.getElementById('term').value;
    const templateName = templateDropdown.value;
    const description = document.getElementById('desc').value;
    const courseInstructor = document.getElementById('courseInstructor').value;
//wed have to Render or Cloudfare? we could also github but theres no good backend 
    fetch('/add/course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            courseCode: courseCode,
            courseTitle: courseTitle,
            instructor: courseInstructor,
            credit: courseCredit,
            term: term,
            description: description,
            templateName: templateName || null
        })
    }).then(function() {
        form.reset();
        window.location.href = 'admin-dashboard.html';
    }).catch(function() {
        alert(err);
    });
});

loadTemplates();