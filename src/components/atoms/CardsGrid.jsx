import FeatureCard from "../atoms/FeatureCard";

const defaultImage = "/images/menu_home.webp";

function CardsGrid({ data = [], title, variant, isStatic }) {
    const productsList = Array.isArray(data) ? data : (data?.rows || []);

    return (
        <div className='container'>
            {title && <h2 className='section-title'>{title}</h2>}
            <div className={`features-grid ${isStatic ? 'home-grid' : ''} ${variant === 'menu' ? 'menu-grid' : ''}`}>
                {productsList.map((item) => (
                    <FeatureCard
                        key={item.id || item._id}
                        id={item.id || item._id}
                        price={item.prix || item.price}
                        name={item.name}
                        img={item.image_url || item.image || item.img || defaultImage}
                        variant={variant}
                        isStatic={isStatic}
                    />
                ))}
            </div>
        </div>
    );
}

export default CardsGrid;