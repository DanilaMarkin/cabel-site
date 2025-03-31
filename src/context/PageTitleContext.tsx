import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Интерфейс для контекста
interface PageTitleContextType {
  setPageTitle: (title: string, suffix?: string) => void;
}

// Создаем контекст
const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

// Хук для использования контекста
export const usePageTitleContext = (): PageTitleContextType => {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error('usePageTitleContext must be used within a PageTitleProvider');
  }
  return context;
};

// Интерфейс для провайдера
interface PageTitleProviderProps {
  children: ReactNode;
  defaultTitle?: string;
  defaultSuffix?: string;
}

// Провайдер контекста
export const PageTitleProvider: React.FC<PageTitleProviderProps> = ({
  children,
  defaultTitle = 'Интернет-магазин',
  defaultSuffix = 'Кабельная продукция'
}) => {
  // Состояние для заголовка и суффикса
  const [title, setTitle] = useState<string>(defaultTitle);
  const [suffix, setSuffix] = useState<string | undefined>(defaultSuffix);

  // Функция для установки заголовка
  const setPageTitle = (newTitle: string, newSuffix?: string) => {
    setTitle(newTitle);
    setSuffix(newSuffix);
  };

  // Эффект для обновления заголовка документа
  useEffect(() => {
    const fullTitle = suffix ? `${title} | ${suffix}` : title;
    document.title = fullTitle;
  }, [title, suffix]);

  return (
    <PageTitleContext.Provider value={{ setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
}; 