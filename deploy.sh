#!/bin/bash

# Обновление системы
apt update
apt upgrade -y

# Установка необходимых пакетов
apt install nginx nodejs npm -y

# Установка n (менеджер версий Node.js) и последней LTS версии Node.js
npm install -g n
n lts

# Создание директории для проекта
mkdir -p /var/www/repository
chown -R $USER:$USER /var/www/repository

# Копирование конфигурации Nginx
cp nginx.conf /etc/nginx/sites-available/repository
ln -s /etc/nginx/sites-available/repository /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Проверка конфигурации Nginx
nginx -t

# Перезапуск Nginx
systemctl restart nginx

# Установка зависимостей проекта и сборка
npm install
npm run build

# Копирование собранных файлов
cp -r dist/* /var/www/repository/dist/

# Настройка прав доступа
chown -R www-data:www-data /var/www/repository
chmod -R 755 /var/www/repository

echo "Деплой завершен!" 