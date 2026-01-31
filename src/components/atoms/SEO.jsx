import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path, image }) => {
    const siteName = 'FBurger';
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Burgers Artisanaux`;
    const url = `https://fburger.vercel.app${path || ''}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            {image && <meta property="og:image" content={image} />}
        </Helmet>
    );
};

export default SEO;