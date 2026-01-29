import { useState } from 'react';
import HeroSection from '../components/molecules/HeroSection';
import FilterBar from '../components/molecules/FilterBar';
import CardsGrid from "../components/atoms/CardsGrid";
import { Data } from '../config/DataHeroSection';
import "../styles/menu.css";
import { useEffect } from 'react';
import ProductService from "../services/productService";

function Menu() {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Tout');

  const heroData = Data.find(item => item.id === 2);

  useEffect(() => {
    const loadData = async () => {
      const data = await ProductService.getAllProducts();
      setProducts(data);
    };
    loadData();
  }, []);

  const displayProducts = activeFilter === 'Tout'
    ? products
    : products.filter(p => p.categorie === activeFilter);

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