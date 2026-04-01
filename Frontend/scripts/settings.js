const settingsBackBtn = document.getElementById('setting-backbtn');
settingsBackBtn.addEventListener('click', () => {
    window.location.href = "./student-dashboard.html";
})

const panel = document.getElementById('passwordPanel');
        const overlay      = document.getElementById('panelOverlay');
        const openBtn      = document.getElementById('openPasswordPanel');
        const closeBtn     = document.getElementById('closePanelBtn');
        const pwForm       = document.getElementById('changePasswordForm');
        const matchError   = document.getElementById('passwordMatchError');

        function openPanel() {
            panel.classList.add('open');
            overlay.classList.add('open');
        }

        function closePanel() {
            panel.classList.remove('open');
            overlay.classList.remove('open');
            pwForm.reset();
            matchError.style.display = 'none';
        }

        openBtn.addEventListener('click', openPanel);
        closeBtn.addEventListener('click', closePanel);
        overlay.addEventListener('click', closePanel);  // click outside to close

        pwForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword     = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // check passwords match before sending
            if (newPassword !== confirmPassword) {
                matchError.style.display = 'block';
                return;
            }
            matchError.style.display = 'none';

            try {
                const res = await fetch('/update/password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id:              sessionStorage.getItem('id'),
                        currentPassword,
                        newPassword
                    })
                });

                if (res.status === 401) {
                    alert('Current password is incorrect.');
                    return;
                }

                if (!res.ok) {
                    alert('Something went wrong. Please try again.');
                    return;
                }

                alert('Password updated successfully.');
                closePanel();

            } catch (err) {
                console.error('Change password error:', err);
                alert('Network error. Is the server running?');
            }
});