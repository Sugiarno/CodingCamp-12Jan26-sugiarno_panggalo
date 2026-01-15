// 1. Welcome Speech: Meminta nama user saat website dimuat
// Instruksi: "Hi Name is use JavaScript for fill the Name"
window.onload = function() {
    let visitorName = prompt("Siapa nama Anda?", "Guest");
    
    // Validasi sederhana jika user tidak mengisi nama
    if (visitorName === null || visitorName === "") {
        visitorName = "Guest";
    }

    // Mengganti teks di HTML dengan ID 'visitor-name'
    document.getElementById("visitor-name").innerText = visitorName;
};

// 2. Form Validation & Show Value
function validateForm() {
    // Mencegah form submit secara default (refresh halaman)
    event.preventDefault();

    // Mengambil nilai dari form
    const name = document.forms["messageForm"]["name"].value;
    const dob = document.forms["messageForm"]["dob"].value;
    const gender = document.forms["messageForm"]["gender"].value;
    const message = document.forms["messageForm"]["message"].value;

    // Validasi sederhana: Cek apakah ada yang kosong
    if (name == "" || dob == "" || gender == "" || message == "") {
        alert("Mohon lengkapi semua data!");
        return false;
    }

    // Mengambil waktu saat ini
    const now = new Date();
    const dateTimeString = now.toUTCString(); // Format: Mon, 12 Jan 2026 ...

    // Menampilkan waktu di result box
    document.getElementById("current-time").innerText = dateTimeString;

    // Menampilkan data yang di-input ke dalam HTML (Result Box)
    const outputDiv = document.getElementById("output-data");
    outputDiv.innerHTML = `
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Tanggal Lahir:</strong> ${dob}</p>
        <p><strong>Jenis Kelamin:</strong> ${gender}</p>
        <p><strong>Pesan:</strong> ${message}</p>
    `;

    // Opsional: Reset form setelah submit
    document.forms["messageForm"].reset();

    return false; // Mengembalikan false agar halaman tidak reload
}