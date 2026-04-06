const simpleList = document.querySelector('.simplelist1');
const toggleSaveBtn = document.getElementById('toggle');
let coursesData = [];

async function loadCourses() {// IDK why it works 1/2, sometimes load sometimes not so pls//fix
    const response = await fetch('/get/courses');
    const data = await response.json();
        coursesData = data.courses || [];
        console.log(coursesData);
        simpleList.innerHTML = '';

        for (let i = 0; i < coursesData.length; i++) {
            const course = coursesData[i];
            if(sessionStorage.getItem('id')===course.AdminId){
                const div = document.createElement('div');
                div.className = 'listrow1';
                
                if (i === coursesData.length - 1) {
                    div.className += ' listrowlast1';
                }
                
                const span = document.createElement('span');
                span.className = 'listrowtext1';
                span.textContent = course.courseCode + ' - ' + course.courseName;
                
                const select = document.createElement('select');
                select.className = 'statusselect1';
                select.dataset.courseCode = course.courseCode;
                
                const optEnabled = document.createElement('option');
                optEnabled.value = 'enabled';
                optEnabled.textContent = 'Enabled';
                
                const optDisabled = document.createElement('option');
                optDisabled.value = 'disabled';
                optDisabled.textContent = 'Disabled';
                
                if (course.active === false) {
                    optDisabled.selected = true;
                } else {
                    optEnabled.selected = true;
                }
                
                select.appendChild(optEnabled);
                select.appendChild(optDisabled);
                
                div.appendChild(span);
                div.appendChild(select);
                simpleList.appendChild(div);
            }
        }
}

toggleSaveBtn.addEventListener('click', async function(e) {
    e.preventDefault();
    
    const selects = simpleList.querySelectorAll('.statusselect1');
    const promises = [];
    
    for (let i = 0; i < selects.length; i++) {
        const select = selects[i];
        const cCode = select.dataset.courseCode;
        const isActive = select.value === 'enabled';
        
        promises.push(fetch('/update/course/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseCode: cCode,
                active: isActive
            })
        }));
    }
    
    await Promise.all(promises);
    window.location.href = 'admin-dashboard.html';
});

loadCourses()