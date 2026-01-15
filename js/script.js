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
// --- LOGIKA PORTFOLIO CAROUSEL ---

// 1. Data Portfolio (Sesuaikan path gambar dengan folder Anda)
// --- UPDATE script.js ---

const portfolioData = [
    // 1. Automation
    {
        img: "images/portfolio/Workflow N8N.png",
        filename: "Workflow N8N",
        title: "AI Automation Expert",
        brief: "Otomatisasi sistem workflow menggunakan N8N.",
        detail: "Membangun sistem integrasi otomatis untuk mengurangi beban kerja manual hingga 40%."
    },
    // 2. Dashboard (Perhatikan typo 'Managament' sesuai nama file asli Anda)
    {
        img: "images/portfolio/Dashboard Money Managament.png", 
        filename: "Dashboard Keuangan",
        title: "Financial Dashboard",
        brief: "Visualisasi data keuangan real-time dengan Excel.",
        detail: "Dashboard interaktif untuk memantau arus kas dan membantu pengambilan keputusan finansial."
    },
    // 3. AI Speaker (PASTIKAN ANDA SUDAH RENAME FILE INI JADI 'ai-speaker.png')
    {
        img: "images/portfolio/Pembawa materi tentang AI di SLH Biak.jpg", 
        filename: "AI Speaker",
        title: "AI Educator",
        brief: "Pembicara workshop implementasi AI di SLH Biak.",
        detail: "Memperkenalkan potensi Artificial Intelligence kepada rekan guru untuk efisiensi pengajaran."
    },
    // 4. Ketua Panitia
    {
        img: "images/portfolio/Ketua Panitia First Gathering 2022.png",
        filename: "Ketua Panitia 2022",
        title: "Event Leadership",
        brief: "Ketua Panitia First Gathering 2022.",
        detail: "Memimpin 50+ panitia dan mengelola acara dengan 200+ peserta sukses besar."
    },
    // 5. Dokumentasi FG 2022
    {
        img: "images/portfolio/Documentation FG 2022.png",
        filename: "Dokumentasi FG",
        title: "Event Documentation",
        brief: "Dokumentasi acara First Gathering 2022.",
        detail: "Mengabadikan momen-momen penting selama acara berlangsung sebagai arsip organisasi."
    },
    // 6. FG 2022 (Foto Grup)
    {
        img: "images/portfolio/FG 2022.png",
        filename: "Foto Grup FG 2022",
        title: "Community Building",
        brief: "Momen kebersamaan seluruh peserta First Gathering.",
        detail: "Membangun relasi dan keakraban antar mahasiswa baru dan lama."
    },
    // 7. Peduli Kasih
    {
        img: "images/portfolio/Peduli Kasih ke Panti Disabilitas.jpg",
        filename: "Peduli Kasih",
        title: "Social Activity",
        brief: "Kunjungan kasih ke Panti Disabilitas.",
        detail: "Berbagi sukacita dan bantuan kepada teman-teman di panti disabilitas."
    },
    // 8. PPL TB Sunter
    {
        img: "images/portfolio/PPL TB Sunter.JPG",
        filename: "PPL TB Sunter",
        title: "Teaching Practice",
        brief: "Pengalaman Praktik Pengalaman Lapangan (PPL).",
        detail: "Mengimplementasikan ilmu pedagogi secara langsung di sekolah TB Sunter."
    },
    // --- SERI VOLUNTEER (1-3) ---
    {
        img: "images/portfolio/Volunteer (mengajar SMP 1).jpg",
        filename: "Volunteer 1",
        title: "Volunteer Teaching",
        brief: "Mengajar Matematika untuk siswa SMP.",
        detail: "Kegiatan sukarelawan mengajar di daerah desa untuk meningkatkan kualitas pendidikan."
    },
    {
        img: "images/portfolio/Volunteer (mengajar SMP 2).jpg",
        filename: "Volunteer 2",
        title: "Classroom Interaction",
        brief: "Interaksi aktif dengan siswa di dalam kelas.",
        detail: "Membangun suasana kelas yang menyenangkan agar siswa lebih mudah paham."
    },
    {
        img: "images/portfolio/Volunteer (mengajar SMP 3).jpg",
        filename: "Volunteer 3",
        title: "Mentoring Session",
        brief: "Pendampingan personal kepada siswa.",
        detail: "Memberikan perhatian khusus kepada siswa yang membutuhkan bimbingan tambahan."
    },
    // --- SERI DDM ALT 2023 (1-5) ---
    {
        img: "images/portfolio/DDM ALT 2023 (1).JPG",
        filename: "DDM ALT 1",
        title: "Design & Documentation",
        brief: "Tim Dokumentasi acara ALT 2023.",
        detail: "Bertanggung jawab atas seluruh output visual dan dokumentasi kegiatan."
    },
    {
        img: "images/portfolio/DDM ALT 2023 (2).JPG",
        filename: "DDM ALT 2",
        title: "Videography",
        brief: "Pengambilan video kegiatan outdoor.",
        detail: "Menangkap momen dinamis selama kegiatan luar ruangan berlangsung."
    },
    {
        img: "images/portfolio/DDM ALT 2023 (3).JPG",
        filename: "DDM ALT 3",
        title: "Team Coordination",
        brief: "Koordinasi tim DDM di lapangan.",
        detail: "Memastikan setiap pos acara terdokumentasikan dengan baik oleh tim."
    },
    {
        img: "images/portfolio/DDM ALT 2023 (4).JPG",
        filename: "DDM ALT 4",
        title: "Editing Process",
        brief: "Proses editing konten harian.",
        detail: "Mengedit foto dan video untuk publikasi same-day edit saat acara."
    },
    {
        img: "images/portfolio/DDM ALT 2023 (5).JPG",
        filename: "DDM ALT 5",
        title: "Final Output",
        brief: "Hasil dokumentasi akhir kegiatan.",
        detail: "Kompilasi dokumentasi untuk laporan pertanggungjawaban divisi."
    }
];

