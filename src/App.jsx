import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DetailBerita from './pages/DetailBerita';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/berita/:id" element={<DetailBerita />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
