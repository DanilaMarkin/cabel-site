import { useEffect } from 'react';

interface PageTitleProps {
  title: string;
  suffix?: string;
}

/**
 * Компонент для динамического изменения заголовка страницы
 * @param title - Основной заголовок страницы
 * @param suffix - Суффикс, который будет добавлен к заголовку (например, название сайта)
 */
const PageTitle = ({ title, suffix = 'Интернет-магазин кабельной продукции' }: PageTitleProps) => {
  useEffect(() => {
    // Формируем полный заголовок
    const fullTitle = suffix ? `${title} | ${suffix}` : title;
    
    // Устанавливаем заголовок страницы
    document.title = fullTitle;
    
    // Возвращаем функцию очистки, которая будет вызвана при размонтировании компонента
    return () => {
      // Можно вернуть заголовок по умолчанию, если это необходимо
      // document.title = 'Интернет-магазин кабельной продукции';
    };
  }, [title, suffix]); // Эффект будет выполняться при изменении title или suffix

  // Компонент не рендерит никакой UI
  return null;
};

export default PageTitle; 