/* ---- data ---- */
const CATS=["Plastik","Kardus","Kertas","Kaca","Logam","Lainnya"],COL={Plastik:"#1b6e34",Kardus:"#2e9e54",Logam:"#f5b400",Kaca:"#f9c23c",Kertas:"#7b4fa6",Lainnya:"#b7a4dc"};
const IT=[["Plastik","Plastik Kresek","🛍️",15,.05],["Plastik","Kemasan Produk","📦",100,.2],["Plastik","Botol Plastik","🧴",50,.1],["Plastik","Bungkus Produk","🍬",20,.05],
["Kardus","Kardus Besar","📦",100,1],["Kardus","Kardus Kecil","📫",50,.5],["Kertas","Dokumen Bekas","📄",2,.2],["Kertas","Map Kertas","🗂️",3,.1],
["Kaca","Botol Kaca","🍾",30,.4],["Kaca","Pecahan Kaca","🔹",10,.2],["Logam","Kaleng Minuman","🥫",25,.03],["Logam","Besi Bekas","🔩",60,1],
["Lainnya","Kain Perca","🧵",10,.2],["Lainnya","Elektronik Kecil","🔌",80,.5]];
const STORES=[["Kerajinan Agung","🏺",4,[["Vas Kaleng Hias",3000],["Hiasan Dinding",5000]]],["Rumah Daur Ulang","♻️",4,[["Pot Botol Plastik",2500],["Keranjang Daur Ulang",6000]]],
["Tas Homemade","👜",5,[["Tas Anyam Bungkus Kopi",9000],["Dompet Daur Ulang",4000]]],["Balai Recycle","🧺",4,[["Tempat Pensil Kardus",2000],["Kotak Serbaguna",3500]]],
["House Of DIY","🛠️",4,[["Lampu Hias Botol",7000],["Rak Mini Kardus",4500]]],["Crafties.id","🎨",4,[["Gantungan Kunci Plastik",1500],["Bunga Plastik",3000]]]];
const ART=[["Kenapa sampah anorganik perlu dipilah?","Data dari Kabupaten Gresik menunjukkan sekitar 140 ton sampah tertimbun tiap hari dan 62% belum terkelola. Rakas hadir untuk warga Kota Surabaya. Sampah anorganik yang dipilah bisa didaur ulang sehingga mengurangi tumpukan di TPA."],
["Tips &amp; Trik: pilah dari rumah","Siapkan dua wadah: organik dan anorganik. Bilas kemasan plastik, ratakan kardus, kumpulkan kertas terpisah, lalu setorkan lewat Go-Kas."],
["Plastik butuh waktu sangat lama terurai","Banyak jenis plastik baru terurai setelah ratusan tahun. Mengumpulkan dan menyetorkannya jauh lebih baik daripada membuang atau membakarnya."],
["Sampahmu jadi rupiah dan karya","Poin dari Go-Kas bisa dibelanjakan di MarKas untuk produk buatan UMKM kreatif lokal, sehingga perputaran ekonomi tetap di daerahmu."]];
const STAT=["Menunggu driver","Driver menuju lokasi","Sampah diangkut","Poin diterima"],KEC=["Asemrowo","Benowo","Bubutan","Bulak","Dukuh Pakis","Gayungan","Genteng","Gubeng","Gunung Anyar","Jambangan","Karang Pilang","Kenjeran","Krembangan","Lakarsantri","Mulyorejo","Pabean Cantian","Pakal","Rungkut","Sambikerep","Sawahan","Semampir","Simokerto","Sukolilo","Sukomanunggal","Tambaksari","Tandes","Tegalsari","Tenggilis Mejoyo","Wiyung","Wonocolo","Wonokromo"];
