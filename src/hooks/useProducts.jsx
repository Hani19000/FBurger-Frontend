import { useState, useEffect } from 'react';
import ProductService from '../services/productService';

const useProducts = (id = null) => {
    const [data, setData] = useState(id ? null : []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = id
                    ? await ProductService.getProductById(id)
                    : await ProductService.getAllProducts();
                setData(result);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    return { data, loading };
};
export default useProducts