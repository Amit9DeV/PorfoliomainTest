import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, keywords, image }) {
    const siteUrl = "https://amitdev.com"; // Replace with actual URL
    const defaultImage = "/preview.png"; // Replace with actual default image
    const fullTitle = title ? `${title} | Amit.Dev` : "Amit.Dev | Full Stack Developer";

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description || "Portfolio of Amit Ram, a Full Stack Developer specializing in MERN stack and modern web technologies."} />
            <meta name="keywords" content={keywords || "React, Node.js, Developer, Portfolio, Full Stack"} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || "Portfolio of Amit Ram, a Full Stack Developer specializing in MERN stack and modern web technologies."} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={window.location.href} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description || "Portfolio of Amit Ram, a Full Stack Developer specializing in MERN stack and modern web technologies."} />
            <meta property="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
}
