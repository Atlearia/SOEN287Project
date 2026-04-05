const form = document.getElementById('templateForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const templateName = document.getElementById('templateName').value;
    const notes = document.getElementById('templateNotes').value;

    const sections = form.querySelectorAll('.listrow1');
    const assessments = [];

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const nameInput = section.querySelector('.listrowtext1').textContent;        
        const weightInput = section.querySelector('input[type=\"number\"]');    

        assessments.push({
            name: nameInput.trim(),
            DueDate: "January 1, 2026",
            DueDateComp: new Date('2026-01-1'),
            weight: parseInt(weightInput.value, 10),
            
        });
    }

    //     for (let i = 0; i < sections.length; i++) {
    //     const section = sections[i];
    //     const nameInput = section.querySelector('input');        
    //     const weightInput = section.querySelectorAll('input[type=\"number\"]');    

    //     assessments.push({
    //         name: nameInput.value,
    //         weight: parseInt(weightInput.value, 10)
    //     });
    // }
    const id = sessionStorage.getItem("id");
    const templateData = {
        TemplateName: templateName,
        notes: notes,
        assessments: assessments,
        adminId: id
    };

    fetch('/add/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData)
    }).then(function(res) {
        return res.json();
    }).then(function(data) {//io
        alert('Template saved successfully!');
        form.reset();
        window.location.href = '../admin/admin-dashboard.html';
    }).catch(err => {
        console.error('Error saving template:', err);
        alert('Failed to save template.');
    });

    
});
