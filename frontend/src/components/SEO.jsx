import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image }) => {
    const siteName = "Fashion Hub";
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Premium Indian Fashion`;
    
    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || "Premium Indian ethnic and western wear. Discover our latest collection of sarees, sherwanis, and more."} />
            {keywords && <meta name="keywords" content={keywords} />}
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            {image && <meta property="og:image" content={image} />}
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default SEO;
