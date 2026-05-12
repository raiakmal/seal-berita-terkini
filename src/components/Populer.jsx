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

export default function Populer({ vertical }) {
  const [news, setNews] = useState([]);

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
              .then((data) => (Array.isArray(data.data) ? data.data.slice(0, 3).map((item) => ({ ...item, _category: cat })) : []))
              .catch(() => []),
          ),
        );
      })
      .then((allNews) => {
        const flat = allNews.flat();
        flat.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
        setNews(flat.slice(0, 3));
      });
  }, []);

  return (
    <div className={`bg-white rounded-2xl p-8 shadow ${vertical ? '' : 'max-w-6xl mx-auto mt-12'}`}>
      <div className="flex items-center mb-8">
        <div className="w-1 h-7 bg-blue-400 rounded mr-3" />
        <h2 className="text-xl font-bold">Berita Terpopuler</h2>
      </div>
      <div className={vertical ? 'flex flex-col gap-8' : 'flex flex-col md:flex-row gap-8'}>
        {news.map((item, idx) => (
          <Link to={`/berita/${encodeId(item.link)}`} key={item.link} className={vertical ? '' : 'flex-1'}>
            <div
              className={`flex items-start gap-4 border-b last:border-none border-gray-300 pb-6 mb-6 last:pb-0 last:mb-0 relative hover:bg-gray-50 rounded-lg transition ${vertical ? '' : 'md:border-r md:last:border-none md:pr-6 md:last:pr-0'}`}
            >
              {/* Nomor urut */}
              <div className="absolute -mt-3 z-10">
                <div className="bg-gray-800 text-white rounded-full w-7 h-7 flex items-center justify-center font-semibold text-sm shadow">{idx + 1}</div>
              </div>
              {/* Gambar */}
              <img src={item.image?.small || item.image?.large || ''} alt={item.title} className="rounded-lg w-24 h-20 object-cover ml-4" />
              {/* Konten */}
              <div>
                <div className="font-medium mb-1">{item.title}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-blue-400 font-medium">{slugToReadable(item._category || 'nasional')}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{formatDate(item.isoDate)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
