import { useState } from 'react';
import HeroSection from '../components/molecules/HeroSection.jsx';
import FilterBar from '../components/molecules/FilterBar.jsx';
import CardsGrid from "../components/atoms/CardsGrid.jsx";
import { Data } from '../Data/DataHeroSection.jsx';
import "../styles/menu.css";
import { useEffect } from 'react';
import ProductService from "../features/products/services/productService.js";
import { handle } from '../utils/promise.js';
import SEO from '../components/atoms/SEO.jsx';


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
      {/* SEO Dynamique : On change la description si un filtre est actif  pour montrer aux moteurs de recherche que la page est pertinente.*/}
      <SEO
        title={activeFilter === 'Tout' ? "Notre Carte" : `Nos ${activeFilter}s`}
        description={`Découvrez notre sélection de ${activeFilter === 'Tout' ? 'burgers, frites et boissons' : activeFilter.toLowerCase()} artisanaux. Ingrédients de qualité et recettes exclusives.`}
        path="/menu"
      />
      <HeroSection {...heroData} />
      <section className="menu-section">
        <FilterBar currentFilter={activeFilter} onFilterChange={setActiveFilter} />

        <CardsGrid data={displayProducts} variant="menu" />

      </section>
    </main>
  );
}

export default Menu