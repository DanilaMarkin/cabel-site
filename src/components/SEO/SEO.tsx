import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  twitterCard?: string;
  twitterSite?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Интернет-магазин кабельной продукции. Широкий выбор кабелей, проводов и электротехнической продукции с доставкой по всей России.',
  keywords = 'кабель, провод, электротехника, кабельная продукция, купить кабель',
  canonicalUrl,
  ogImage = '/img/logo.png',
  ogType = 'website',
  noindex = false,
  twitterCard = 'summary_large_image',
  twitterSite = '@kabelopt'
}) => {
  useEffect(() => {
    // Установка title
    if (title) {
      document.title = `${title} | КабельОпт`;
    }

    // Управление метатегами
    const metaTags = {
      description,
      keywords,
      'og:title': title ? `${title} | КабельОпт` : 'КабельОпт - Интернет-магазин кабельной продукции',
      'og:description': description,
      'og:image': ogImage,
      'og:type': ogType,
      'og:url': canonicalUrl || window.location.href,
      'robots': noindex ? 'noindex, nofollow' : 'index, follow',
      'twitter:card': twitterCard,
      'twitter:site': twitterSite,
      'twitter:title': title ? `${title} | КабельОпт` : 'КабельОпт - Интернет-магазин кабельной продукции',
      'twitter:description': description,
      'twitter:image': ogImage
    };

    // Обновление существующих метатегов или создание новых
    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;

      // Ищем существующий тег
      let metaTag;
      if (name.startsWith('og:')) {
        metaTag = document.querySelector(`meta[property="${name}"]`);
      } else {
        metaTag = document.querySelector(`meta[name="${name}"]`);
      }

      // Если тег существует, обновляем его
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        // Иначе создаем новый тег
        const newTag = document.createElement('meta');
        if (name.startsWith('og:')) {
          newTag.setAttribute('property', name);
        } else {
          newTag.setAttribute('name', name);
        }
        newTag.setAttribute('content', content);
        document.head.appendChild(newTag);
      }
    });

    // Управление canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (canonicalTag) {
        canonicalTag.setAttribute('href', canonicalUrl);
      } else {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        canonicalTag.setAttribute('href', canonicalUrl);
        document.head.appendChild(canonicalTag);
      }
    }

    // Очистка при размонтировании
    return () => {
      // Не удаляем метатеги при размонтировании,
      // так как это может вызвать проблемы при навигации
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, noindex, twitterCard, twitterSite]);

  return null; // Компонент не рендерит никакого UI
};

export default SEO; 