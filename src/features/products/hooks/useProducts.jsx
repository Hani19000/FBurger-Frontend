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
            const call = id
                ? ProductService.getProductById(id)
                : ProductService.getAllProducts();
            const [res, err] = await handle(call);
            if (err) {
                setError(err);
            } else {
                setData(res || (id ? null : []));
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    return { data, loading, error };
}

export default useProducts;