import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
function encodeId(link) {
  return encodeURIComponent(btoa(link));
}

export default function Headline() {
  const [headlines, setHeadlines] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://berita-indo-api-next.vercel.app/api/cnn-news/olahraga')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data) && data.data.length > 0) {
          setHeadlines(data.data.slice(0, 5));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || headlines.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl flex flex-col md:flex-row items-center gap-8 p-8 shadow">
        <div className="flex-1 h-64 bg-gray-100 animate-pulse rounded-2xl" />
        <div className="flex-1 h-64 bg-gray-100 animate-pulse rounded-2xl" />
      </div>
    );
  }

  const headline = headlines[current];

  return (
    <div className="max-w-6xl mx-auto mt-20 bg-white rounded-2xl flex flex-col md:flex-row items-center gap-8 p-8 shadow relative">
      {/* Kiri */}
      <div className="flex-1">
        <div className="text-gray-500 font-medium mb-2">Headline</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">{headline.title}</h1>
        <p className="text-gray-600 mb-4">{headline.contentSnippet}</p>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {formatDate(headline.isoDate)}
        </div>
        <Link to={`/berita/${encodeId(headline.link)}`} className="text-blue-400 font-medium flex items-center gap-1 hover:underline">
          Baca Selengkapnya
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
      {/* Kanan */}
      <div className="flex-1 flex justify-center">
        <img src={headline.image?.large || headline.image?.small || ''} alt={headline.title} className="rounded-2xl object-cover w-full max-w-md h-64" />
      </div>
      {/* Pagination */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-4 mt-8">
        <button className={`text-gray-400 hover:text-blue-600 ${current === 0 ? 'cursor-not-allowed' : ''}`} onClick={() => setCurrent((idx) => Math.max(0, idx - 1))} disabled={current === 0}>
          &lt;
        </button>
        <span className="text-gray-600">
          {current + 1} <span className="mx-1">dari</span> {headlines.length}
        </span>
        <button
          className={`text-gray-400 hover:text-blue-600 ${current === headlines.length - 1 ? 'cursor-not-allowed' : ''}`}
          onClick={() => setCurrent((idx) => Math.min(headlines.length - 1, idx + 1))}
          disabled={current === headlines.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
