import type { Metadata } from "next";
import type { Product, StructuredData, SEOProps, BusinessInfo } from "@/types";

// ===== BUSINESS INFORMATION =====
export const BUSINESS_INFO: BusinessInfo = {
  name: "GSTradeLink Chitwan",
  tagline: "Precision Weighing Solutions",
  description:
    "Authorized dealer for digital scales, beam balances, and weighing equipment in Bharatpur, Chitwan. Expert repair services and genuine spare parts available.",
  address: {
    street: "Bharatpur-3",
    city: "Bharatpur",
    district: "Chitwan",
    country: "Nepal",
  },
  contact: {
    phone: "+977 9845541939",
    email: "gstradelinkngt@gmail.com",
    whatsapp: "+977 9845541939",
  },
  socialMedia: {
    facebook: "https://facebook.com/gstradelinkchitwan",
    // Add other social media as needed
  },
  workingHours: {
    monday: "10:00 AM - 6:00 PM",
    tuesday: "10:00 AM - 6:00 PM",
    wednesday: "10:00 AM - 6:00 PM",
    thursday: "10:00 AM - 6:00 PM",
    friday: "10:00 AM - 6:00 PM",
    saturday: "10:00 AM - 5:00 PM",
    sunday: "Closed",
  },
};

// ===== DEFAULT SEO VALUES =====
export const DEFAULT_SEO = {
  siteName: "GSTradeLink Chitwan",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://gstradelink.com.np",
  defaultTitle: "GSTradeLink | Digital Beam Balance Sales & Repair",
  defaultDescription:
    "Authorized dealer for digital scales, beam balances, and weighing equipment in Bharatpur, Chitwan. Expert repair services and genuine spare parts available.",
  defaultKeywords: [
    "Digital Scale",
    "Weighing Machine",
    "Bharatpur",
    "Chitwan",
    "Beam Balance Repair",
    "Industrial Scales Nepal",
    "GSTradeLink",
    "Weighing Equipment",
    "Scale Calibration",
    "Electronic Balance",
  ],
  defaultImage: "/images/og-default.jpg",
  twitterHandle: "@gstradelink",
};

// ===== METADATA GENERATION =====
/**
 * Generates Next.js metadata object with SEO optimization
 */
export function generateMetadata(seo: SEOProps): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage,
    ogType = "website",
    twitterCard = "summary_large_image",
    noindex = false,
    nofollow = false,
  } = seo;

  const fullTitle = title.includes(DEFAULT_SEO.siteName)
    ? title
    : `${title} | ${DEFAULT_SEO.siteName}`;

  const imageUrl = ogImage || DEFAULT_SEO.defaultImage;
  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `${DEFAULT_SEO.siteUrl}${imageUrl}`;

  const allKeywords = [...DEFAULT_SEO.defaultKeywords, ...keywords];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(", "),

    // Robots
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Open Graph
    openGraph: {
      type: ogType === "product" ? "website" : ogType,
      title: fullTitle,
      description,
      url: canonical || DEFAULT_SEO.siteUrl,
      siteName: DEFAULT_SEO.siteName,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
    },

    // Twitter
    twitter: {
      card: twitterCard,
      site: DEFAULT_SEO.twitterHandle,
      title: fullTitle,
      description,
      images: [fullImageUrl],
    },

    // Canonical URL
    alternates: canonical
      ? {
        canonical,
      }
      : undefined,

    // Additional meta tags
    other: {
      "theme-color": "#0F2A44",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "format-detection": "telephone=no",
    },
  };
}

// ===== STRUCTURED DATA GENERATION =====
/**
 * Generates organization structured data
 */
export function generateOrganizationSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    url: DEFAULT_SEO.siteUrl,
    logo: `${DEFAULT_SEO.siteUrl}/images/logo.png`,
    image: `${DEFAULT_SEO.siteUrl}/images/og-default.jpg`,
    telephone: BUSINESS_INFO.contact.phone,
    email: BUSINESS_INFO.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.district,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "27.6719", // Bharatpur coordinates
      longitude: "84.4349",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      BUSINESS_INFO.socialMedia?.facebook,
      // Add other social media URLs
    ].filter(Boolean),
  };
}

/**
 * Generates local business structured data
 */
export function generateLocalBusinessSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${DEFAULT_SEO.siteUrl}#organization`,
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    url: DEFAULT_SEO.siteUrl,
    telephone: BUSINESS_INFO.contact.phone,
    email: BUSINESS_INFO.contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.district,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "27.6719",
      longitude: "84.4349",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "17:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Weighing Equipment & Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Digital Scales",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Retail Scales",
                description: "Digital scales for retail businesses",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Industrial Scales",
                description: "Heavy-duty scales for industrial use",
              },
            },
          ],
        },
      ],
    },
  };
}

/**
 * Generates product structured data
 */
