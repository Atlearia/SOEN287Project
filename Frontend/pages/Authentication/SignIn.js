const signup=document.getElementById('signup');
const loginbutton =document.getElementById('loginbutton')
const student=document.getElementById('student');
const admin=document.getElementById('admin');
const createstudent=document.getElementById('createstudent');
const createadmin=document.getElementById('createadmin');

//since everything is on the same page, these are the functions for the radio buttons
// so that when you submit a form/click on a button, it changes the display mode so
// that you can only see certain parts. might not be the best optimal but it makes
// it so that we can create an account and login with it without refresing the page
// (without back end)

loginbutton.addEventListener('click', function(){
    if(loginbutton.checked){
        document.getElementById('signin').style.display = 'block';
        document.getElementById('createAccount').style.display = 'none';
    }
})

signup.addEventListener('click', function(){
    
    if (signup.checked){
        
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

function confirm(){ //function to confirm password
    var confpass = document.getElementById('ConfPassword'); // declares a variable entered confirmation password
    if (confpass.value != document.getElementById('password_').value){ // checks if it is the same a the original password
        confpass.setCustomValidity('Both Passwords must match.');   // if the password is incorrect it will display Both Passwords must match.
    }
    else{
        confpass.setCustomValidity(''); // if the password is correct it won't to anything
    }
}// setCustomValidity makes it so that if the ('') is not empty, the input is invalid

function confirm(){ //function to confirm password
    var confpass = document.getElementById('AdminConfPassword'); // declares a variable entered confirmation password
    if (confpass.value != document.getElementById('Adminpassword_').value){ // checks if it is the same a the original password
        confpass.setCustomValidity('Both Passwords must match.');   // if the password is incorrect it will display Both Passwords must match.
    }
    else{
        confpass.setCustomValidity(''); // if the password is correct it won't to anything
    }
}// setCustomValidity makes it so that if the ('') is not empty, the input is invalid


// when you enter the passwords in the account creation menu, it runs the confirm function
// up above to check if both are equal. 

document.getElementById('ConfPassword')
    .addEventListener('input', confirm); // on input in the confpassword input, run the confirm function.

document.getElementById('password_')
    .addEventListener('input', confirm);


document.getElementById('AdminConfPassword')
    .addEventListener('input', confirm); // on input in the confpassword input, run the confirm function.

document.getElementById('Adminpassword_')
    .addEventListener('input', confirm);




//student class
class student_login{
    
    constructor(First_Name, Last_Name, Email, password){
        this.First_Name_ = First_Name;
        this.Last_Name_ = Last_Name;
        this.Email_ = Email;
        this.password_ = password;
    }
   
}
    

//admin class
class Admin_login{
    
    constructor(First_Name, Last_Name, Email, password){
        this.First_Name_ = First_Name;
        this.Last_Name_ = Last_Name;
        this.Email_ = Email;
        this.password_ = password;
    }
    
}
//student and admin array
//theres already a student in the login array so you can directly login with it
const student_test = new student_login('Zac', 'Dem', 'Zac@gmail.com', 'password');
const adminLoginArray = ['', ''];
const studentLoginArray= [student_test];


// when creating a student account, it creates a student object with the value of every
// inputs. the new student is added to the student array and the display is changed
// so that the main student login display is seen
const form = document.getElementById("createstudentform");
form.addEventListener('submit', function(event){
    event.preventDefault();
    const firstname = document.getElementById("Adminfirstname").value;
    const lastname = document.getElementById("Adminlastname").value;
    const Email = document.getElementById("AdminEmail").value;
    const password_ = document.getElementById("Adminpassword_").value;

    const newStudent = new student_login(firstname,lastname, Email,password_);
    studentLoginArray.push(newStudent);
    
    document.getElementById('createAccount').style.display = "none";
    document.getElementById('signin').style.display = "block";


})
// same thing but for admin
const form_admin = document.getElementById("createadminform");
form_admin.addEventListener('submit',function(event){
    event.preventDefault();
    const Adminfirstname = document.getElementById("firstname").value;
    const Adminlastname = document.getElementById("lastname").value;
    const AdminEmail = document.getElementById("Email").value;
    const Adminpassword_ = document.getElementById("password_").value;

    const newAdmin = new Admin_login(Adminfirstname,Adminlastname, AdminEmail,Adminpassword_);
    adminLoginArray.push(newAdmin);
   
    document.getElementById('createAccount').style.display = "none";
    document.getElementById('signin').style.display = "block";


})

//when trying to login, it checks if the password and email exists and match. if yes, then
// it works and you can enter the website. if not, it asks you to try again

const form_student_login = document.getElementById("studentloginform");
form_student_login.addEventListener("submit",function(event){
    
    const student_email = document.getElementById("EmailAddress").value;
    const student_password = document.getElementById("password").value;
    let validity = false;
    for (let i=0;i<studentLoginArray.length;i++){
            if ((studentLoginArray[i].Email_ ==student_email) && (studentLoginArray[i].password_==student_password)){
                validity = true;
                break;
            }
        }

    if (validity == false){
        event.preventDefault();
        document.getElementById('EmailAddress').setCustomValidity('Email or password is incorrect');
        document.getElementById('EmailAddress').reportValidity();
        return;
    }
    
})

//same thing but for admin
const form_admin_login = document.getElementById("adminloginform");
form_student_login.addEventListener("submit",function(event){
    
    const admin_email = document.getElementById("EmailAddressAdmin").value;
    const admin_password = document.getElementById("passwordAdmin").value;
    let validity = false;
    for (let i=0;i<adminLoginArray.length;i++){
            if ((adminLoginArray[i].Email_ ==admin_email) && (adminLoginArray[i].password_==admin_password)){
                validity = true;
                break;
            }
        }

    if (validity == false){
        event.preventDefault();
        document.getElementById('EmailAddressAdmin').setCustomValidity('Email or password is incorrect');
        document.getElementById('EmailAddressAdmin').reportValidity();
        return;
    }
    
})