import '../styles/home.css'
import CardsGrid from "../components/atoms/CardsGrid.jsx"
import HeroSection from '../components/molecules/HeroSection.jsx'
import { Data } from '../Data/DataHeroSection.jsx'
import FeatureSplit from '../components/molecules/FeatureSplit.jsx'
import { featuredProduct } from '../Data/featuresData.jsx'
import Testimonials from './Testimonials.jsx'
import { useReviews } from '../features/reviews/hooks/useReviews.js'
import ReviewForm from '../features/reviews/components/ReviewForm.jsx'
import { cardData } from '../Data/CardHomeData.jsx'
import SEO from '../components/atoms/SEO.jsx'
import { AnimatedSection } from '../components/atoms/AnimatedSection.jsx'

function Home() {
  const { reviews, loading, submitReview } = useReviews();
  // cette constance recupere la donnée id:1 pour l'accueil
  const HeroContent = Data.find(item => item.id === 1);

  return (
    <>
      <SEO
        title="Burgers Artisanaux & Ingrédients Frais"
        description="Bienvenue chez FBurger. Goûtez nos burgers gourmets cuisinés avec passion, nos frites maison et découvrez une expérience culinaire unique."
        path="/"
      />

      <HeroSection {...HeroContent} />

      <AnimatedSection delay={0.5}>
        <section className='features-section'>
          <CardsGrid data={cardData} title="Notre meilleure sélection" isStatic={true} />
        </section>
      </AnimatedSection>

      <FeatureSplit
        data={featuredProduct}
        showButton={true}
        showLabel={true}
      />

      <AnimatedSection delay={0.3}>
        <section className="testimonials-section">
          <div className="container">
            <Testimonials data={reviews} loading={loading} />
            <ReviewForm onSubmit={submitReview} />
          </div>
        </section>
      </AnimatedSection>
    </>
  )
}

export default Home