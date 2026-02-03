import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import StarRating from '../components/atoms/Star/StarRating';

import 'swiper/css';
import 'swiper/css/pagination';
import "../styles/home.css";

/**
 * Composant interne pour l'affichage d'une carte d'avis unique.
 * Factorisé pour une meilleure lisibilité et maintenance.
 */
const TestimonialCard = ({ review }) => {
    const { userId, user, rating, content } = review;

    // Logique d'extraction du nom centralisée
    const username =
        userId?.username ||
        user?.username ||
        (typeof userId === 'string' ? "Utilisateur" : 'Utilisateur anonyme');

    return (
        <div className="testimonial-card">
            <h3 className="testimonial-name">{username}</h3>
            <div className="testimonial-rating-container">
                <StarRating
                    rating={rating || 0}
                    isReadOnly={true}
                    size={18}
                />
            </div>
            <p className="testimonial-text">
                "{content || 'Aucun commentaire'}"
            </p>
        </div>
    );
};

const Testimonials = ({ data, loading }) => {
    // Gestion des états vides ou de chargement (Guard Clauses)
    if (loading) return <div className="loader">Chargement des avis...</div>;
    if (!data?.length) return null;

    return (
        <section className="testimonials-wrapper">
            <h2 className="section-title">Avis des clients</h2>

            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="testimonial-swiper"
            >
                {data.map((item, index) => (
                    <SwiperSlide key={item.id || item._id || `testimonial-${index}`}>
                        <TestimonialCard review={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonials;