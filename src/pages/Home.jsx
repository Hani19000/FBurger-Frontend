import '../styles/home.css'
import CardsGrid from "../components/atoms/CardsGrid.jsx";
import HeroSection from '../components/molecules/HeroSection.jsx'
import { Data } from '../Data/DataHeroSection.jsx'
import FeatureSplit from '../components/molecules/FeatureSplit.jsx';
import { featuredProduct } from '../Data/featuresData.jsx';
import Testimonials from './Testimonials.jsx'
import { useReviews } from '../features/reviews/hooks/useReviews.js';
import ReviewForm from '../features/reviews/components/ReviewForm.jsx';

const cardData = [
  { id: 1, name: "Burger Cramé", price: "10.00", image: "/images/card1.webp" },
  { id: 2, name: "Frites Bacon", price: "10.00", image: "/images/card2.webp" },
  { id: 3, name: "Wings", price: "10.00", image: "/images/card3.webp" },
];

function Home() {
  const { reviews, loading, submitReview } = useReviews();
  // cette constance recupere la donnée id:1 pour l'accueil
  const heroContent = Data.find(item => item.id === 1);

  return (
    <>
      <HeroSection {...heroContent} />
      <section className='features-section'>
        <CardsGrid data={cardData} title="Notre meilleure sélection" isStatic={true} />
      </section>

      <FeatureSplit
        data={featuredProduct}
        showButton={true}
        showLabel={true}
      />

      <section className="testimonials-section">
        <div className="container">
          <Testimonials data={reviews} loading={loading} />
          <ReviewForm onSubmit={submitReview} />
        </div>
      </section>

    </>
  )
}

export default Home