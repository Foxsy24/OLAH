# Rakas – Website (by Krastala Team)

Website statis untuk Kota Surabaya (HTML + CSS + JS), tanpa server dan tanpa build. Bisa dibuka di semua device.

## Struktur
- `index.html` – halaman utama (landing + container aplikasi)
- `css/style.css` – seluruh tampilan
- `js/data.js` – data kategori sampah, poin, toko MarKas, artikel KaSearch (edit di sini)
- `js/app.js` – logika: daftar, Go-Kas, MarKas, Kaskulasi, KaSearch, simulator
- `manifest.webmanifest`, `sw.js`, `icons/` – agar bisa di-install di HP (PWA) dan jalan offline

## Jalankan di komputer
Klik dua kali `index.html`, atau jalankan `python3 -m http.server 8000` lalu buka http://localhost:8000

## Online agar bisa dikirim lewat WhatsApp (semua gratis)
1. **Netlify Drop**: buka https://app.netlify.com/drop, seret folder ini. Link publik langsung jadi.
2. **GitHub Pages**: upload isi folder ke repo, Settings > Pages > Deploy from branch (main, root).
3. **Vercel / Cloudflare Pages**: import repo atau upload folder.
4. **Hosting/cPanel**: upload semua isi folder ke `public_html`.
Harus HTTPS agar fitur "Install ke layar utama" dan offline aktif (semua layanan di atas sudah HTTPS).

## Catatan
- Data pengguna (akun, poin, riwayat) disimpan di `localStorage` browser masing-masing, tidak ada server.
- Untuk akun lintas perangkat, driver, dan transaksi nyata, tahap berikutnya adalah backend + database (mis. Firebase / Supabase).
