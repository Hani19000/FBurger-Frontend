import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import StarRating from '../components/atoms/Star/StarRating';

import 'swiper/css';
import 'swiper/css/pagination';
import "../styles/home.css";

const Testimonials = ({ data, loading }) => {
    if (loading) return <div className="loader">Chargement des avis...</div>;
    if (!data || data.length === 0) return null;

    return (
        <div className="testimonials-wrapper">
            <h2 className="section-title" style={{ color: '#454545' }}>Avis des clients</h2>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className="testimonial-swiper"
            >
                {data.map((item, index) => {
                    const key = item.id || item._id || `testimonial-${index}`;
                    const username = item.userId?.username || 'Utilisateur anonyme';

                    return (
                        <SwiperSlide key={key}>
                            <div className="testimonial-card">
                                <h3 className="testimonial-name">{username}</h3>
                                <div style={{ marginBottom: '15px' }}>
                                    <StarRating
                                        rating={item.rating || 0}
                                        isReadOnly={true}
                                        size={18}
                                    />
                                </div>
                                <p className="testimonial-text">"{item.content || 'Aucun commentaire'}"</p>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default Testimonials;