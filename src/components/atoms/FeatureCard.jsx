import { Link } from 'react-router-dom';

function FeatureCard({ id, name, price, img, variant, isStatic }) {
    const optimizedImg = img ? img.replace(/\.[^/.]+$/, ".webp") : "/images/default.webp";
    const cardContent = (
        <>
            {/* SEO: Cette image est là UNIQUEMENT pour les moteurs de recherche */}
            <img
                src={optimizedImg}
                alt={`${name} - Burger gourmet FBurger`}
                style={{ display: 'none' }}
            />
            <h3 className="card-name">{name}</h3>
            <p className="card-price">{price}€</p>
        </>
    );
    const cardClass = variant === 'menu' ? 'feature-card menu-card-style' : 'feature-card';
    const cardStyle = {
        backgroundImage: `url(${optimizedImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    const CardBase = (
        <div className={cardClass} style={cardStyle}>
            {cardContent}
        </div>
    );

    if (isStatic) return CardBase;

    return (
        <Link to={`/product/${id}`} className="card-link">
            <div className={cardClass} style={cardStyle}>
                {cardContent}
            </div>
        </Link>
    );
}

export default FeatureCard;