export function generateProductSchema(product: Product): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${DEFAULT_SEO.siteUrl}/products/${product.id}`,
    name: product.name,
    description:
      product.short_description || `${product.name} from ${BUSINESS_INFO.name}`,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: BUSINESS_INFO.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
    },
    image: product.image_url ? [product.image_url] : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "NPR",
      availability: product.is_active
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: BUSINESS_INFO.name,
      },
    },
  };
}

/**
 * Generates breadcrumb structured data
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url?: string }>,
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url
        ? `${DEFAULT_SEO.siteUrl}${breadcrumb.url}`
        : undefined,
    })),
  };
}

/**
 * Generates FAQ structured data
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates WebSite structured data with search functionality
 */
export function generateWebsiteSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${DEFAULT_SEO.siteUrl}#website`,
    url: DEFAULT_SEO.siteUrl,
    name: DEFAULT_SEO.siteName,
    description: DEFAULT_SEO.defaultDescription,
    publisher: {
      "@type": "Organization",
      "@id": `${DEFAULT_SEO.siteUrl}#organization`,
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${DEFAULT_SEO.siteUrl}/products?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
  };
}

// ===== PAGE-SPECIFIC SEO =====
/**
 * Generates SEO for home page
 */
export function generateHomePageSEO(): SEOProps {
  return {
    title: DEFAULT_SEO.defaultTitle,
    description: DEFAULT_SEO.defaultDescription,
    keywords: DEFAULT_SEO.defaultKeywords,
    canonical: DEFAULT_SEO.siteUrl,
    ogType: "website",
  };
}

/**
 * Generates SEO for products page
 */
export function generateProductsPageSEO(category?: string): SEOProps {
  const categoryTitle = category ? ` - ${category}` : "";
  const categoryDesc = category
    ? ` specializing in ${category.toLowerCase()}`
    : "";

  return {
    title: `Products${categoryTitle}`,
    description: `Browse our comprehensive range of weighing equipment${categoryDesc}. Digital scales, beam balances, and spare parts available in Bharatpur, Chitwan.`,
    keywords: [
      category || "products",
      "weighing equipment",
      "digital scales",
      "beam balance",
      "Bharatpur",
      "Chitwan",
    ],
    canonical: `${DEFAULT_SEO.siteUrl}/products${category ? `?category=${encodeURIComponent(category)}` : ""}`,
  };
}

/**
 * Generates SEO for individual product page
 */
export function generateProductPageSEO(product: Product): SEOProps {
  return {
    title: `${product.name} - ${product.category}`,
    description:
      product.short_description ||
      `${product.name} available at ${BUSINESS_INFO.name} in Bharatpur, Chitwan. Expert sales and support for ${product.category.toLowerCase()}.`,
    keywords: [
      product.name,
      product.category,
      "digital scale",
      "weighing equipment",
      "Bharatpur",
      "Chitwan",
    ],
    canonical: `${DEFAULT_SEO.siteUrl}/products/${product.id}`,
    ogImage: product.image_url ?? undefined,
    ogType: "product",
  };
}

/**
 * Generates SEO for admin pages
 */
export function generateAdminPageSEO(): SEOProps {
  return {
    title: "Admin Dashboard",
    description: "Administrative interface for managing products and content.",
    noindex: true,
    nofollow: true,
  };
}

// ===== SITEMAP GENERATION =====
/**
 * Generates sitemap URLs
 */
export function generateSitemapUrls(products: Product[] = []) {
  const baseUrls = [
    {
      url: DEFAULT_SEO.siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${DEFAULT_SEO.siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  const productUrls = products.map((product) => ({
    url: `${DEFAULT_SEO.siteUrl}/products/${product.id}`,
    lastModified: new Date(product.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...baseUrls, ...productUrls];
}

// ===== UTILITY FUNCTIONS =====
/**
 * Generates structured data script HTML string
 */
export function generateStructuredDataScript(
  data: StructuredData | StructuredData[],
): string {
  const dataArray = Array.isArray(data) ? data : [data];
  const jsonData = JSON.stringify(
    dataArray.length === 1 ? dataArray[0] : dataArray,
  );

  return `<script type="application/ld+json">${jsonData}</script>`;
}

/**
 * Validates structured data
 */
export function validateStructuredData(data: StructuredData): boolean {
  try {
    // Basic validation - check for required properties
    if (!data["@context"] || !data["@type"]) {
      console.warn("Missing @context or @type in structured data");
      return false;
    }

    // Validate JSON structure
    JSON.stringify(data);
    return true;
  } catch (error) {
    console.error("Invalid structured data:", error);
    return false;
  }
}

/**
 * Optimizes meta description length
 */
export function optimizeMetaDescription(
  description: string,
  maxLength: number = 155,
): string {
  if (description.length <= maxLength) return description;

  const truncated = description.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + "..."
    : truncated + "...";
}

/**
 * Generates canonical URL with proper formatting
 */
export function generateCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${DEFAULT_SEO.siteUrl}${cleanPath}`;
}
