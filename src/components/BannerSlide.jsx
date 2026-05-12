import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faStar, faCircle } from '@fortawesome/free-solid-svg-icons';

const slides = [
  {
    title: 'Jelajahi Sejarah dan Budaya Kota Malang',
    desc: 'Kunjungi tempat bersejarah dan nikmati kekayaan budaya Malang.',
    images: [
      { src: './musium-brawijaya.jpg', label: 'Musium Brawijaya' },
      { src: './kayoetangan.jpg', label: 'Kayuoetangan' },
      { src: './kebun-binatang.jpg', label: 'Kebun Binatang' },
    ],
    bg: 'bg-green-400',
  },
  {
    title: 'Petualangan Edukatif bersama Malang Mbois City Tour!',
    desc: 'Petualangan Edukatif bersama Malang Mbois City Tour!',
    images: [
      { src: './musium-brawijaya.jpg', label: 'Musium Brawijaya' },
      { src: './kayoetangan.jpg', label: 'Kayoetangan' },
      { src: './kebun-binatang.jpg', label: 'Kebun Binatang' },
    ],
    bg: 'bg-teal-400',
  },
  {
    title: 'Wisata Alam dan Kuliner Khas Malang',
    desc: 'Rasakan keindahan alam dan nikmati kuliner khas Malang.',
    images: [
      { src: './musium-brawijaya.jpg', label: 'Musium Brawijaya' },
      { src: './kayoetangan.jpg', label: 'Kayoetangan' },
      { src: './kebun-binatang.jpg', label: 'Kebun Binatang' },
    ],
    bg: 'bg-orange-300',
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef();

  // Auto-slide effect
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="w-full flex flex-col items-center mt-12">
      <div className={`w-full max-w-6xl rounded-2xl p-8 flex items-center relative overflow-hidden transition-all duration-700 ${slides[current].bg}`} key={current}>
        {/* Ornamen SVG Garis */}
        <svg className="absolute left-10 top-10 opacity-30 pointer-events-none" width="100" height="60" fill="none">
          <path d="M0 50 Q50 0 100 50" stroke="#fff" strokeDasharray="6 6" strokeWidth="2" />
        </svg>
        {/* Ornamen Font Awesome */}
        <FontAwesomeIcon icon={faPaperPlane} className="absolute right-10 top-6 text-white opacity-60 text-4xl pointer-events-none" />
        <FontAwesomeIcon icon={faStar} className="absolute right-64 bottom-2 text-yellow-200 opacity-60 text-2xl pointer-events-none animate-bounce" />
        <FontAwesomeIcon icon={faCircle} className="absolute right-24 bottom-12 text-white opacity-30 text-lg pointer-events-none" />
        {/* Ornamen SVG Dots */}
        <svg className="absolute right-32 bottom-6 opacity-40 pointer-events-none" width="40" height="10" fill="none">
          <circle cx="5" cy="5" r="3" fill="#fff" />
          <circle cx="20" cy="5" r="2" fill="#fff" />
          <circle cx="35" cy="5" r="1.5" fill="#fff" />
        </svg>
        {/* Kiri: Teks */}
        <div className="flex-1 text-white z-10 transition-all duration-700">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-snug">{slides[current].title}</h2>
          <p className="mb-4">{slides[current].desc}</p>
        </div>
        {/* Kanan: Gambar */}
        <div className="flex-1 flex justify-center items-center gap-2 relative transition-all duration-700">
          <div className="flex gap-4">
            {slides[current].images.map((img, idx) => (
              <div key={img.label} className="flex flex-col items-center">
                <img src={img.src} alt={img.label} className={`rounded-lg shadow-lg w-32 h-24 object-cover mb-1 ${idx === 1 ? 'rotate-8 -mt-4' : idx === 2 ? '-rotate-4 mt-4' : ''}`} style={{ border: '3px solid #fff' }} />
                <span className="bg-white text-gray-700 text-xs px-2 py-0.5 rounded shadow">{img.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Indikator bulat */}
      <div className="flex gap-2 mt-4">
        {slides.map((_, idx) => (
          <button key={idx} className={`w-2 h-2 rounded-full ${current === idx ? 'bg-blue-400' : 'bg-gray-300'}`} onClick={() => setCurrent(idx)} aria-label={`Go to slide ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
}
