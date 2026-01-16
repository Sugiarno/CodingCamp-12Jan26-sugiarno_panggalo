/* FILE: js/script.js
   FUNGSI: Mengatur logika interaksi (Navbar, Carousel Infinite, Form).
   DEPENDENCY: Membutuhkan js/data.js untuk berjalan.
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 1. WELCOME SPEECH
    // =========================================
    let visitorName = prompt("Siapa nama Anda?", "");
    if (visitorName === null || visitorName.trim() === "") {
        visitorName = "Guest";
    }
    const visitorEl = document.getElementById("visitor-name");
    if(visitorEl) visitorEl.innerText = visitorName;

    // =========================================
    // 2. LOGIKA BURGER MENU
    // =========================================
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        if (burger) {
            burger.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
                navLinks.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = '';
                    } else {
                        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    }
                });
                burger.classList.toggle('toggle');
            });
        }
    }
    navSlide();
    

// 3. CAROUSEL MY JOURNEY (PORTFOLIO BAWAH)
    if (typeof portfolioData !== 'undefined') {
        const track = document.getElementById('gallery-track');
        const storyTitle = document.getElementById('story-title');
        const storyBrief = document.getElementById('story-brief');
        const detailModal = document.getElementById('detail-modal');
        const detailTitle = document.getElementById('detail-title');
        const detailText = document.getElementById('detail-text');

        if (track) {
            // A. RENDER GAMBAR (Asli + Clone untuk Loop)
            const renderItems = () => {
                portfolioData.forEach((item, index) => createGalleryItem(item, index, track));
            };
            renderItems(); // Render Asli
            renderItems(); // Render Clone

            function createGalleryItem(item, index, container) {
                const div = document.createElement('div');
                div.classList.add('gallery-item');
                div.setAttribute('data-filename', item.filename);
                div.setAttribute('data-index', index); 
                div.onclick = () => showDetail(index);
                // Pastikan path gambar benar
                div.innerHTML = `<img src="${item.img}" alt="${item.title}" loading="lazy">`;
                container.appendChild(div);
            }

            // B. LOGIKA KECEPATAN RESPONSIF
            let isPaused = false;
            let speed = 1; // Default speed

            // Fungsi penentu kecepatan berdasarkan lebar layar
            function updateSpeed() {
                if (window.innerWidth > 768) {
                    speed = 2.5; // Desktop: Lebih cepat (agar tidak lambat)
                } else {
                    speed = 1.0; // Mobile: Normal (agar tidak pusing)
                }
            }
            
            // Jalankan saat awal dan saat layar diubah ukurannya
            updateSpeed();
            window.addEventListener('resize', updateSpeed);

            // C. AUTO SCROLL INFINITE LOOP
            function autoScroll() {
                if (!isPaused) {
                    track.scrollLeft += speed;
                    // Reset mulus saat mencapai setengah (titik clone)
                    if (track.scrollLeft >= (track.scrollWidth / 2)) {
                        track.scrollLeft = 0;
                    }
                }
            }
            // Gunakan requestAnimationFrame untuk animasi lebih halus daripada setInterval
            let scrollInterval = setInterval(autoScroll, 16); // 16ms = ~60fps

            // Pause saat hover
            track.addEventListener('mouseenter', () => isPaused = true);
            track.addEventListener('mouseleave', () => isPaused = false);
            
            // Update Teks saat gambar di tengah
            track.addEventListener('scroll', () => {
                const items = document.querySelectorAll('.gallery-item');
                const centerPoint = track.offsetWidth / 2 + track.scrollLeft;
                items.forEach((item) => {
                    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
                    if (Math.abs(centerPoint - itemCenter) < 150) {
                        document.querySelectorAll('.gallery-item').forEach(i => i.classList.remove('active'));
                        item.classList.add('active');
                        const idx = item.getAttribute('data-index');
                        if(storyTitle) storyTitle.innerText = portfolioData[idx].title;
                        if(storyBrief) storyBrief.innerText = portfolioData[idx].brief;
                    }
                });
            });

            // D. MODAL
            window.showDetail = function(index) {
                isPaused = true;
                const data = portfolioData[index];
                if(detailTitle) detailTitle.innerText = data.title;
                if(detailText) detailText.innerText = data.detail;
                if(detailModal) detailModal.classList.remove('hidden');
            }
            window.closeModal = function() {
                if(detailModal) detailModal.classList.add('hidden');
                isPaused = false;
            }
            window.onclick = function(event) { if (event.target == detailModal) closeModal(); }
        }
    }

    // =========================================
    // 4. LOGIKA SHOWCASE (STACKED CARDS & POPUP)
    // =========================================
    if (typeof showcaseData !== 'undefined') {
        const showcaseGrid = document.getElementById('showcase-grid');
        const modal = document.getElementById('showcase-modal'); // ID Modal yang baru dipindah
        const modalTitle = document.getElementById('showcase-modal-title');
        const modalDesc = document.getElementById('showcase-modal-desc');
        const modalTrack = document.getElementById('showcase-track');
        let showcaseInterval;

        // BAGIAN A: RENDER BOX (FILE BOX DESIGN) - NEW!
        // =========================================
        if (showcaseGrid) {
            showcaseData.forEach((item, index) => {
                // 1. Buat Kontainer Utama
                const box = document.createElement('div');
                box.classList.add('file-box-container');

                // 2. Siapkan HTML untuk Thumbnail Mini
                let thumbnailsHTML = '';
                
                // Ambil maksimal 6 item pertama (image only) agar pas di grid 3x2
                let imageCount = 0;
                item.media.forEach(mediaItem => {
                    // Hanya ambil gambar, dan maksimal 6 buah
                    if (mediaItem.type === 'image' && imageCount < 6) {
                        thumbnailsHTML += `<img src="${mediaItem.src}" class="mini-thumb" alt="thumbnail">`;
                        imageCount++;
                    }
                });

                // Jika item kurang dari 6, bisa tambahkan placeholder kosong (opsional, tapi lebih rapi tanpanya)

                // 3. Isi Kontainer dengan Struktur Tab + Body
                box.innerHTML = `
                    <div class="file-box-tab">${item.category}</div>
                    <div class="file-box-body">
                        ${thumbnailsHTML}
                    </div>
                `;
                
                // 4. Event Klik Buka Modal (Tetap sama)
                box.onclick = () => openShowcaseModal(index);
                showcaseGrid.appendChild(box);
            });
        }

        // B. Fungsi Buka Modal
        window.openShowcaseModal = function(index) {
            const data = showcaseData[index];
            if (!modal) return;

            // Isi Data
            modalTitle.innerText = data.category;
            modalDesc.innerText = data.desc;
            modalTrack.innerHTML = ""; // Reset isi lama

            // Masukkan Media (Looping Data)
            // Kita masukkan data 2x untuk efek loop (Clone)
            const loopData = [...data.media, ...data.media]; 

            loopData.forEach(media => {
                const div = document.createElement('div');
                div.classList.add('showcase-media');
                
                if (media.type === 'video') {
                    // Video: Controls enabled
                    div.innerHTML = `<video controls playsinline src="${media.src}"></video>`;
                } else {
                    // Gambar
                    div.innerHTML = `<img src="${media.src}" alt="Project Media">`;
                }
                modalTrack.appendChild(div);
            });

            // Tampilkan Modal (Hapus class hidden)
            modal.classList.remove('hidden');

            // Mulai Auto Scroll
            startShowcaseScroll();
        }

        // C. Fungsi Scroll Otomatis (Infinite Loop)
        function startShowcaseScroll() {
            clearInterval(showcaseInterval);
            
            // Scroll pelan-pelan
            showcaseInterval = setInterval(() => {
                // Jangan scroll kalau mouse ada di atas video/gambar
                if(modalTrack.matches(':hover')) return;

                // Jangan scroll kalau ada video yang lagi diputar
                const videos = modalTrack.querySelectorAll('video');
                let isPlaying = false;
                videos.forEach(v => {
                    if (!v.paused && !v.ended) isPlaying = true;
                });
                if (isPlaying) return;

                // Jalankan Scroll
                modalTrack.scrollLeft += 1; // Kecepatan

                // Reset Posisi (Infinite Loop Trick)
                // Jika sudah scroll setengah jalan, balik ke 0
                if (modalTrack.scrollLeft >= (modalTrack.scrollWidth / 2)) {
                    modalTrack.scrollLeft = 0;
                }
            }, 20);
        }

        // D. Tutup Modal
        window.closeShowcaseModal = function() {
            modal.classList.add('hidden');
            clearInterval(showcaseInterval); // Matikan scroll
            
            // Stop Video agar suaranya mati
            const videos = modalTrack.querySelectorAll('video');
            videos.forEach(v => v.pause());
        }
    }
});

// =========================================
// 4. LOGIKA SCROLL NAVBAR (STICKY)
// =========================================
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if(nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// =========================================
// 5. VALIDASI FORM
// =========================================
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
    const dateTimeString = now.toLocaleString('id-ID', { 
        weekday: 'long', year: 'numeric', month: 'long', 
        day: 'numeric', hour: '2-digit', minute: '2-digit'
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