// 2. Inisialisasi Carousel
const track = document.getElementById('gallery-track');
const storyTitle = document.getElementById('story-title');
const storyBrief = document.getElementById('story-brief');
const detailModal = document.getElementById('detail-modal');
const detailTitle = document.getElementById('detail-title');
const detailText = document.getElementById('detail-text');

// Render Gambar ke HTML
portfolioData.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('gallery-item');
    div.setAttribute('data-filename', item.filename); // Untuk Hover CSS
    div.setAttribute('data-index', index); // Untuk identifikasi saat klik
    
    // Event Klik untuk Detail
    div.onclick = () => showDetail(index);

    div.innerHTML = `<img src="${item.img}" alt="${item.title}">`;
    track.appendChild(div);
});

// 3. Logic Deteksi Tengah & Auto Scroll
let isPaused = false;

// Fungsi Update Teks berdasarkan gambar yang di tengah
function updateActiveImage() {
    const items = document.querySelectorAll('.gallery-item');
    const centerPoint = track.offsetWidth / 2 + track.scrollLeft;

    items.forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(centerPoint - itemCenter);

        // Jika gambar berada di area tengah (jarak < 100px dari tengah)
        if (distance < 150) {
            // Hapus active dari semua, tambahkan ke yang ini
            document.querySelectorAll('.gallery-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update Teks Atas
            storyTitle.innerText = portfolioData[index].title;
            storyBrief.innerText = portfolioData[index].brief;
        }
    });
}

// Event Listener saat Scroll Manual
track.addEventListener('scroll', updateActiveImage);

// Auto Scroll Logic
function autoScroll() {
    if (!isPaused) {
        track.scrollLeft += 2; // Kecepatan scroll (makin besar makin cepat)
        
        // Jika sudah mentok kanan, balik ke awal (looping sederhana)
        if (track.scrollLeft >= (track.scrollWidth - track.offsetWidth)) {
            track.scrollLeft = 0;
        }
    }
}

// Jalankan auto scroll setiap 20ms
const scrollInterval = setInterval(autoScroll, 20);

// Pause saat mouse ada di atas gallery agar user bisa baca/klik
track.addEventListener('mouseenter', () => isPaused = true);
track.addEventListener('mouseleave', () => isPaused = false);


// 4. Modal Functions (Detail Story)
function showDetail(index) {
    isPaused = true; // Stop scroll saat baca detail
    const data = portfolioData[index];
    detailTitle.innerText = data.title;
    detailText.innerText = data.detail; // Tampilkan cerita lengkap
    detailModal.classList.remove('hidden');
}

function closeModal() {
    detailModal.classList.add('hidden');
    isPaused = false; // Lanjut scroll
}

// Tutup modal jika klik di luar kotak putih
window.onclick = function(event) {
    if (event.target == detailModal) {
        closeModal();
    }
}