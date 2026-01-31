import "../../styles/about.css"

const AboutSplit = ({ data }) => {
    return (
        <section className="about-split-section">
            <div className="container about-split-container">
                <div className="about-split-image">
                    <img src={data.img} alt={data.name} />
                </div>

                <div className="about-split-content">
                    <h2 className="about-title">{data.title}</h2>
                    <div className="about-description">
                        {data.description.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSplit;