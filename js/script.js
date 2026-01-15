// Gunakan 'DOMContentLoaded' agar script jalan lebih cepat (tidak menunggu gambar loading)
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Welcome Speech
    let visitorName = prompt("Siapa nama Anda?", "");

    // Cek jika user klik 'Cancel' (hasilnya null) atau membiarkan kosong
    if (visitorName === null || visitorName.trim() === "") {
        visitorName = "Guest";
    }

    // Update teks nama di halaman
    document.getElementById("visitor-name").innerText = visitorName;

});

// 2. Form Validation & Show Value (Tidak ada perubahan di bagian ini)
function validateForm() {
    event.preventDefault();

    const name = document.forms["messageForm"]["name"].value;
    const dob = document.forms["messageForm"]["dob"].value;
    const gender = document.forms["messageForm"]["gender"].value;
    const message = document.forms["messageForm"]["message"].value;

    if (name == "" || dob == "" || gender == "" || message == "") {
        alert("Mohon lengkapi semua data!");
        return false;
    }

    const now = new Date();
    // Menggunakan toLocaleString agar format waktu lebih mudah dibaca orang Indonesia
    const dateTimeString = now.toLocaleString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });

    document.getElementById("current-time").innerText = dateTimeString;

    const outputDiv = document.getElementById("output-data");
    outputDiv.innerHTML = `
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Tanggal Lahir:</strong> ${dob}</p>
        <p><strong>Jenis Kelamin:</strong> ${gender}</p>
        <p><strong>Pesan:</strong> ${message}</p>
    `;

    document.forms["messageForm"].reset();

    return false;
}