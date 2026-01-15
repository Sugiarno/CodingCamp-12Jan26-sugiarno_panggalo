document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inquiry-form');
    const welcome = document.getElementById('welcome');
    const submittedValues = document.getElementById('submitted-values');

    if (form) { // Cek jika form ada (untuk halaman profile tidak error)
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            // Ambil values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validation
            if (!name || !email || !phone || !message) {
                alert('Semua field wajib diisi!');
                return;
            }
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                alert('Format email tidak valid!');
                return;
            }
            if (!/^\d+$/.test(phone)) {
                alert('Nomor telepon harus berupa angka!');
                return;
            }

            // Update welcoming speech
            welcome.textContent = `Hi ${name}, Selamat Datang di Website Gen-EFort`;

            // Show submitted values
            submittedValues.innerHTML = `
                <p>Data yang Dikirim:</p>
                <p>Nama: ${name}</p>
                <p>Email: ${email}</p>
                <p>Nomor Telepon: ${phone}</p>
                <p>Pesan: ${message}</p>
                <p>Waktu Saat Ini: ${new Date().toString()}</p>
            `;

            // Reset form
            form.reset();
        });
    }
});