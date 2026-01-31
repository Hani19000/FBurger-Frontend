import { useParams, useNavigate } from 'react-router-dom';
import HeroSection from '../components/molecules/HeroSection';
import useProducts from "../features/products/hooks/useProducts.jsx";
import '../styles/productdetail.css';
import SEO from '../components/atoms/SEO.jsx';


function ProductDetail() {
    const { id } = useParams();
    const { data: product, loading } = useProducts(id);
    const navigate = useNavigate();

    const optimizedHeroImg = product?.image_url?.replace(/\.[^/.]+$/, ".webp");

    // Valeurs par défaut pendant le chargement pour éviter le vide SEO
    const seoTitle = loading ? "Découvrez nos spécialités" : product?.name;
    const seoDescription = loading
        ? "Découvrez les détails de nos burgers artisanaux chez FBurger."
        : `Dégustez notre ${product?.name} : ${product?.description}. Prix : ${product?.price}€. Ingrédients frais et préparation minute.`;


    return (
        <main className="product-detail-page">

            {/* SEO Dynamique avec les données du produit */}
            <SEO
                title={seoTitle}
                description={seoDescription}
                path={`/product/${id}`}
                image={optimizedHeroImg}
            />


            <HeroSection
                title={loading ? "Chargement..." : product?.name}
                subtitle={loading ? "Préparation de votre délice..." : product?.description}
                img={loading ? "" : optimizedHeroImg}
                isLight={true}
            >
                <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    opacity: loading ? 0 : 1,
                    transition: 'opacity 0.5s ease'
                }}>
                    <button
                        className="btn"
                        onClick={() => navigate('/menu')}
                    >
                        ← Retour au menu
                    </button>
                </div>
            </HeroSection>
        </main>
    );
}

export default ProductDetail;