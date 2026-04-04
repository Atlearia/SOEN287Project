const templateDropdown = document.getElementById('templateDropdown');
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
            opt.value = template.name;
            opt.textContent = template.name;
            templateDropdown.appendChild(opt);
        }
    }).catch(function() {
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const courseCode = document.getElementById('courseCode').value;
    const courseTitle = document.getElementById('courseTitle').value;
    const term = document.getElementById('term').value;
    const templateName = templateDropdown.value;
//wed have to Render or Cloudfare? we could also github but theres no good backend 
    fetch('/add/course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            courseCode: courseCode,
            courseTitle: courseTitle,
            term: term,
            templateName: templateName
        })
    }).then(function() {
        form.reset();
        window.location.href = 'admin-dashboard.html';
    }).catch(function() {
    });
});

loadTemplates();