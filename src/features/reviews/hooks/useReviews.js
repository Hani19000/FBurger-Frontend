import { useState, useEffect, useCallback } from 'react';
import { reviewService } from '../services/reviewService.js';
import { handle } from '../../../utils/promise';

export const useReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        const [res, err] = await handle(reviewService.getAll());
        if (!err) {
            setReviews(res.data?.data || res.data);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        //évite les fuites de mémoire
        let isMounted = true;

        const load = async () => {
            if (isMounted) await fetchReviews();
        };

        load();

        return () => {
            isMounted = false;
        };
    }, [fetchReviews]);

    return { reviews, loading, refresh: fetchReviews };
};