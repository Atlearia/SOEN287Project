const signup=document.getElementById('signup');
const loginbutton =document.getElementById('loginbutton')
const student=document.getElementById('student');
const admin=document.getElementById('admin');
const createstudent=document.getElementById('createstudent');
const createadmin=document.getElementById('createadmin');


//since everything is on the same page, these are the functions for the radio buttons
// so that when you submit a form/click on a button, it changes the display mode so
// that you can only see certain parts. might not be the best optimal but it makes
// it so that we can create an account and login with it without refreshing the page
// (without back end)

loginbutton.addEventListener('change', function(){
    if(loginbutton.checked){

        document.getElementById('createstudentform').reset();
        document.getElementById('createadminform').reset();
        document.getElementById('signin').style.display = 'block';
        document.getElementById('createAccount').style.display = 'none';

    }
})



signup.addEventListener('change', function(){
    
    if (signup.checked){
        document.getElementById('studentloginform').reset();
        document.getElementById('adminloginform').reset();
        document.getElementById('signin').style.display = 'none';
        document.getElementById('createAccount').style.display = 'block';
    }
})


student.addEventListener("change", function(){
    if (student.checked) {
        document.getElementById('studenttext').style.display = 'block';
        document.getElementById('admintext').style.display = 'none';

    }
});

admin.addEventListener("change", function(){
    if (admin.checked) {
        document.getElementById('studenttext').style.display = 'none';
        document.getElementById('admintext').style.display = 'block';

    }
});
createstudent.addEventListener("change", function(){
    if (createstudent.checked) {
        
        document.getElementById('createstudenttext').style.display = 'block';
        document.getElementById('createadmintext').style.display = 'none';

    }
});

createadmin.addEventListener("change", function(){
    if (createadmin.checked) {
       
        document.getElementById('createstudenttext').style.display = 'none';
        document.getElementById('createadmintext').style.display = 'block';

    }
});

// password confirm for both the admin and student account creation
// i just pasted the student to make the admin
// it basically just checks if the passwords are both equal, if not, its invalid 
// and it doesnt let the form submit

function Sconfirm(){ //function to confirm password
    var confpass = document.getElementById('ConfPassword'); // declares a variable entered confirmation password
    if (confpass.value != document.getElementById('password_').value){ // checks if it is the same a the original password
        confpass.setCustomValidity('Both Passwords must match.');   // if the password is incorrect it will display Both Passwords must match.
    }
    else{
        confpass.setCustomValidity(''); // if the password is correct it won't to anything
    }
}// setCustomValidity makes it so that if the ('') is not empty, the input is invalid

function Aconfirm(){ //function to confirm password
    var confpass = document.getElementById('AdminConfPassword'); // declares a variable entered confirmation password
    if (confpass.value != document.getElementById('Adminpassword_').value){ // checks if it is the same a the original password
        confpass.setCustomValidity('Both Passwords must match.');   // if the password is incorrect it will display Both Passwords must match.
    }
    else{
        confpass.setCustomValidity(''); // if the password is correct it won't to anything
    }
}// setCustomValidity with '' just resets the validity


// when you enter the passwords in the account creation menu, it runs the confirm function
// up above to check if both are equal. 

document.getElementById('ConfPassword')
    .addEventListener('input', Sconfirm); // on input in the confpassword input, run the confirm function.

document.getElementById('password_')
    .addEventListener('input', Sconfirm);


document.getElementById('AdminConfPassword')
    .addEventListener('input', Aconfirm); // on input in the confpassword input, run the confirm function.

document.getElementById('Adminpassword_')
    .addEventListener('input', Aconfirm);




//student class
class student_login{
    
    constructor(First_Name, Last_Name, Email, password, id){
        this.First_Name_ = First_Name;
        this.Last_Name_ = Last_Name;
        this.Email_ = Email;
        this.password_ = password;
        this.id =id;
        this.coursesEnrolled = []; //array where courses the student enrolled in will be placed
    }
   
}
    

//admin class
class Admin_login{
    
    constructor(First_Name, Last_Name, Email, password, id){
        this.First_Name_ = First_Name;
        this.Last_Name_ = Last_Name;
        this.Email_ = Email;
        this.password_ = password;
        this.id =id;
    }
    
}

function generateStudentId(students) {
    if (!students || students.length === 0) return "S0001";

    // get number part of Id
    const numbers = students.map(a => parseInt(a.id.slice(1)));
    const max = Math.max(...numbers);

    // increment id then make sure the number is 4 digits
    return "S" + String(max + 1).padStart(4, "0");
}

function generateAdminId(admins) {
    if (!admins || admins.length === 0) return "A0001";

    // get number part of Id
    const numbers = admins.map(a => parseInt(a.id.slice(1)));
    const max = Math.max(...numbers);

    // increment id then make sure the number is 4 digits
    return "A" + String(max + 1).padStart(4, "0");
}

//student and admin array
//theres a default student login and default admin login for easier access when testing 
const student_default = new student_login('StudentFirstName', 'StudentLastName', 'student@gmail.com', 'student123');
const admin_default = new Admin_login('AdminFirstName', 'AdminLastName','admin@gmail.com','admin123');
//const adminLoginArray = [admin_default];
//const studentLoginArray= [student_default];


