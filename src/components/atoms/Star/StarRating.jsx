import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, setRating, isReadOnly = false, size = 20 }) => {
    const [hover] = useState(0);
    const getStarColor = (isFilled) => isFilled ? "var(--color-black)" : "transparent";
    const getStrokeColor = (isFilled) => isFilled ? "var(--color-black)" : "var(--color-gray)";
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
                        className="star-button"
                        style={{ cursor: isReadOnly ? 'default' : 'pointer' }} // Garder le minimum en inline
                        onClick={() => !isReadOnly && setRating(starValue)}
                        disabled={isReadOnly}
                    >
                        <Star
                            size={size}
                            fill={getStarColor(isFilled)}
                            color={getStrokeColor(isFilled)}
                        />
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;