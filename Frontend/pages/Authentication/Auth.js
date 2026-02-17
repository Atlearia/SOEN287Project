
function confirm(){ //function to confirm password
    var confpass = document.getElementById('ConfPassword'); // declares a variable entered confirmation password
    if (confpass.value != document.getElementById('password_').value){ // checks if it is the same a the original password
        confpass.setCustomValidity('Wrong Password');   // if the password is incorrect it will display Wrong password
    }
    else{
        confpass.setCustomValidity(''); // if the password is correct it won't to anything
    }
}// setCustomValidity makes it so that if the ('') is not empty, the input is invalid



document.getElementById('ConfPassword')
    .addEventListener('input', confirm); // on input in the confpassword input, run the confirm function.

document.getElementById('password_')
    .addEventListener('input', confirm);

