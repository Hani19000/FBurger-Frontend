import { useReviews } from '../features/reviews/hooks/useReviews';
import '../styles/review.css';
import { Data } from '../Data/DataHeroSection.jsx'
import HeroSection from '../components/molecules/HeroSection.jsx'
import ReviewForm from '../features/reviews/components/ReviewForm.jsx';

const Review = () => {
    const heroContent = Data.find(item => item.id === 5);
    const { submitReview } = useReviews();

    return (
        <div className="review-page-wrapper">
            <HeroSection {...heroContent} />

            <section className="review-post-section">
                <ReviewForm onSubmit={submitReview} />
            </section>

        </div>
    );
};

export default Review;