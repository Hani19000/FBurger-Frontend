import { useReviews } from '../features/reviews/hooks/useReviews';
import '../styles/review.css';
import { Data } from '../Data/DataHeroSection.jsx'
import HeroSection from '../components/molecules/HeroSection.jsx'
import ReviewForm from '../features/reviews/components/ReviewForm.jsx';
import SEO from '../components/atoms/SEO.jsx';


const Review = () => {
    const heroContent = Data.find(item => item.id === 5);
    const { submitReview } = useReviews();

    return (
        <div className="review-page-wrapper">

            <SEO
                title="Avis Clients - Votre expérience FBurger"
                description="Découvrez les témoignages de nos clients et partagez votre avis sur nos burgers artisanaux. Votre satisfaction est notre priorité."
                path="/review"
            />

            <HeroSection {...heroContent} />

            <section className="review-post-section">
                <ReviewForm onSubmit={submitReview} />
            </section>

        </div>
    );
};

export default Review;