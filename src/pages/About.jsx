import '../styles/home.css'
import HeroSection from '../components/molecules/HeroSection.jsx'
import { Data } from '../Data/DataHeroSection.jsx'
import AboutSplit from '../components/molecules/AboutSplit.jsx';
import { aboutData } from '../Data/AboutData.jsx';
import SEO from '../components/atoms/SEO.jsx';

function About() {
    const HeroContent = Data.find(item => item.id === 4);

    return (
        <>
            <SEO
                title="Notre Histoire & Nos Engagements"
                description="Découvrez l'origine de FBurger. Notre mission : vous offrir le meilleur du burger artisanal avec des produits frais, locaux et une passion pour le goût."
                path="/about"
            />

            <HeroSection {...HeroContent} />
            <AboutSplit data={aboutData} />

        </>
    )
}

export default About