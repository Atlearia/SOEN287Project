document.getElementById('resetForm').addEventListener('submit',async(e) =>{
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const msg = document.getElementById('message');
    if (newPassword !== confirmPassword){
        msg.textContent = 'Password arent the same';
        return;
    }

    const token = new URLSearchParams(window.location.search).get('token');

    const res = await fetch('/reset-password',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token, newPassword}),
    })

    const data = await res.json();
    msg.classList.toggle('text-danger', !res.ok);
    msg.classList.toggle('text-success', res.ok);
    msg.textContent = data.error || data.message;

    if (res.ok) {
        setTimeout(() => window.location.href = 'Frontend/pages/passwordReset/reset-password.html', 2000);
      }
});