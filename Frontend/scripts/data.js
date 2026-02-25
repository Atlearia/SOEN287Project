export const courses = [
    {
        name: "Web Programming",
        code: "SOEN 228",
        description: "Web Service",
        prof: "Peterson Maradona",
        students: [
            {   id: "studentID",
                avaerage: 100
            }
        ],
        term: "Winter 2026",
        assessments: [
            {id: "assignment1"}
        ],
        enabled: true
    }
]

export const assessments = [
    {
        id: "assignment1",
        course: "SOEN 228",
        Name: "Final", 
        DueDate: "June 24th 2026", 
        DueDateComp: new Date('2026-06-24'), 
        weight: 40, 
        completed: true, 
        grade: 10
    } 
]