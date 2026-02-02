import "../../styles/about.css"
import { motion } from "framer-motion";

const AboutSplit = ({ data }) => {
    if (!data) return null;

    return (
        // 2. Ajout de l'overflow hidden pour éviter le scroll horizontal pendant l'anim
        <section className="about-split-section" style={{ overflowX: 'hidden' }}>
            <div className="container about-split-container">

                {/* 3. L'image arrive de la GAUCHE */}
                <motion.div
                    className="about-split-image"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <img src={data.img} alt={data.name} />
                </motion.div>

                {/* 4. Le contenu texte arrive de la DROITE */}
                <motion.div
                    className="about-split-content"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <h2 className="about-title">{data.title}</h2>

                    <div className="about-description">
                        {(data.text || "").split('\n\n').map((paragraph, index) => {
                            const paragraphKey = paragraph.substring(0, 20).replace(/\s/g, '-');
                            return <p key={`${paragraphKey}-${index}`}>{paragraph}</p>;
                        })}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

export default AboutSplit;