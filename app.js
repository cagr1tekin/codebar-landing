// Workers API'den en güncel versiyon + indirme linkini çek
const WORKERS_BASE = 'https://codebar-worker.codebar-bsr.workers.dev';
const FALLBACK_URL = 'https://pub-356e7b561efe4d99b4db51c11f2fb7e9.r2.dev/CodeBar%20V2%20Setup%200.0.2.exe';
const FALLBACK_VERSION = '0.0.2';

async function loadLatestVersion() {
  try {
    const res = await fetch(`${WORKERS_BASE}/latest`, { cache: 'no-cache' });
    if (!res.ok) throw new Error('latest alınamadı');
    const json = await res.json();
    if (!json.success || !json.version) throw new Error('geçersiz yanıt');

    document.querySelectorAll('#latest-version, .dl-version').forEach((el) => {
      el.textContent = json.version;
    });
    document.querySelectorAll('#download-btn, #download-btn-2').forEach((el) => {
      el.href = json.downloadUrl;
    });
  } catch {
    // Hata olursa fallback değerleri koru
    document.querySelectorAll('#download-btn, #download-btn-2').forEach((el) => {
      el.href = FALLBACK_URL;
    });
  }
}

loadLatestVersion();
