import { useState, useEffect, useRef } from 'react';

export const useNavbarScroll = (threshold = 100) => {
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // 1. Si l'utilisateur est tout en haut, on affiche toujours
            if (currentScrollY < threshold) {
                setIsHidden(false);
            }
            // 2. Si l'utilisateur descend et qu'il'a passé le seuil
            else if (currentScrollY > lastScrollY.current && currentScrollY > threshold) {
                setIsHidden(true);
            }
            // 3. Si l'utilisateur  remonte, on réaffiche immédiatement
            else if (currentScrollY < lastScrollY.current) {
                setIsHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isHidden;
};