import BannerSlider from '../components/BannerSlide';
import Headline from '../components/Headline';
import Populer from '../components/Populer';
import Rekomendasi from '../components/Rekomendasi';

export default function Home() {
  return (
    <main className="mx-auto p-4">
      <Headline />
      <Populer />
      <Rekomendasi />
      <BannerSlider />
    </main>
  );
}
