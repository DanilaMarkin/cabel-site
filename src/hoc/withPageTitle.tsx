import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';

/**
 * Компонент высшего порядка (HOC) для добавления заголовка страницы к любому компоненту
 * @param WrappedComponent - Компонент, который нужно обернуть
 * @param title - Заголовок страницы
 * @param suffix - Суффикс заголовка (опционально)
 */
export const withPageTitle = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  title: string,
  suffix?: string
) => {
  // Возвращаем новый компонент
  const WithPageTitle: React.FC<P> = (props) => {
    // Используем хук для установки заголовка
    usePageTitle(title, suffix);
    
    // Рендерим оригинальный компонент с его пропсами
    return <WrappedComponent {...props} />;
  };
  
  // Устанавливаем отображаемое имя для отладки
  WithPageTitle.displayName = `WithPageTitle(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return WithPageTitle;
}; 