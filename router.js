const { Router, Response } = require("pepesan");
const BotController = require("./controller/BotController");
const f = require("./utils/Formatter");

const router = new Router();

// Keyword angka menu utama
router.keyword("1", [BotController, "tentangBPS"]);
router.keyword("2", [BotController, "perpustakaan"]);
router.keyword("3", [BotController, "konsultasi"]);
router.keyword("4", [BotController, "rekomendasiSektoral"]);
router.keyword("5", [BotController, "faq"]);
router.keyword("6", [BotController, "janjitemu"]);
router.keyword("7", [BotController, "pengaduan"]);
router.keyword("8", [BotController, "selesaimenu"]);

router.keyword("21", [BotController, "publikasi"]);
router.keyword("22", [BotController, "datasatistik"]);

router.keyword("221", [BotController, "statistikSosial"]);
router.keyword("222", [BotController, "statistikEkonomi"]);
router.keyword("223", [BotController, "statistikLingkungan"]);

// Submenu Statistik Sosial (Statistik Demografi dan Sosial)
router.keyword("2311", [BotController, "sosialKependudukan"]);
router.keyword("2312", [BotController, "sosialTenagaKerja"]);
router.keyword("2313", [BotController, "sosialPendidikan"]);
router.keyword("2314", [BotController, "sosialKesehatan"]);
router.keyword("2315", [BotController, "sosialKonsumsi"]);
router.keyword("2316", [BotController, "sosialPerlindungan"]);
router.keyword("2317", [BotController, "sosialPemukiman"]);
router.keyword("2318", [BotController, "sosialKriminal"]);
router.keyword("2319", [BotController, "sosialBudaya"]);
router.keyword("23110", [BotController, "sosialPolitik"]);
router.keyword("23111", [BotController, "sosialWaktu"]);

// Submenu Statistik Ekonomi
router.keyword("2321", [BotController, "ekonomiMakro"]);
router.keyword("2322", [BotController, "ekonomiNeraca"]);
router.keyword("2323", [BotController, "ekonomiBisnis"]);
router.keyword("2324", [BotController, "ekonomiSektoral"]);
router.keyword("2325", [BotController, "ekonomiKeuanganPublik"]);
router.keyword("2326", [BotController, "ekonomiPerdagangan"]);
router.keyword("2327", [BotController, "ekonomiHarga"]);
router.keyword("2328", [BotController, "ekonomiTenagaKerja"]);
router.keyword("2329", [BotController, "ekonomiIptek"]);
router.keyword("23210", [BotController, "ekonomiPertanian"]);
router.keyword("23211", [BotController, "ekonomiEnergi"]);
router.keyword("23212", [BotController, "ekonomiIndustri"]);
router.keyword("23213", [BotController, "ekonomiTransportasi"]);
router.keyword("23214", [BotController, "ekonomiPariwisata"]);
router.keyword("23215", [BotController, "ekonomiFinansial"]);

// Submenu Statistik Lingkungan & Multidomain
router.keyword("2331", [BotController, "lingkungan"]);
router.keyword("2332", [BotController, "regionalAreaKecil"]);
router.keyword("2333", [BotController, "multiDomain"]);
router.keyword("2334", [BotController, "bukuTahunan"]);
router.keyword("2335", [BotController, "kemiskinanLintasSektor"]);
router.keyword("2336", [BotController, "genderKhusus"]);
router.keyword("2337", [BotController, "masyarakatInformasi"]);
router.keyword("2338", [BotController, "globalisasi"]);
router.keyword("2339", [BotController, "mdgs"]);
router.keyword("23310", [BotController, "berkelanjutan"]);
router.keyword("23311", [BotController, "kewirausahaan"]);

// FAQ (Pertanyaan yang Sering Diajukan)
router.keyword("51", [BotController, "faqApaItuBPS"]);
router.keyword("52", [BotController, "faqLayananBPS"]);
router.keyword("53", [BotController, "faqAksesData"]);
router.keyword("54", [BotController, "faqBiayaData"]);
router.keyword("55", [BotController, "faqKepahiangDalamAngka"]);
router.keyword("56", [BotController, "faqPerbedaanSensus"]);
router.keyword("57", [BotController, "faqPerbedaanData"]);
router.keyword("58", [BotController, "faqTidakMenemukanData"]);
router.keyword("59", [BotController, "faqPenggunaanData"]);
router.keyword("510", [BotController, "faqLowonganMagang"]);
router.keyword("511", [BotController, "faqKonsultasi"]);

// Menu lain
router.keyword("Buat Janji", [BotController, "hubungiPetugas2"]);
router.keyword("Tanya PeTik", [BotController, "hubungiPetugas"]);
router.keyword("menu", [BotController, "menu"]);
router.keyword("selesai konsultasi", [BotController, "selesai"]);
router.keyword("selesai janji", [BotController, "selesai2"]);

// Fallback
router.keyword("*", [BotController, "introduction"]);
module.exports = router;
