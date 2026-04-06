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
            if(sessionStorage.getItem('id')===template.adminId){
                const opt = document.createElement('option');
                opt.value = template.TemplateName;
                opt.textContent = template.TemplateName;
                templateDropdown.appendChild(opt);
            }
        }
    }).catch(function() {
    });
}

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const courseCode = document.getElementById('courseCode').value;
    const courseName = document.getElementById('courseName').value;
    const term = document.getElementById('term').value;
    const templateName = templateDropdown.value;
    const coursedesc = document.getElementById('desc').value;
    const credits = document.getElementById('courseCredit').value
    const Aid = sessionStorage.getItem("id");
//wed have to Render or Cloudfare? we could also github but theres no good backend 
    try{
        const res = await fetch('/get/templates');
        const data = await res.json();
        const templates = data.templates; 
        const selectedTemplate = templates.find(t => (t.TemplateName === templateName && t.adminId === sessionStorage.getItem('id'))); //find the right name but also associated with the right admin
        let Tassessments = [];
        if (selectedTemplate){
            
            Tassessments = selectedTemplate.assessments;
        } 

        const resn = await fetch('/get/admins');
        const datan = await resn.json();
        const admins = datan.admins;
        const Currentadmin = admins.find(a => a.id === sessionStorage.getItem('id'))
        if (!Currentadmin) throw new Error("Admin not found");
        const Ainstruct = Currentadmin.First_Name_ + " " + Currentadmin.Last_Name_;

        const resc = await fetch('/get/courses');
        const datac = await resc.json();
        const courses = datac.courses;
        const duplicate = courses.find(c => c.courseCode.toLowerCase() === courseCode.toLowerCase());
        if (duplicate) {
            alert("A course with this course code already exists. Please choose a different course code.");
            return; // stop process of creating the course
        }

        fetch('/add/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseCode: courseCode,
                courseName: courseName,
                instructor: Ainstruct,
                term: term,
                description: coursedesc,
                assessments: Tassessments,
                active:true,
                credit:credits,
                AdminId: Aid
            })
        }).then(res => {
            if (!res.ok) throw new Error("Failed to save");
            return res.json();
        })
        .then(() => {
            alert("Course Created.");
            form.reset();
            
        })
        .catch(err => console.error(err));
    }catch (err) {
        console.error(err);
        alert("Error creating course: " + err.message);
    }
    
});

loadTemplates();
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
}