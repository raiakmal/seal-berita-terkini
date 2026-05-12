import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Fungsi format tanggal
function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// Helper encode
function encodeId(link) {
  return encodeURIComponent(btoa(link));
}

// Helper tampilkan kategori readable
function slugToReadable(slug) {
  if (!slug) return 'Nasional';
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function Rekomendasi() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    // Ambil daftar kategori dari API root
    fetch('https://berita-indo-api-next.vercel.app/api')
      .then((res) => res.json())
      .then((apiData) => {
        const categories = apiData?.data?.['CNN News']?.listType || ['nasional'];
        // Fetch berita per kategori
        return Promise.all(
          categories.map((cat) =>
            fetch(`https://berita-indo-api-next.vercel.app/api/cnn-news/${cat}`)
              .then((res) => res.json())
              .then((data) => (Array.isArray(data.data) ? data.data.slice(0, 8).map((item) => ({ ...item, _category: cat })) : []))
              .catch(() => []),
          ),
        );
      })
      .then((allNews) => {
        const flat = allNews.flat();
        for (let i = flat.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [flat[i], flat[j]] = [flat[j], flat[i]];
        }
        setNews(flat);
      });
  }, []);

  // Filter dan pagination
  const filtered = news.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const shown = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-6xl mx-auto mt-12 bg-white rounded-2xl p-8 shadow">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-1 h-7 bg-blue-400 rounded mr-3" />
          <h2 className="text-xl font-bold">Rekomendasi Untuk Anda</h2>
        </div>
        <input
          type="text"
          placeholder="Cari disini..."
          className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>
      {/* Grid Berita */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {shown.map((item) => (
          <Link to={`/berita/${encodeId(item.link)}`} key={item.link} className="flex flex-col hover:bg-gray-50 rounded-lg transition">
            <img src={item.image?.small || item.image?.large || ''} alt={item.title} className="rounded-lg w-full h-36 object-cover mb-3" />
            <div className="font-medium mb-1 line-clamp-2">{item.title}</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-400 font-medium">{slugToReadable(item._category || 'nasional')}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{formatDate(item.isoDate)}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between mt-10">
        <div className="text-sm text-gray-500">
          Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, total)} of {total} results
        </div>
        <div className="flex items-center gap-2">
          <button className={`px-3 py-1 rounded ${page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-400 hover:bg-blue-50'}`} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            &larr; Previous
          </button>
          {/* Nomor halaman */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((num) => num === 1 || num === totalPages || (num >= page - 1 && num <= page + 1))
            .map((num, idx, arr) => (
              <span key={num}>
                {idx > 0 && num - arr[idx - 1] > 1 && <span className="px-2">...</span>}
                <button className={`px-3 py-1 rounded ${page === num ? 'bg-blue-500 text-white' : 'text-blue-400 hover:bg-blue-50'}`} onClick={() => setPage(num)}>
                  {num}
                </button>
              </span>
            ))}
          <button
            className={`px-3 py-1 rounded ${page === totalPages || totalPages === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-400 hover:bg-blue-50'}`}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
