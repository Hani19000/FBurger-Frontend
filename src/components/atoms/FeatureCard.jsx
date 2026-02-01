import { Link } from 'react-router-dom';

function FeatureCard({ product, variant, isStatic }) {
    if (!product) return null;

    const { id, name, prix, price, image_url, img, image } = product;
    const Price = prix || price;
    const Img = image_url || img || image;

    const optimizedImg = Img
        ? Img.replace(/\.[^/.]+$/, ".webp")
        : "/images/default.webp";

    const cardClass = variant === 'menu' ? 'feature-card menu-card-style' : 'feature-card';

    // On définit le style ici
    const cardStyle = { backgroundImage: `url(${optimizedImg})` };


    if (isStatic) {
        return (
            <div className={cardClass} style={cardStyle}>
                <h3 className="card-name">{name}</h3>
                <p className="card-price">{Price}€</p>
            </div>
        );
    }

    return (
        <Link
            to={`/product/${id}`}
            className={`${cardClass} card-link`}
            style={cardStyle}
        >
            <h3 className="card-name">{name}</h3>
            <p className="card-price">{Price}€</p>
        </Link>
    );
}

export default FeatureCard;