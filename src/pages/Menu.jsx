import { useState } from 'react';
import HeroSection from '../components/molecules/HeroSection';
import FilterBar from '../components/molecules/FilterBar';
import CardsGrid from "../components/atoms/CardsGrid";
import { Data } from '../Data/DataHeroSection';
import "../styles/menu.css";
import { useEffect } from 'react';
import ProductService from "../features/products/services/productService";
import { handle } from '../utils/promise';

function Menu() {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Tout');
  const heroData = Data.find(item => item.id === 2);
  useEffect(() => {
    const loadData = async () => {
      // 1. helper handle pour capturer les erreurs proprement
      const [res, error] = await handle(ProductService.getAllProducts());

      if (error) {
        console.error("Erreur lors du chargement:", error);
        return;
      }

      // 2. Les données sont dans res.data
      // Si l'API renvoie { data: [...] }, utilise res.data.data
      const rawData = res.data?.data || res.data;

      // Sécurité : s'assurer que c'est un tableau
      setProducts(Array.isArray(rawData) ? rawData : []);
    };
    loadData();
  }, []);

  const displayProducts = activeFilter === 'Tout'
    ? products
    : products.filter(product => product.categorie === activeFilter);

  return (
    <main className="menu-page">
      <HeroSection {...heroData} />
      <section className="menu-section">
        <FilterBar currentFilter={activeFilter} onFilterChange={setActiveFilter} />

        <CardsGrid data={displayProducts} variant="menu" />

      </section>
    </main>
  );
}

export default Menu