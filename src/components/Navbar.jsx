import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    fetch('https://berita-indo-api-next.vercel.app/api')
      .then((res) => res.json())
      .then((data) => {
        const cnnCategories = data?.data?.['CNN News']?.listType || [];
        setCategories(cnnCategories);
      })
      .catch((err) => {
        console.error('Gagal fetch kategori:', err);
        setCategories([]);
      });
  }, []);

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-blue-500 shadow' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-12 py-3">
        {/* Kiri: Logo */}
        <div className="flex items-center">
          <img src={scrolled ? '/logo-white.svg' : '/logo-blue.svg'} alt="Logo" className="h-10 w-auto" />
        </div>
        {/* Kanan: Menu */}
        <div className="flex space-x-6">
          <a href="#" className={`text-sm font-medium transition-colors ${scrolled ? 'text-white' : 'text-blue-400'}`}>
            Beranda
          </a>
          {categories.map((cat) => (
            <a key={cat} href={`#${cat}`} className={`text-sm font-medium transition-colors ${scrolled ? 'text-white hover:text-blue-200' : 'text-gray-500 hover:text-blue-400'}`}>
              {cat
                .split('-')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ')}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
