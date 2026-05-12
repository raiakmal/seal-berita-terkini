import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function encodeId(link) {
  return encodeURIComponent(btoa(link));
}

export default function BeritaTerkait({ currentLink, category, categoryLabel }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (!category) return;
    fetch(`https://berita-indo-api-next.vercel.app/api/cnn-news/${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setNews(data.data.filter((item) => item.link !== currentLink).slice(0, 3));
        }
      });
  }, [currentLink, category]);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg flex items-center border-l-4 border-blue-500 pl-2">Berita Terkait</h3>
        <Link to="/" className="text-blue-500 border border-blue-500 px-4 py-1 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {news.map((item) => (
          <Link to={`/berita/${encodeId(item.link)}`} key={item.link} className="block bg-white rounded-xl border border-gray-200 hover:shadow-lg transition p-3">
            <img src={item.image?.small || item.image?.large || ''} alt={item.title} className="rounded-lg w-full h-32 object-cover mb-3" />
            <div className="font-medium text-sm line-clamp-2 mb-2">{item.title}</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-blue-500 font-medium capitalize">{categoryLabel}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">
                {new Date(item.isoDate).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
