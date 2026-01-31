import "../../styles/hero.css"

function HeroSection({ title, subtitle, img, children, isLight = false }) {
    const sectionStyle = {
        position: 'relative',
        backgroundImage: img ? `url('${img}')` : 'none',
        backgroundColor: '#e9e6c3',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '500px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    };

    return (
        <section className="hero-section" style={sectionStyle}>
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: isLight ? 'transparent' : 'rgba(0,0,0,0.4)',
                zIndex: 1
            }}></div>

            <div className="hero-content" style={{ zIndex: 2 }}>
                <h1 className="hero-title">
                    {title}
                </h1>
                <p className="hero-subtitle">
                    {subtitle}
                </p>
                {children}
            </div>
        </section>
    );
}

export default HeroSection;