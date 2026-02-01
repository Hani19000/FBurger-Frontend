import FeatureCard from "../atoms/FeatureCard";

function CardsGrid({ data = [], title, variant, isStatic }) {

    let productsList = [];
    if (Array.isArray(data)) {
        productsList = data;
    } else if (data?.rows) {
        productsList = data.rows;
    }

    // Construction de classe propre (Pattern "classNames")
    const getGridClasses = () => {
        const Classes = ['features-grid'];
        if (isStatic) Classes.push('home-grid');
        if (variant === 'menu') Classes.push('menu-grid');
        return Classes.join(' ');
    }

    return (
        <section className='container'>
            {title && <h2 className='section-title'>{title}</h2>}
            <div className={getGridClasses()}>
                {productsList.map((item, index) => {
                    const itemKey = item.id || item._id || `product-${index}`;
                    <FeatureCard
                        key={itemKey}
                        product={item}
                        variant={variant}
                        isStatic={isStatic}
                    />
                })}
            </div>
        </section>
    );
}

export default CardsGrid;