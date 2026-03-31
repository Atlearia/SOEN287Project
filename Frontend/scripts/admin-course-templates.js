const form = document.getElementById('templateForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const templateName = document.getElementById('templateName').value;
    const notes = document.getElementById('notes').value;

    const sections = form.querySelectorAll('.section1');
    const assessments = [];

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const nameInput = section.querySelector('input[type=\"text\"]');        
        const weightInput = section.querySelector('input[type=\"number\"]');    

        assessments.push({
            name: nameInput.value,
            weight: parseInt(weightInput.value, 10)
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

    const templateData = {
        name: templateName,
        notes: notes,
        assessments: assessments
    };

    fetch('/add/template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData)
    }).then(function(res) {
        return res.json();
    }).then(function(data) {//io
        alert('Template saved successfully!');
        form.reset();
    });
});
