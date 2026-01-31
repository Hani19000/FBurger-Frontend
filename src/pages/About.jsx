import '../styles/home.css'
import HeroSection from '../components/molecules/HeroSection.jsx'
import { Data } from '../Data/DataHeroSection.jsx'
import AboutSplit from '../components/molecules/AboutSplit.jsx';
import { aboutData } from '../Data/AboutData.jsx';

function About() {
    const heroContent = Data.find(item => item.id === 4);

    return (
        <>
            <HeroSection {...heroContent} />
            <AboutSplit data={aboutData} />

        </>
    )
}

export default About