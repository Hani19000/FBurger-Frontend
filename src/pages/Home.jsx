import '../styles/home.css'
import CardsGrid from "../components/atoms/CardsGrid.jsx";
import HeroSection from '../components/molecules/HeroSection.jsx'
import { Data } from '../config/DataHeroSection.jsx'
import FeatureSplit from '../components/molecules/FeatureSplit.jsx';
import { featuredProduct } from '../config/featuresData.jsx';
import Testimonials from '../components/layout/Testimonials.jsx'
import { testimonialsData } from '../config/testimonialsData.jsx';

const cardData = [
  { id: 1, name: "Burger Cramé", price: "10.00", image: "/images/card1.webp" },
  { id: 2, name: "Frites Bacon", price: "10.00", image: "/images/card2.webp" },
  { id: 3, name: "Wings", price: "10.00", image: "/images/card3.webp" },
];

function Home() {
  // cette constance recupere la donnée id:1 pour l'accueil
  const heroContent = Data.find(item => item.id === 1);

  return (
    <>
      <HeroSection {...heroContent} />
      <section className='features-section'>
        <CardsGrid data={cardData} title="Notre meilleure sélection..." isStatic={true} />
      </section>

      <FeatureSplit data={featuredProduct} />

      <Testimonials data={testimonialsData} />

    </>
  )
}

export default Home