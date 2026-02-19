const signup=document.getElementById('signup');
const loginbutton =document.getElementById('loginbutton')
const student=document.getElementById('student');
const admin=document.getElementById('admin');
const createstudent=document.getElementById('createstudent');
const createadmin=document.getElementById('createadmin');

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

function confirm(){ //function to confirm password
    var confpass = document.getElementById('ConfPassword'); // declares a variable entered confirmation password
    if (confpass.value != document.getElementById('password_').value){ // checks if it is the same a the original password
        confpass.setCustomValidity('Both Passwords must match.');   // if the password is incorrect it will display Both Passwords must match.
    }
    else{
        confpass.setCustomValidity(''); // if the password is correct it won't to anything
    }
}// setCustomValidity makes it so that if the ('') is not empty, the input is invalid



document.getElementById('ConfPassword')
    .addEventListener('input', confirm); // on input in the confpassword input, run the confirm function.

document.getElementById('password_')
    .addEventListener('input', confirm);