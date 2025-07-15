const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");

const allowedSessions = new Set();

const axios = require("axios"); // Tambahkan di atas

async function logToSheet({ name, number, menu }) {
  try {
    await axios.post("https://script.google.com/macros/s/AKfycbziT53eMvlQ-yHB8rGzq6W9hkJIUNpzUScaQ0rg3y834ZOeW6UM2cE_ENAwJjMBinQ/exec", {
      name,
      number,
      menu
    });
  } catch (e) {
    console.error("[LOGGING ERROR]", e.message);
  }
}

module.exports = class BotController extends Controller {

  async replyWithFooter(text) {
    return this.reply(`${text}\n\n${f("footer")}`);
  }

  async introduction(request) {
    const user = request.from;
    console.log("[INTRODUCTION] From:", user);

    if (allowedSessions.has(user)) return;

    const text = `*Halo, Sahabat Data!*\n\nSelamat datang di *Tikko*\n(Tanya Statistik Kepahiang Online) — Layanan chatbot resmi dari BPS Kabupaten Kepahiang.\n\nKetik *MENU* untuk melihat daftar layanan.`;
    return this.replyWithFooter(text);
  }


  async menu(request) {
    const user = request.from;
    if (allowedSessions.has(user)) return;

    const daftarMenu = [
      f("menu.tentangBPS"),
      f("menu.perpustakaan"),
      f("menu.konsultasi"),
      f("menu.rekomendasiSektoral"),
      f("menu.faq"),
      f("menu.janjitemu"),
      f("menu.pengaduan"),
      f("menu.selesaimenu")
    ];

    return this.replyWithFooter(`📋 *Menu Layanann Tikko*\n\nSilakan pilih layanan dengan mengetik sesuai menu yang tersedia.\n\n${daftarMenu.map((m, i) => `*${i + 1}*. ${m}`).join("\n")}`);
  }

  async tentangBPS(request) {
  const user = request.from;
  if (allowedSessions.has(user)) return;

  return this.replyWithFooter(`*Tentang BPS Kabupaten Kepahiang*

Badan Pusat Statistik Kabupaten Kepahiang adalah instansi resmi yang menyajikan data statistik terpercaya untuk masyarakat dan pemerintah daerah.

Kantor kami berlokasi di *Komplek Perkantoran Pemda, Desa Pelangkian, Kecamatan Kepahiang, Kabupaten Kepahiang, Bengkulu*.

Untuk layanan tatap muka, Anda dapat mengunjungi kantor kami pada hari dan jam berikut:  
*Hari*          : Senin–Jumat  
*Jam Pelayanan* : 08.00-15.00 WIB

Lihat lokasi di Google Maps:
🔗 https://maps.app.goo.gl/2kJenAzWUaQCsxvC8`);
}


  async perpustakaan(request) {
  const user = request.from;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
    const daftarSubmenu = [f("menu.publikasi"), f("menu.datasatistik")];
    return this.replyWithFooter(`📚 *Layanan Perpustakaan BPS Kabupaten Kepahiang*\n\nSilakan pilih layanan berikut:\n\n${daftarSubmenu.map((m, i) => `*${21 + i}*. ${m}`).join("\n")}\n\nApabila informasi yang Anda cari belum tersedia, atau Anda membutuhkan bantuan lebih lanjut, silakan ketik *Tanya PeTik* untuk terhubung langsung dengan petugas kami.`);
  }

  async publikasi(request) {
    const user = request.from;
    if (allowedSessions.has(user)) return;
    return this.replyWithFooter(`📚 Publikasi Statistik BPS Kabupaten Kepahiang

Berikut beberapa publikasi terbaru yang paling sering diakses:

1. Kabupaten Kepahiang Dalam Angka 2025
🔗 https://s.bps.go.id/KepahiangDalamAngka2025
2. Indeks Pembangunan Manusia 2023
🔗 https://s.bps.go.id/IPMKepahiang2025
3. Indikator Strategis Kabupaten Kepahiang 2023
🔗 https://s.bps.go.id/IndikatorStartegisKepahiang2023

Lihat semua publikasi dan unduh versi lengkapnya di:
https://kepahiangkab.bps.go.id/id/publication`);
  }

  async datasatistik(request) {
    const submenu = [f("menu.statistikSosial"), f("menu.statistikEkonomi"), f("menu.statistikLingkungan")];
    return this.replyWithFooter(`📊 *Data Statistik Berdasarkan Kategori*\n\nSilakan pilih kategori:\n\n${submenu.map((m, i) => `*22${i + 1}*. ${m}`).join("\n")}`);
  }

  async statistikSosial(request) {
  const submenu = [
    "Kependudukan dan Migrasi",
    "Tenaga Kerja",
    "Pendidikan",
    "Kesehatan",
    "Konsumsi dan Pendapatan",
    "Perlindungan Sosial",
    "Pemukiman dan Perumahan",
    "Hukum dan Kriminal",
    "Budaya",
    "Aktivitas Politik dan Komunitas Lainnya",
    "Penggunaan Waktu"
  ];

  return this.replyWithFooter(
    `📊 *Statistik Demografi dan Sosial*\n\nSilakan pilih topik yang ingin Anda akses:\n\n${submenu.map((m, i) => `*231${i + 1}*. ${m}`).join("\n")}\n\nKetik angka sesuai pilihan Anda.`
  );
}

  async statistikEkonomi(request) {
  const submenu = [
    "Statistik Makroekonomi",
    "Neraca Ekonomi",
    "Statistik Bisnis",
    "Statistik Sektoral",
    "Keuangan Pemerintah & Statistik Publik",
    "Perdagangan & Neraca Pembayaran",
    "Harga-Harga",
    "Biaya Tenaga Kerja",
    "IPTEK & Inovasi",
    "Pertanian, Kehutanan, Perikanan",
    "Energi",
    "Pertambangan, Manufaktur, Konstruksi",
    "Transportasi",
    "Pariwisata",
    "Perbankan & Finansial"
  ];

  return this.replyWithFooter(`📊 *Data Statistik Ekonomi*\n\nSilakan pilih subkategori berikut:\n\n${submenu.map((m, i) => `*232${i + 1}*. ${m}`).join("\n")}\n\nKetik angka untuk melihat datanya.`);
}


  async statistikLingkungan(request) {
  const submenu = [
    "Lingkungan",
    "Statistik Regional & Area Kecil",
    "Statistik & Indikator Multi-Domain",
    "Buku Tahunan & Ringkasan Sejenis",
    "Kondisi Tempat Tinggal, Kemiskinan, dan Sosial Lintas Sektor",
    "Gender & Kelompok Populasi Khusus",
    "Masyarakat Informasi",
    "Globalisasi",
    "Indikator MDGs",
    "Perkembangan Berkelanjutan",
    "Kewirausahaan"
  ];

  return this.replyWithFooter(`📊 *Data Statistik Lingkungan Hidup & Multi-domain*\n\nSilakan pilih subkategori:\n\n${submenu.map((m, i) => `*233${i + 1}*. ${m}`).join("\n")}\n\nKetik angka untuk melihat datanya.`);
}


  async konsultasi(request) {
  const user = request.from;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Konsultasi"
  });

  return this.replyWithFooter (`🤝 *Layanan Konsultasi Statistik*

📍 Untuk berkonsultasi langsung dengan petugas statistik BPS Kabupaten Kepahiang, silakan ketik *Tanya PeTik*.

Kami siap membantu Sahabat Data dalam berbagai hal, seperti:
- Permintaan dan pemahaman data  
- Interpretasi hasil statistik  
- Penjelasan metadata  
- Metode pengumpulan dan analisis  
- Proses penyusunan hingga penyajian data statistik

Jika Sahabat Data ingin berkonsultasi secara daring langsung melalui BPS Pusat, silakan akses:  
🔗 https://konsultasi.bps.go.id`);
}

  async rekomendasiSektoral(request) {
     const user = request.from;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Romantik"
  });
    return this.replyWithFooter(`📝 Permintaan Rekomendasi Kegiatan Statistik Sektoral (ROMANTIK)

ROMANTIK (Rekomendasi Kegiatan Statistik Sektoral) adalah mekanisme persetujuan resmi dari BPS atas rencana kegiatan statistik yang dilakukan oleh instansi non‑BPS. Tujuannya:
- Memastikan kegiatan tersebut sesuai dengan standar statistik nasional,
- Menghindari duplikasi data,
- Menjamin hasil kegiatan dapat dipertanggungjawabkan secara teknis 

Untuk mengajukan permintaan rekomendasi, silakan isi formulir melalui link berikut:
🔗 https://s.bps.go.id/rokatik`);
  }

  async faq(request) {
    const user = request.from;
    if (allowedSessions.has(user)) return;
    return this.replyWithFooter("FAQ bisa Anda akses di https://kepahiangkab.bps.go.id/faq");
  }

  async janjitemu(request) {
    const user = request.from;
    if (allowedSessions.has(user)) return;
    return this.replyWithFooter(`📅 *Janji Temu Pelayanan Statistik*

Untuk membuat janji temu, silakan koordinasikan terlebih dahulu dengan PeTik (Petugas Statistik) BPS Kabupaten Kepahiang.

Ketik *Buat Janji* untuk memulai proses koordinasi.`);
  }

  async pengaduan(request) {
    const user = request.from;
    if (allowedSessions.has(user)) return;
    return this.replyWithFooter(`📢 *Layanan Pengaduan*

Untuk menyampaikan pengaduan, silakan isi formulir secara daring melalui tautan berikut:
🔗 https://kepahiangkab.bps.go.id/pengaduan
`);
  }

  async selesaimenu(request) {
    const user = request.from;
    if (allowedSessions.has(user)) return;
    await this.replyWithFooter(`🎉 *Terima Kasih telah menggunakan layanan Tikko!*

Kami harap informasi yang Anda peroleh bermanfaat.

Untuk membantu kami meningkatkan layanan dan menyediakan data yang lebih sesuai kebutuhan Sahabat Data, silakan isi *Survei Kebutuhan Data* melalui tautan berikut:
🔗 https://s.bps.go.id/surveikebutuhan

Sampai jumpa di layanan berikutnya!`);
    
  }

  async hubungiPetugas(request) {
    const userNumber = request.number;
    const userName = request.name;
    const petugasNumber = "62895413640333"; // Tanpa @c.us, pepesan handle otomatis

    console.log("[HUBUNGI PETUGAS] Permintaan dari:", userNumber);

    // 1. Balas ke user
    await this.reply(`🙏 *Terima kasih telah menghubungi PeTik (Petugas Statistik).*
Mohon tunggu sebentar, Sahabat Data sedang dihubungkan dengan petugas statistik yang bertugas.`);

    // 2. Kirim ke petugas
    try {
      await this.send(petugasNumber, [
         `*Permintaan Konsultasi Statistik*
  👤 Nama  : *${userName}*
  📱 Nomor : ${userNumber}
  
  Pengguna memerlukan bantuan terkait statistik melalui *Tikko*.
  Mohon segera ditindaklanjuti melalui WA Web.`
      ]);
      console.log("[HUBUNGI PETUGAS] Notifikasi berhasil dikirim.");
    } catch (err) {
      console.error("[HUBUNGI PETUGAS] Gagal kirim ke petugas:", err);
    }

    // 3. Tambahkan ke sesi aktif agar tidak di-auto-reply
    allowedSessions.add(request.from);
    console.log("[HUBUNGI PETUGAS] Sesi aktif sekarang:", [...allowedSessions]);
  }

  async hubungiPetugas2(request) {
    const userNumber = request.number;
    const userName = request.name;
    const petugasNumber = "62895366006564"; // Tanpa @c.us, pepesan handle otomatis

    console.log("[HUBUNGI PETUGAS] Permintaan dari:", userNumber);

    // 1. Balas ke user
    await this.reply(`🙏 *Terima kasih telah menghubungi PeTik (Petugas Statistik).*
Mohon tunggu sebentar, Sahabat Data sedang dihubungkan dengan petugas statistik yang bertugas.`);
await this.reply(`📅 *Sembari menunggu petugas*, mohon informasikan beberapa hal berikut untuk penjadwalan janji temu:

1️⃣ *Nama lengkap* :  
2️⃣ *Keperluan janji temu* :  
3️⃣ *Hari, tanggal, dan jam yang diinginkan* :
   (contoh: Selasa, 16 Juli 2025, pukul 10.00 WIB)

Silakan balas dengan format lengkap agar kami dapat menjadwalkan janji temu Anda.`);

    // 2. Kirim ke petugas
    try {
      await this.send(petugasNumber, [
         `📅 *Permintaan Janji Temu Statistik*
  👤 Nama  : *${userName}*
  📱 Nomor : ${userNumber}
  
  Pengguna mengajukan janji temu melalui *Tikko*.,
  Mohon bantu konfirmasi waktu dan keperluan layanan melalui WA Web.`
      ]);
      console.log("[HUBUNGI PETUGAS] Notifikasi berhasil dikirim.");
    } catch (err) {
      console.error("[HUBUNGI PETUGAS] Gagal kirim ke petugas:", err);
    }

    // 3. Tambahkan ke sesi aktif agar tidak di-auto-reply
    allowedSessions.add(request.from);
    console.log("[HUBUNGI PETUGAS] Sesi aktif sekarang:", [...allowedSessions]);

    return "Kamu telah terhubung ke petugas.";
  }


  async selesai(request) {
  const from = request.from;

  // Hapus dari sesi konsultasi agar bisa auto-reply lagi
  const wasInSession = allowedSessions.delete(from);
  console.log("[SELESAI] Autoreply diaktifkan kembali untuk:", from);

  if (wasInSession) {
    return `✅ *Sesi konsultasi telah ditutup.*

Terima kasih, *Sahabat Data*, atas percakapannya bersama PeTik (Petugas Statistik). 

Untuk membantu kami meningkatkan kualitas layanan dan penyediaan data, mohon luangkan waktu untuk mengisi *Survei Kebutuhan Data* melalui tautan berikut:
🔗 https://s.bps.go.id/surveikebutuhan

Tikko kini kembali ke mode auto-reply dan siap membantu kebutuhan statistik Anda berikutnya.`;

  } else {
    return `ℹ️ *Saat ini tidak ada sesi konsultasi yang aktif.*

Tikko sudah kembali ke mode auto-reply dan siap membantu kebutuhan statistik Anda berikutnya.`;
  }
}

async selesai2(request) {
  const from = request.from;

  // Hapus dari sesi konsultasi agar bisa auto-reply lagi
  const wasInSession = allowedSessions.delete(from);
  console.log("[SELESAI] Autoreply diaktifkan kembali untuk:", from);

  if (wasInSession) {
    return `✅ *Koordinasi janji temu telah selesai.*

Terima kasih, *Sahabat Data*, atas waktunya untuk berkoordinasi bersama PeTik (Petugas Statistik).

Tikko kini kembali ke mode auto-reply dan siap membantu keperluan statistik Anda berikutnya.`;

  } else {
    return `ℹ️ *Saat ini tidak ada sesi koordinasi janji temu yang aktif.*

Tikko sudah kembali ke mode auto-reply dan siap membantu kebutuhan statistik Anda berikutnya.`;
  }
}

};
