import "../../styles/home.css"
import Button from "../../components/atoms/Button/Button.jsx";

const FeatureSplit = ({ data }) => {
    return (
        <section className="feature-split-section" >
            <div className="container feature-split-container">
                <div className="feature-split-image">
                    <img src={data.img} alt={data.name} />
                    <span className="image-label">{data.name}</span>
                </div>

                <div className="feature-split-content">
                    <h2 className="section-title">{data.title}</h2>
                    <p className="feature-description">{data.description}</p>
                    <Button
                        type="btn"
                        text={data.buttonText}
                        to="/menu"
                    />
                </div>
            </div>
        </section>
    );
};

export default FeatureSplit