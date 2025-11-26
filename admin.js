document.addEventListener('DOMContentLoaded', () => {
  const key = 'kemasinaja_orders_v1';
  const ordersEl = document.getElementById('orders');
  const clearBtn = document.getElementById('clearAll');

  function loadOrders() {
    ordersEl.innerHTML = '';
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    if (!arr.length) {
      ordersEl.innerHTML = '<p>Tidak ada pesanan.</p>';
      return;
    }
    arr.forEach((o, idx) => {
      const el = document.createElement('div');
      el.className = 'order';
      el.innerHTML = `
        <div class="meta"><span class="badge">#${arr.length - idx}</span> &nbsp; ${new Date(o.tanggal).toLocaleString()}</div>
        <div><strong>${o.produk} — ${o.varian}</strong></div>
        <div>Jumlah: ${o.jumlah} pcs</div>
        <div>Harga Total: Rp ${o.hargaTotal.toLocaleString('id-ID')}</div>
        <div>Nama: ${o.nama}</div>
        <div>Alamat: ${o.alamat}</div>
        <div>Metode: ${o.pembayaran}</div>
      `;
      ordersEl.appendChild(el);
    });
  }

  clearBtn.addEventListener('click', () => {
    if (!confirm('Hapus semua pesanan lokal?')) return;
    localStorage.removeItem(key);
    loadOrders();
  });

  loadOrders();
});
