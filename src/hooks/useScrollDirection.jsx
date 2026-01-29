import { useState, useEffect } from 'react';

export const useNavbarScroll = (threshold = 800) => { // Seuil augmenté par défaut
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Si le scroll dépasse le seuil, on cache
            setIsHidden(window.scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isHidden;
};