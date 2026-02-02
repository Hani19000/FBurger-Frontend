import "../../styles/home.css"
import { LinkButton } from "../../components/atoms/Button/Button.jsx";
import { motion } from "framer-motion";

const FeatureSplit = ({ data }) => {
    if (!data) return null;

    return (
        <section className="feature-split-section" style={{ overflowX: 'hidden' }}>
            <div className="container feature-split-container">

                {/* 2. L'image arrive de la GAUCHE (x: -100) */}
                <motion.div
                    className="feature-split-image"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }} // Se déclenche quand 30% est visible
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <img src={data.img} alt={data.name} />
                    <span className="image-label">{data.name}</span>
                </motion.div>

                {/* 3. Le texte arrive de la DROITE (x: 100) */}
                <motion.div
                    className="feature-split-content"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="section-title">{data.title}</h2>
                    <p className="feature-description">{data.description}</p>

                    <LinkButton
                        type="btn"
                        text={data.buttonText}
                        to="/menu"
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default FeatureSplit;