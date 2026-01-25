import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function useBreadcrumbSchema(items: BreadcrumbItem[]) {
  useEffect(() => {
    const baseUrl = "https://poker-coach-ai.replit.app";
    
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        ...items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": item.name,
          "item": `${baseUrl}${item.path}`
        }))
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'breadcrumb-schema';
    script.text = JSON.stringify(breadcrumbSchema);
    
    const existing = document.getElementById('breadcrumb-schema');
    if (existing) {
      existing.remove();
    }
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('breadcrumb-schema');
      if (el) el.remove();
    };
  }, [items]);
}
