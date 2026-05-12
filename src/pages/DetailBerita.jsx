import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CommentSection from '../components/CommentSection';
import BeritaTerkait from '../components/BeritaTerkait';
import Populer from '../components/Populer';

const CATEGORY_LIST = ['nasional', 'internasional', 'ekonomi', 'olahraga', 'teknologi', 'hiburan', 'gaya-hidup'];

function slugToReadable(slug) {
  if (!slug) return 'Nasional';
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function normalizeCategory(str) {
  if (!str) return 'nasional';
  const lower = str.toLowerCase().replace(/\s+/g, '-');
  const found = CATEGORY_LIST.find((cat) => cat === lower);
  return found || 'nasional';
}

function decodeId(id) {
  return atob(decodeURIComponent(id));
}

export default function DetailBerita() {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);

  useEffect(() => {
    const link = decodeId(id);

    fetch('https://berita-indo-api-next.vercel.app/api')
      .then((res) => res.json())
      .then((apiData) => {
        const categories = apiData?.data?.['CNN News']?.listType || [];
        return Promise.all(
          categories.map((cat) =>
            fetch(`https://berita-indo-api-next.vercel.app/api/cnn-news/${cat}`)
              .then((res) => res.json())
              .then((data) => data.data || [])
              .catch(() => []),
          ),
        );
      })
      .then((allNews) => {
        let found = null;
        let foundCategory = null;
        allNews.forEach((newsArr, idx) => {
          const match = newsArr.find((item) => item.link === link);
          if (match && !found) {
            found = match;
            foundCategory = CATEGORY_LIST[idx];
          }
        });
        if (found) {
          if (!found.category) found.category = foundCategory;
        }
        setBerita(found || null);
      })
      .catch(() => setBerita(null));
  }, [id]);

  if (!berita) return <div className="max-w-6xl mx-auto py-20 text-center">Loading...</div>;

  const categorySlug = normalizeCategory(berita.category);
  const categoryReadable = slugToReadable(categorySlug);

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <Breadcrumb category={categoryReadable} title={berita.title} />
        {/* Judul */}
        <h1 className="text-2xl md:text-3xl font-bold mt-10 mb-4">{berita.title}</h1>
        {/* Kategori & tanggal */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-blue-500 font-semibold text-sm capitalize">{categoryReadable}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 text-sm">{new Date(berita.isoDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
        {/* Gambar utama */}
        <div className="mb-2">
          <img src={berita.image?.large || berita.image?.small || ''} alt={berita.title} className="w-full rounded-lg mb-12 max-h-100 object-cover" />
          {berita.description && <div className="text-xs text-gray-500">{berita.description}</div>}
        </div>
        {/* Isi berita */}
        <div className="prose max-w-none mb-20 text-gray-600">{berita.contentSnippet || berita.content}</div>
        <CommentSection beritaId={id} />
        <div className="mt-12">
          <BeritaTerkait currentLink={berita.link} category={categorySlug} categoryLabel={categoryReadable} />
        </div>
      </div>
      {/* Sidebar */}
      <aside className="w-full md:w-100 shrink-0">
        <Populer vertical />
      </aside>
    </div>
  );
}
