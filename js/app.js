
const $=s=>document.querySelector(s),fmt=n=>Math.round(n).toLocaleString("id-ID"),num=id=>+$(id).value||0;
/* ---- simulator ---- */
function sim(){const a=num("#s1")*num("#s2")*num("#s3")*num("#s4"),b=num("#s5")*num("#s6")*num("#s7")/100;
$("#r1").textContent="Rp "+fmt(a);$("#r2").textContent="Rp "+fmt(b);$("#r3").textContent="Rp "+fmt(a+b);mk()}
function mk(){const t=num("#s8");[t,t*num("#s9")/100,t*num("#s10")/100].forEach((x,i)=>{$("#m"+(i+1)).textContent=fmt(x);const p=t?Math.min(100,x/t*100):0,b=$("#b"+(i+1));b.style.width=p+"%";b.textContent=p.toFixed(1).replace(".",",")+"%"})}
document.querySelectorAll(".sim input").forEach(i=>i.oninput=sim);sim();
/* ---- state ---- */
let S={u:null,orders:[],log:[]},tab="home",cat="Plastik",cart={},q="",store=null;
try{S=Object.assign(S,JSON.parse(localStorage.getItem("rakas1")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("rakas1",JSON.stringify(S))}catch(e){}};
const done=()=>S.orders.filter(o=>o.st==3),earned=()=>done().reduce((a,o)=>a+o.pts,0),spent=()=>S.log.reduce((a,l)=>a+l.pts,0),pts=()=>earned()-spent();
const toast=m=>{const t=$("#toast");t.textContent=m;t.style.display="block";clearTimeout(toast.h);toast.h=setTimeout(()=>t.style.display="none",2200)};
const cartTot=()=>Object.entries(cart).reduce((a,[i,n])=>({p:a.p+IT[i][3]*n,k:a.k+IT[i][4]*n,n:a.n+n}),{p:0,k:0,n:0});
/* ---- views ---- */
function register(){return`<div class="ah"><div><h2>Halo, Sobat Rakas</h2><small>Silakan daftarkan dirimu sebagai pengguna</small></div><span class="logo">RAKAS</span></div><div class="pad"><div class="c"><label>Nama</label><input id="rn"><label style="margin-top:8px;display:block">Nomor telepon</label><input id="rt" type="tel"><label style="margin-top:8px;display:block">Domisili kecamatan (Kota Surabaya)</label><select id="rc">${KEC.map(k=>`<option>${k}</option>`).join("")}</select><label style="margin-top:8px;display:block">Alamat lengkap (lokasi penjemputan)</label><textarea id="ra" rows="2"></textarea><p style="text-align:right"><button class="btn g" data-a="reg">NEXT</button></p></div></div>`}
function home(){const l=ART[0];return`<div class="pt"><span>🪙 Rakas Points</span><b>${fmt(pts())}</b></div><div class="q"><button data-a="tab" data-t="gokas"><span>📦</span>OLAH Pick</button><button data-a="tab" data-t="markas"><span>🛒</span>OLAH Mart</button><button data-a="tab" data-t="kaskulasi"><span>🧮</span>OLAH Count</button></div>
<div class="c"><h3>Cara pakai</h3><p>1) Pilih sampah di <b>OLAH Pick</b> lalu tekan Send. 2) Driver menjemput, poin masuk. 3) Lihat grafik di <b>OLAH Count</b>. 4) Belanja di <b>OLAH Mart</b> atau tukar ke e-money.</p></div>
<h3 style="margin:16px 0 0;color:var(--pu)">OLAH Pedia 🔎</h3><details open><summary>${l[0]}</summary><p>${l[1]}</p></details></div>`.replace(/<\/div>$/,"")}
function gokas(){const t=cartTot(),act=S.orders.filter(o=>o.st<3);return`<div class="tabs">${CATS.map(c=>`<button class="${c==cat?"on":""}" data-a="cat" data-c="${c}">${c}</button>`).join("")}</div>
${IT.map((x,i)=>x[0]==cat?`<div class="it"><div class="im">${x[2]}</div><div><b>${x[1]}</b><small>🪙 ${x[3]}/pcs · ±${x[4]} kg</small></div><div class="st"><button data-a="dec" data-i="${i}">−</button><span>${cart[i]||0}</span><button data-a="inc" data-i="${i}">+</button></div></div>`:"").join("")}
<div class="bb"><div><small>Total Poin</small><br><b>🪙 ${fmt(t.p)}</b> <small>· ${t.k.toFixed(2)} kg</small></div><button class="btn" data-a="send" ${t.n?"":"disabled"}>Send</button></div>
<p style="font-size:13px;color:var(--mu)">📍 Dijemput di: ${S.u.a}${S.u.c?", Kec. "+S.u.c:""}, Kota Surabaya</p>
${act.length?`<h3 style="color:var(--pu)">Pesanan aktif</h3>`+act.map(o=>`<div class="c" style="margin-top:8px"><b>${Object.values(o.items).reduce((a,b)=>a+b,0)} item · ${o.kg.toFixed(2)} kg · 🪙 ${fmt(o.pts)}</b><div class="pr"><i style="width:${(o.st+1)*25}%"></i></div><small>${STAT[o.st]}</small><p style="margin:6px 0 0"><button class="btn g" data-a="adv" data-id="${o.id}">Simulasikan: lanjut tahap</button></p></div>`).join(""):""}`}
function markas(){if(store!==null){const s=STORES[store];return`<button class="btn" data-a="back">‹ Kembali</button><h3 style="color:var(--pu);margin:12px 0 0">${s[1]} ${s[0]}</h3><small>${"★".repeat(s[2])}${"☆".repeat(5-s[2])} · Surabaya</small>${s[3].map((p,j)=>`<div class="it"><div class="im">${s[1]}</div><div><b>${p[0]}</b><small>🪙 ${fmt(p[1])}</small></div><button class="btn g" data-a="buy" data-s="${store}" data-j="${j}">Tukar</button></div>`).join("")}`}
const r=STORES.map((s,i)=>[s,i]).filter(([s])=>s[0].toLowerCase().includes(q.toLowerCase()));
return`<div class="pt"><span>🪙 Poinmu</span><b>${fmt(pts())}</b></div><input id="qs" placeholder="Cari toko..." value="${q}" style="margin-top:10px">${r.map(([s,i])=>`<div class="it"><div class="im">${s[1]}</div><div><b>${s[0]}</b><small>${"★".repeat(s[2])}${"☆".repeat(5-s[2])}</small></div><button class="btn g" data-a="store" data-s="${i}">Lihat</button></div>`).join("")||"<p>Toko tidak ditemukan.</p>"}`}
function kaskulasi(){const k={},E=earned();let kg=0;done().forEach(o=>Object.entries(o.items).forEach(([i,n])=>{k[IT[i][0]]=(k[IT[i][0]]||0)+IT[i][4]*n;kg+=IT[i][4]*n}));
let acc=0;const ring=CATS.filter(c=>k[c]).map(c=>{const p=k[c]/kg*100,s=`<circle r="15.9155" cx="21" cy="21" fill="none" stroke="${COL[c]}" stroke-width="7" stroke-dasharray="${p} ${100-p}" stroke-dashoffset="${25-acc}"/>`;acc+=p;return s}).join("")||`<circle r="15.9155" cx="21" cy="21" fill="none" stroke="#ddd" stroke-width="7"/>`;
const hist=[...done().map(o=>({t:o.t,s:"Setor sampah "+o.kg.toFixed(2)+" kg",v:"+"+fmt(o.pts)})),...S.log.map(l=>({t:l.t,s:l.s,v:"−"+fmt(l.pts)}))].sort((a,b)=>b.t-a.t).slice(0,8);
return`<div class="c" style="text-align:center"><svg viewBox="0 0 42 42" width="190">${ring}<text x="21" y="22.5" text-anchor="middle" font-size="5" font-weight="700" fill="currentColor">${kg.toFixed(1)} kg</text></svg></div>
<div class="stat"><div>Total Pendapatan<b>🪙 Rp ${fmt(E)}</b></div><div>Total Berat Sampah<b>${kg.toFixed(2)} kg</b></div></div>
<div class="lg">${CATS.map(c=>`<div><i style="background:${COL[c]}"></i>${c} ${kg?Math.round((k[c]||0)/kg*100):0}%</div>`).join("")}</div>
<h3 style="color:var(--pu);margin-top:16px">Statistik Literasi</h3>${CATS.filter(c=>k[c]).map(c=>`<p style="margin:4px 0"><b style="color:${COL[c]}">● ${c}</b> – menyumbang ${Math.round(k[c]/kg*100)}% (${k[c].toFixed(2)} kg) dari sampah yang kamu setor.</p>`).join("")||"<p>Belum ada setoran selesai. Kirim sampah lewat OLAH Pick dulu.</p>"}
<div class="c" style="margin-top:14px"><h3>💳 Tukar ke e-money</h3><p>Saldo: 🪙 ${fmt(pts())} (1 poin = Rp 1). Minimal Rp 1.000.</p><input id="em" type="number" placeholder="Jumlah poin" style="margin:8px 0"><button class="btn g" data-a="emoney">Tukar</button></div>
<h3 style="color:var(--pu);margin-top:16px">Riwayat</h3>${hist.map(h=>`<div class="row"><span>${h.s}<br><small>${new Date(h.t).toLocaleDateString("id-ID")}</small></span><b>${h.v}</b></div>`).join("")||"<p>Belum ada riwayat.</p>"}`}
function kasearch(){return ART.map(a=>`<details><summary>${a[0]}</summary><p>${a[1]}</p></details>`).join("")}
const TABS=[["home","🏠","Beranda"],["gokas","📦","OLAH Pick"],["markas","🛒","OLAH Mart"],["kaskulasi","🧮","OLAH Count"],["kasearch","🔎","OLAH Pedia"]],V={home,gokas,markas,kaskulasi,kasearch};
function draw(){const a=$("#app");if(!S.u){a.innerHTML=register();return}
a.innerHTML=`<div class="ah"><div><small>Halo,</small><h2>${S.u.n}!</h2></div><button class="btn" data-a="out" style="font-size:12px;padding:6px 12px">Keluar</button></div><div class="pad">${V[tab]()}</div><div class="nv">${TABS.map(t=>`<button class="${t[0]==tab?"on":""}" data-a="tab" data-t="${t[0]}"><span>${t[1]}</span>${t[2]}</button>`).join("")}</div>`;
const s=$("#qs");if(s){s.oninput=e=>{q=e.target.value;const p=e.target.selectionStart;draw();const n=$("#qs");n.focus();n.setSelectionRange(p,p)}}}
const A={
reg(){const n=$("#rn").value.trim(),t=$("#rt").value.trim(),a=$("#ra").value.trim(),c=$("#rc").value.trim();if(!n||!c||!/^\d{9,14}$/.test(t)||!a)return toast("Lengkapi semua data (telepon 9–14 digit)");S.u={n,t,c,k:"Kota Surabaya",a};save();draw()},
tab(d){tab=d.t;store=null;draw();scrollTo(0,0)},cat(d){cat=d.c;draw()},
inc(d){cart[d.i]=(cart[d.i]||0)+1;draw()},dec(d){if(cart[d.i]>0)cart[d.i]--;if(!cart[d.i])delete cart[d.i];draw()},
send(){const t=cartTot();S.orders.unshift({id:Date.now(),items:{...cart},pts:t.p,kg:t.k,t:Date.now(),st:0});cart={};save();toast("Permintaan dikirim. Driver segera menjemput!");draw()},
adv(d){const o=S.orders.find(o=>o.id==d.id);if(o){o.st++;save();toast(o.st==3?"Poin diterima: +"+fmt(o.pts):STAT[o.st]);draw()}},
store(d){store=+d.s;draw()},back(){store=null;draw()},
buy(d){const p=STORES[d.s][3][d.j];if(pts()<p[1])return toast("Poin belum cukup");S.log.unshift({t:Date.now(),pts:p[1],s:"Belanja: "+p[0]});save();toast("Berhasil menukar "+p[0]);draw()},
emoney(){const v=num("#em");if(v<1000)return toast("Minimal 1.000 poin");if(v>pts())return toast("Poin tidak cukup");S.log.unshift({t:Date.now(),pts:v,s:"Tukar e-money Rp "+fmt(v)});save();toast("Berhasil ditukar ke e-money");draw()},
out(){if(confirm("Keluar dan hapus semua data di perangkat ini?")){S={u:null,orders:[],log:[]};cart={};tab="home";save();draw()}}};
document.addEventListener("click",e=>{const b=e.target.closest("[data-a]");if(b&&!b.disabled)A[b.dataset.a](b.dataset)});
/* ---- routing ---- */
function route(){const a=location.hash=="#app";$("#land").style.display=a?"none":"block";$("#app").style.display=a?"block":"none";$("#cta").style.display=a?"none":"";if(a){draw();scrollTo(0,0)}}
addEventListener("hashchange",route);route();

if("serviceWorker" in navigator&&(location.protocol=="https:"||location.hostname=="localhost")){addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}))}
