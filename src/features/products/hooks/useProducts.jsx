import { useState, useEffect } from 'react';
import ProductService from '../services/productService.js';
import { handle } from '../../../utils/promise.js';

const useProducts = (id = null) => {
    const [data, setData] = useState(id ? null : []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            // Sélection de la méthode de service
            const call = id
                ? ProductService.getProductById(id)
                : ProductService.getAllProducts();

            const [res, err] = await handle(call);

            if (err) {
                setError(err);
            } else {
                // Axios stocke la réponse dans .data
                // gère le cas où l'API renvoie { data: [...] } ou directement l'array
                const result = res.data?.data || res.data;
                setData(result);
            }

            setLoading(false);
        };

        fetchData();
    }, [id]);

    return { data, loading, error };
}

export default useProducts;