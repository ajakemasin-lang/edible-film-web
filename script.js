// Ganti nomor WA di bawah (format internasional tanpa +, contoh: 6281234567890)
const WA_NUMBER = "628xxxxxxx";

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });

  const popup = document.getElementById("popup");
  const openPopup = document.querySelector(".buy-btn");
  const closePopup = document.querySelector(".close");

  const qty = document.getElementById("qty");
  const total = document.getElementById("total-harga");
  const varian = document.getElementById("varian");
  const nama = document.getElementById("nama");
  const alamat = document.getElementById("alamat");
  const pembayaran = document.getElementById("pembayaran");
  const orderWA = document.getElementById("pesanWA");
  const saveOrderLocal = document.getElementById("saveOrderLocal");

  const hargaProduk = 10000;

  openPopup.onclick = () => popup.style.display = "flex";
  closePopup.onclick = () => popup.style.display = "none";
  window.onclick = e => { if (e.target === popup) popup.style.display = "none"; };

  function updateTotal() {
    const q = Math.max(1, parseInt(qty.value || 1));
    total.textContent = "Rp " + (q * hargaProduk).toLocaleString("id-ID");
  }
  qty.addEventListener("input", updateTotal);
  updateTotal();

  function saveOrderToLocal(order) {
    try {
      const key = "kemasinaja_orders_v1";
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(order); // latest first
      localStorage.setItem(key, JSON.stringify(arr));
    } catch (e) {
      console.warn("Tidak dapat menyimpan order ke localStorage", e);
    }
  }

  orderWA.addEventListener("click", () => {
    if (!nama.value.trim() || !alamat.value.trim()) {
      alert("Isi semua data (nama & alamat) terlebih dahulu.");
      return;
    }
    const jumlah = Math.max(1, parseInt(qty.value || 1));
    const hargaTotal = jumlah * hargaProduk;
    const order = {
      produk: "Edible Film",
      varian: varian.value,
      jumlah: jumlah,
      hargaTotal: hargaTotal,
      nama: nama.value.trim(),
      alamat: alamat.value.trim(),
      pembayaran: pembayaran.value,
      tanggal: new Date().toISOString()
    };

    // optionally save to localStorage for admin dashboard
    if (saveOrderLocal.checked) saveOrderToLocal(order);

    const text =
      `Halo, saya ingin memesan:%0A` +
      `Produk: ${order.produk}%0A` +
      `Varian: ${order.varian}%0A` +
      `Jumlah: ${order.jumlah} pcs%0A` +
      `Total Harga: Rp ${order.hargaTotal.toLocaleString("id-ID")}%0A%0A` +
      `Nama: ${order.nama}%0A` +
      `Alamat: ${order.alamat}%0A` +
      `Pembayaran: ${order.pembayaran}`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank");
  });
});
