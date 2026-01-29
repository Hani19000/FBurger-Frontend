import { Link } from 'react-router-dom';

function FeatureCard({ id, name, price, img, variant, isStatic }) {
    const optimizedImg = img ? img.replace(/\.[^/.]+$/, ".webp") : "/images/default.webp";
    const cardContent = (
        <>
            <h3 className="card-name">{name}</h3>
            <p className="card-price">{price}€</p>
        </>
    );
    const cardClass = variant === 'menu' ? 'feature-card menu-card-style' : 'feature-card';
    const cardStyle = {
        backgroundImage: `url(${optimizedImg})`,
    };

    if (isStatic) {
        return (
            <div className={cardClass} style={cardStyle}>
                {cardContent}
            </div>
        );
    }

    return (
        <Link to={`/product/${id}`} className="card-link">
            <div className={cardClass} style={cardStyle}>
                {cardContent}
            </div>
        </Link>
    );
}

export default FeatureCard;