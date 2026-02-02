import { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, setRating, isReadOnly = false, size = 20 }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex gap-1" style={{ display: 'flex', gap: '4px' }}>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                // Logique : Si on survole ou si c'est sélectionné -> Jaune, sinon Gris
                const isFilled = (hover || rating) >= starValue;

                return (
                    <button
                        type="button"
                        key={index}
                        // On désactive le curseur main si c'est en lecture seule
                        style={{
                            background: "none",
                            border: "none",
                            cursor: isReadOnly ? "default" : "pointer",
                            padding: 0
                        }}
                        onClick={() => !isReadOnly && setRating(starValue)}
                        onMouseEnter={() => !isReadOnly && setHover(starValue)}
                        onMouseLeave={() => !isReadOnly && setHover(0)}
                        disabled={isReadOnly}
                        aria-label={`${starValue} étoiles`}
                    >
                        <Star
                            size={size}
                            fill={isFilled ? "var(--color-black)" : "transparent"}
                            color={isFilled ? "var(--color-black)" : "var(--color-gray)"}
                            strokeWidth={1.5}
                        />
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;