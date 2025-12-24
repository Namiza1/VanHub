// script.js (Versi Lengkap dan Diperbaiki)

/**
 * Peta Video: Objek yang memetakan kode unik ke JALUR FILE VIDEO LOKAL.
 * * Asumsi: Semua video terletak di folder 'media/videos'.
 */
const videoMap = {
    // KODE: 'Jalur/NamaFile.mp4'
    'niloudance2': 'vid/nilou2.mp4',
    'tickle2025': 'vid/a.mp4',
    'shinobu1': 'vid/c.mp4',
    'nilou1': 'vid/d.mp4',
    'ticklegirl': 'vid/e.mp4',
    'wow': 'vid/tickle.mp4',
    // Tambahkan kode video lain di sini
};

/**
 * Peta Gambar: Objek yang memetakan kode unik ke JALUR FILE GAMBAR LOKAL.
 * * Asumsi: Semua gambar terletak di folder 'media/images'.
 */
const imageMap = {
    // KODE: 'Jalur/NamaFile.jpg/png/gif'
    'ticklelana': 'vid/mermaid1.jpg',
    'tickleanime': 'vid/sample_8a61fbabdd567584c1d52802c02f0c53.jpg',
    'ilustrasi': 'media/images/ilustrasi_fantasi.gif',
    // Tambahkan kode gambar lain di sini
};

// Fungsi utama untuk memuat konten (video atau gambar)
function loadContent() {
    const contentCodeInput = document.getElementById('contentCode');
    const contentCode = contentCodeInput.value.trim().toLowerCase();
    
    // Ambil elemen tampilan konten
    const videoPlayer = document.getElementById('videoPlayer');
    const imageDisplay = document.getElementById('imageDisplay');
    const youtubeFrame = document.getElementById('youtubeFrame');
    const contentMessage = document.getElementById('contentMessage');
    const errorMessage = document.getElementById('errorMessage');

    // 1. --- RESET SEMUA ELEMEN TAMPILAN KONTEN ---
    
    // Kosongkan pesan error
    errorMessage.textContent = '';
    
    // Hentikan dan atur ulang video sebelum menyembunyikannya (MENCEGAH AUDIO BERLANJUT)
    videoPlayer.pause();
    videoPlayer.currentTime = 0;

    // Sembunyikan semua elemen tampilan
    videoPlayer.style.display = 'none';
    imageDisplay.style.display = 'none';
    youtubeFrame.style.display = 'none'; // Sembunyikan iframe YouTube
    
    // Tampilkan pesan loading/default
    contentMessage.style.display = 'block';
    contentMessage.textContent = 'Memuat konten...'; 
    
    // 2. --- PERIKSA KODE DAN TAMPILKAN KONTEN ---

    if (videoMap[contentCode]) {
        // --- KODE DITEMUKAN DI PETA VIDEO ---
        
        const videoFilePath = videoMap[contentCode];

        // 2a. Sembunyikan pesan, tampilkan pemutar <video>
        contentMessage.style.display = 'none';
        videoPlayer.style.display = 'block';

        // 2b. Setel sumber (source) video
        let fileExtension = videoFilePath.split('.').pop();
        let mimeType = `video/${fileExtension === 'webm' ? 'webm' : 'mp4'}`; 
        
        videoPlayer.innerHTML = `<source src="${videoFilePath}" type="${mimeType}">
                                Maaf, browser Anda tidak mendukung tag video.`;
        
        // 2c. Muat dan putar video baru
        videoPlayer.load();
        videoPlayer.play();

        // 2d. Bersihkan input
        contentCodeInput.value = '';
        
    } else if (imageMap[contentCode]) {
        // --- KODE DITEMUKAN DI PETA GAMBAR ---

        const imageFilePath = imageMap[contentCode];

        // 2a. Sembunyikan pesan, tampilkan elemen <img>
        contentMessage.style.display = 'none';
        imageDisplay.src = imageFilePath;
        imageDisplay.style.display = 'block';

        // 2b. Bersihkan input
        contentCodeInput.value = '';

    } else if (contentCode === '') {
        // --- JIKA INPUT KOSONG ---
        errorMessage.textContent = 'Kode konten tidak boleh kosong.';
        contentMessage.textContent = 'Masukkan kode untuk menampilkan konten.';
        
    } else {
        // --- JIKA KODE TIDAK DITEMUKAN ---
        errorMessage.textContent = `Kode "${contentCode}" tidak ditemukan. Coba kode lain.`;
        contentMessage.textContent = 'Masukkan kode konten yang valid.';
    }

}



