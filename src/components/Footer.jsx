import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://berita-indo-api-next.vercel.app/api')
      .then((res) => res.json())
      .then((data) => {
        const cnnCategories = data?.data?.['CNN News']?.listType || [];
        setCategories(cnnCategories);
      })
      .catch(() => setCategories([]));
  }, []);

  return (
    <footer className="bg-[#2C3A4B] text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 px-12">
        {/* Kiri: Logo dan Sosial */}
        <div className="flex-1 min-w-50 flex flex-col items-center md:items-start">
          <div className="flex items-center mb-3">
            <img src="/logo-white.svg" alt="Logo" />
          </div>
          <div className="text-xs text-gray-300 mb-6">&copy; 2023 Berita Kini. All Rights Reserved.</div>
          <div className="mb-2 font-medium">Ikuti Kami</div>
          <div className="flex gap-3">
            <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-2">
              <FontAwesomeIcon icon={faYoutube} className="text-xl" />
            </a>
            <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-2">
              <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            </a>
            <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-2">
              <FontAwesomeIcon icon={faFacebook} className="text-xl" />
            </a>
          </div>
        </div>
        {/* Tengah: Menu */}
        <div className="flex-1 flex flex-col sm:flex-row gap-16 items-center md:items-start">
          <div>
            <div className="font-medium mb-2">Telusuri</div>
            <ul className="space-y-1 text-sm text-gray-200">
              <li>
                <a href="#">Beranda</a>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <a href={`#${cat}`}>
                    {cat
                      .split('-')
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ')}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-medium mb-2">Bantuan</div>
            <ul className="space-y-1 text-sm text-gray-200">
              <li>
                <a href="#">Kontak Kami</a>
              </li>
              <li>
                <a href="#">Laporan Pembajakan</a>
              </li>
              <li>
                <a href="#">Kebijakan</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Kanan: Subscribe */}
        <div className="flex-1 min-w-55 flex flex-col">
          <div className="font-medium mb-2">Berlangganan Berita Terbaru</div>
          <form className="relative w-full max-w-xs">
            <input type="email" placeholder="Masukan email" className="w-full py-3 px-4 pr-12 rounded-lg text-gray-800 focus:outline-none bg-white placeholder:text-gray-400" />
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-blue-400 hover:bg-blue-500 p-2 rounded-lg flex items-center justify-center"
              style={{ height: '2.5rem', width: '2.5rem' }} // Optional: biar tombolnya kotak
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
