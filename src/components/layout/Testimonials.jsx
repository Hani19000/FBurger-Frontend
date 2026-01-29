import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';


// Import des styles Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import "../../styles/home.css";

const Testimonials = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <section className="testimonials-section" style={{ backgroundImage: `url(/images/texture2.webp)`, }}>
            <div className="container">
                <h2 className="section-title">Avis des clients</h2>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    className="testimonial-swiper"
                >
                    {data.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="testimonial-card">
                                <div className="testimonial-avatar">
                                    <img src={item.avatar} alt={item.name} />
                                </div>
                                <h3 className="testimonial-name">{item.name}</h3>
                                <p className="testimonial-text">"{item.text}"</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;