// when creating a student account, it creates a student object with the value of every
// inputs. the new student is added to the student array and the display is changed
// so that the main student login display is seen
const form = document.getElementById("createstudentform");
form.addEventListener('submit', async function(event){
    event.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const Email = document.getElementById("Email").value;
    const password_ = document.getElementById("password_").value;

    try {
        // get current admin accounts from backend
        const response = await fetch("/get/students");
        const data = await response.json();
        const students = data.students;

        // Generate new ID based on existing admin accounts
        const newId = generateStudentId(students);

        // Create new admin object
        const newStudent = new student_login(firstname, lastname, Email, password_, newId);

        // Send new account to backend
        await fetch("/add/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStudent)
        });

        console.log("Student saved:", newStudent);

        // Switch to login view
        document.getElementById('createAccount').style.display = "none";
        document.getElementById('signin').style.display = "block";
        form.reset();

    } catch (error) {
        console.error("Error saving student:", error);
    }

})
// same thing but for admin
const form_admin = document.getElementById("createadminform");
form_admin.addEventListener('submit', async function(event){
    event.preventDefault();

    const Adminfirstname = document.getElementById("Adminfirstname").value;
    const Adminlastname = document.getElementById("Adminlastname").value;
    const AdminEmail = document.getElementById("AdminEmail").value;
    const Adminpassword_ = document.getElementById("Adminpassword_").value;

    try {
        // get current admin accounts from backend
        const response = await fetch("/get/admins");
        const data = await response.json();
        const admins = data.admins;

        // Generate new ID based on existing admin accounts
        const newId = generateAdminId(admins);

        // Create new admin object
        const newAdmin = new Admin_login(Adminfirstname, Adminlastname, AdminEmail, Adminpassword_, newId);

        // Send new account to backend
        await fetch("/add/admins", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAdmin)
        });

        console.log("Admin saved:", newAdmin);

        // Switch to login view
        document.getElementById('createAccount').style.display = "none";
        document.getElementById('signin').style.display = "block";
        form_admin.reset();

    } catch (error) {
        console.error("Error saving admin:", error);
    }
});

//There was an issue where if you entered the wrong logins and then tried logging in 
// with the right ones, it didnt work. These lines of code makes it so that
// on input, it resets the custom validity so that it can be checked later in the 
// student login and admin login

document.getElementById("EmailAddress").addEventListener("input", function(){
    this.setCustomValidity("");
})
document.getElementById("password").addEventListener("input", function(){
    this.setCustomValidity("");
})

document.getElementById("EmailAddressAdmin").addEventListener("input", function(){
    this.setCustomValidity("");
})
document.getElementById("passwordAdmin").addEventListener("input", function(){
    this.setCustomValidity("");
})



//when trying to login, it checks if the password and email exists and match. if yes, then
// it works and you can enter the website. if not, it asks you to try again
const form_student_login = document.getElementById("studentloginform");
form_student_login.addEventListener("submit", async function(event){
    event.preventDefault();

    const student_email = document.getElementById("EmailAddress").value;
    const student_password = document.getElementById("password").value;

    try {
        // get student account list from backend
        const response = await fetch("/get/students");
        const data = await response.json(); // array from data.json
        const students = data.students;
        // Check if admin exists
        const validStudent = students.find(student => 
            student.Email_ === student_email && student.password_ === student_password
        );

        if (validStudent) {
            // redirect if login is correct
            //stores the id and the type of user
            const identification = validStudent.id;
            sessionStorage.setItem("id",identification);
            sessionStorage.setItem("role","student");
            window.location.href = "/pages/dashboard/student-dashboard.html";
        } else {
            // show invalid login
            document.getElementById('EmailAddress').setCustomValidity('Email or password is incorrect');
            document.getElementById('EmailAddress').reportValidity();
        }

    } catch (error) {
        console.error("Error fetching students:", error);
    }
});

//same thing but for admin
const form_admin_login = document.getElementById("adminloginform");
form_admin_login.addEventListener("submit", async function(event){
    event.preventDefault();

    const admin_email = document.getElementById("EmailAddressAdmin").value;
    const admin_password = document.getElementById("passwordAdmin").value;

    try {
        // get admin account list from backend
        const response = await fetch("/get/admins");
        const data = await response.json(); // array from data.json
        const admins = data.admins;
        // Check if admin exists
        const validAdmin = admins.find(admin => 
            admin.Email_ === admin_email && admin.password_ === admin_password
        );

        if (validAdmin) {
            // redirect if login is correct
            //stores the id and the type of user
            const identificationAdmin = validAdmin.id;
            sessionStorage.setItem("id",identificationAdmin);
            sessionStorage.setItem("role","student");
            window.location.href = "/pages/admin/admin-dashboard.html";
        } else {
            // show invalid login
            document.getElementById('EmailAddressAdmin').setCustomValidity('Email or password is incorrect');
            document.getElementById('EmailAddressAdmin').reportValidity();
        }

    } catch (error) {
        console.error("Error fetching admins:", error);
    }
});
